// components/common/DiagonalRevealImage.tsx

type DiagonalRevealImageProps = {
  src: string
  alt: string
  href?: string
  className?: string
  overlayClassName?: string
}

const DiagonalRevealImage = ({
  src,
  alt,
  href,
  className = "",
  overlayClassName = "bg-black/20",
}: DiagonalRevealImageProps) => {
  const content = (
    <>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {/* Overlay square growing from top-left corner on hover */}
      <span
        className={`absolute inset-0 origin-top-left scale-0
                    group-hover:scale-100 transition-transform duration-500 ease-in-out
                    [clip-path:polygon(0_0,100%_0,0_100%)] ${overlayClassName}`}
      />
      {/* Overlay square growing from bottom-right corner on hover */}
      <span
        className={`absolute inset-0 origin-bottom-right scale-0
                    group-hover:scale-100 transition-transform duration-500 ease-in-out
                    [clip-path:polygon(100%_0,100%_100%,0_100%)] ${overlayClassName}`}
      />
    </>
  )

  const wrapperClassName = `group relative flex overflow-hidden cursor-pointer ${className}`

  if (href) {
    return (
      <a href={href} className={wrapperClassName}>
        {content}
      </a>
    )
  }

  return <div className={wrapperClassName}>{content}</div>
}

export default DiagonalRevealImage
