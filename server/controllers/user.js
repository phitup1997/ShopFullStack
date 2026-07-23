const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const asyncHandler = require('express-async-handler')
const sendMail = require('../Utils/sendMail')
const { generateAccessToken, generateRefreshToken } = require('../middleware/jwt')
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateUserSchema,
} = require('../Utils/schema')

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, mobile } = req?.body || {}

  const validation = registerSchema.validate({ firstName, lastName, email, password, mobile })
  if (validation.error) {
    throw new Error(validation.error.message)
  }

  const response = await User.create(req.body)
  return res.status(200).json({ isSuccess: true, response })
})

const login = asyncHandler(async (req, res) => {
  const validation = loginSchema.validate({ email: req?.body.email, password: req?.body.password })
  if (validation.error) {
    throw new Error(validation.error.message)
  }

  const user = await User.findOne({ email: req?.body.email })
  if (!user) {
    throw new Error("Email doesn't existed")
    return
  }

  const isMatch = bcrypt.compareSync(req?.body.password, user.password)
  if (!isMatch) {
    return res.status(400).json({
      isSuccess: false,
      message: 'Password incorrect!',
    })
  }

  const { password, role, ...userData } = user.toObject()
  const accessToken = generateAccessToken(user._id, role)
  const refreshToken = generateRefreshToken(user._id)
  // Add Refresh Token into user document
  await User.findByIdAndUpdate(user._id, { refreshToken }, { returnDocument: 'after' })
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  return res.status(200).json({
    isSuccess: true,
    accessToken: `Bearer ${accessToken}`,
    refreshToken,
    userData,
  })
})

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const user = await User.findById(_id).select('-password -role')
  return res.status(200).json({
    isSuccess: true,
    user,
  })
})

const handleRefreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken

  if (!refreshToken) {
    return res.status(401).json({
      isSuccess: false,
      message: 'No refresh token in cookies',
    })
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message || 'Invalid refresh token',
    })
  }

  const user = await User.findOne({
    _id: decodedToken?._id,
    refreshToken,
  })

  if (!user) {
    return res.status(400).json({
      isSuccess: false,
      message: 'Refresh token is not matched',
    })
  }

  const newAccessToken = generateAccessToken(user._id, user.role)

  return res.status(200).json({ isSuccess: true, newAccessToken: `Bearer ${newAccessToken}` })
})

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies

  if (!cookie?.refreshToken) throw new Error('No refresh token in cookies')

  await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { returnDocument: 'after' })
  res.clearCookie('refreshToken', { httpOnly: true, secure: true })
  return res.status(200).json({
    isSuccess: true,
    message: 'Logout success',
  })
})

const createPasswordChangedToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex')
  const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  const passwordResetExpires = Date.now() + 15 * 60 * 1000
  return { resetToken, passwordResetToken, passwordResetExpires }
}

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req?.query

  const validation = forgotPasswordSchema.validate({ email })
  if (validation.error) {
    throw new Error(validation.error.message)
  }

  const user = await User.findOne({ email })
  if (!user) throw new Error('User not found')

  const { resetToken, passwordResetToken, passwordResetExpires } = createPasswordChangedToken()
  await User.findByIdAndUpdate(user._id, { passwordResetToken, passwordResetExpires }, { returnDocument: 'after' })

  const html = `<p>Please click on the following link to change your password. This link will be expire after 15 minutes. <a href="${process.env.URL_SERVER}/api/user/reset-password/${resetToken}">Click Here</a></p>`

  const rs = await sendMail(email, html)
  return res.status(200).json({
    isSuccess: true,
    rs,
  })
})

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req?.body || {}

  const validation = resetPasswordSchema.validate({ password, token })
  if (validation.error) {
    throw new Error(validation.error.message)
  }

  const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  if (!user) throw new Error('The user can not found')
  user.password = password
  user.passwordResetToken = undefined
  user.passwordChangedAt = Date.now()
  user.passwordResetExpires = undefined
  await user.save()

  return res.status(200).json({
    isSuccess: true,
    message: 'Update password successful',
  })
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password -refreshToken -passwordChangedAt -role')
  if (!users) throw new Error('the user list were empty')
  return res.status(200).json({
    isSuccess: true,
    users,
  })
})

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req?.query || {}

  if (!_id) throw new Error('Invalid user id')

  const response = await User.findByIdAndDelete(_id)
  if (!response) throw new Error('delete user failed')

  return res.status(200).json({
    isSuccess: true,
    message: 'delete user successful',
  })
})

const updateUser = asyncHandler(async (req, res) => {
  const validation = updateUserSchema.validate({ ...req.body })
  if (validation.error) {
    throw new Error(validation.error.message)
  }

  const user = await User.findByIdAndUpdate(req?.body?._id, req.body, {
    returnDocument: 'after',
  }).select('-password -role -refreshToken')
  if (!user) throw new Error('Update user failed')

  return res.status(200).json({
    isSuccess: true,
    message: 'Update user successful',
  })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const validation = updateUserSchema.validate({ ...req.body })
  if (validation.error) {
    throw new Error(validation.error.message)
  }

  const user = await User.findByIdAndUpdate(req?.body?.uid, req.body, {
    returnDocument: 'after',
  }).select('-password -role -refreshToken')
  if (!user) throw new Error('Update user failed')

  return res.status(200).json({
    isSuccess: true,
    message: 'Update user successful',
  })
})

module.exports = {
  register,
  login,
  getCurrentUser,
  handleRefreshToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
}
