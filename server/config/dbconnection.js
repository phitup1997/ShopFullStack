const { default: mongoose } = require("mongoose")

const dbconnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI)
    if (connect.connection.readyState === 1) {
      console.log("DB connection is successfully!")
    }
  } catch (error) {
    console.log("DB is connect failed")
    throw new Error(error)
  }
}

module.exports = dbconnection
