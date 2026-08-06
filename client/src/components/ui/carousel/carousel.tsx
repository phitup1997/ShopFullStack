import React, { useRef } from "react"
import type { ReactNode } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface CarouselProps {
  children: ReactNode
  itemsToShow?: number
  gap?: number
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsToShow = 3,
  gap = 16,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right"): void => {
    const container = scrollContainerRef.current
    if (!container) return

    const firstChild = container.firstElementChild as HTMLElement | null
    const itemWidth = firstChild?.clientWidth ?? 0
    const scrollAmount = itemWidth + gap

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative group w-full">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/60 text-white p-3 rounded-r shadow-md transition-all duration-200"
        aria-label="Previous item"
      >
        <FaChevronLeft size={18} />
      </button>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar"
        style={{ gap: `${gap}px` }}
      >
        {React.Children.map(children, child => (
          <div
            style={{
              flex: `0 0 calc((100% - ${(itemsToShow - 1) * gap}px) / ${itemsToShow})`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/60 text-white p-3 rounded-l shadow-md transition-all duration-200"
        aria-label="Next item"
      >
        <FaChevronRight size={18} />
      </button>
    </div>
  )
}

export default Carousel
