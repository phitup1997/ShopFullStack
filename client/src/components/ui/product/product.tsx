const Product = ({ productData }) => {
  console.log(`images : ${productData.images}`)

  return (
    <div className="w-1/3">
      <img
        src={productData?.images[0] || ""}
        className="w-full object-contain"
      />
    </div>
  )
}

export default Product
