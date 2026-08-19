import React, { useRef, useEffect, useCallback, useState } from "react"
import type { ReactNode } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

// Matches Tailwind's default breakpoint scale
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

type Breakpoint = keyof typeof BREAKPOINTS

type ResponsiveItemsToShow =
  number | ({ base: number } & Partial<Record<Breakpoint, number>>)

const resolveItemsToShow = (
  config: ResponsiveItemsToShow,
  width: number,
): number => {
  if (typeof config === "number") return config

  let value = config.base
  // Walk breakpoints smallest → largest, applying each one whose
  // min-width is satisfied — matches CSS min-width media query behavior.
  ;(Object.keys(BREAKPOINTS) as Breakpoint[])
    .sort((a, b) => BREAKPOINTS[a] - BREAKPOINTS[b])
    .forEach(bp => {
      const itemsAtBreakpoint = config[bp]
      if (width >= BREAKPOINTS[bp] && itemsAtBreakpoint !== undefined) {
        value = itemsAtBreakpoint
      }
    })

  return value
}

const useResponsiveItemsToShow = (config: ResponsiveItemsToShow): number => {
  const [itemsToShow, setItemsToShow] = useState(() =>
    resolveItemsToShow(
      config,
      typeof window !== "undefined" ? window.innerWidth : 0,
    ),
  )

  useEffect(() => {
    const handleResize = (): void => {
      setItemsToShow(resolveItemsToShow(config, window.innerWidth))
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(config)])

  return itemsToShow
}

const easeInOutQuad = (t: number): number =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

interface CarouselProps {
  children: ReactNode
  itemsToShow?: ResponsiveItemsToShow
  gap?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  pauseOnHover?: boolean
  scrollDuration?: number
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsToShow = 3,
  gap = 16,
  autoPlay = true,
  autoPlayInterval = 3000,
  pauseOnHover = true,
  scrollDuration = 1000,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const resolvedItemsToShow = useResponsiveItemsToShow(itemsToShow)

  const getItemScrollAmount = (): number => {
    const container = scrollContainerRef.current
    if (!container) return 0
    const firstChild = container.firstElementChild as HTMLElement | null
    const itemWidth = firstChild?.clientWidth ?? 0
    return itemWidth + gap
  }

  const animateScrollTo = useCallback(
    (target: number, duration: number): void => {
      const container = scrollContainerRef.current
      if (!container) return

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Disable snap while we manually drive scrollLeft — otherwise the browser
      // treats every frame's scrollLeft assignment as a completed scroll and
      // immediately re-snaps, which cancels the animation and looks like a jump.
      container.style.scrollSnapType = "none"

      const start = container.scrollLeft
      const distance = target - start
      const startTime = performance.now()

      const step = (now: number): void => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeInOutQuad(progress)

        container.scrollLeft = start + distance * eased

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(step)
        } else {
          animationFrameRef.current = null
          // Re-enable snap once the animation has finished landing on target
          container.style.scrollSnapType = "x mandatory"
        }
      }

      animationFrameRef.current = requestAnimationFrame(step)
    },
    [],
  )

  const scroll = (direction: "left" | "right"): void => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = getItemScrollAmount()
    const target =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount

    animateScrollTo(target, scrollDuration)
  }

  const scrollToNext = useCallback((): void => {
    const container = scrollContainerRef.current
    if (!container) return

    const isAtEnd =
      Math.ceil(container.scrollLeft + container.clientWidth) >=
      container.scrollWidth

    if (isAtEnd) {
      animateScrollTo(0, scrollDuration)
    } else {
      const scrollAmount = getItemScrollAmount()
      animateScrollTo(container.scrollLeft + scrollAmount, scrollDuration)
    }
  }, [animateScrollTo, scrollDuration])

  const startAutoPlay = useCallback((): void => {
    if (!autoPlay) return
    stopAutoPlay()
    intervalRef.current = setInterval(scrollToNext, autoPlayInterval)
  }, [autoPlay, autoPlayInterval, scrollToNext])

  const stopAutoPlay = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    startAutoPlay()
    return () => {
      stopAutoPlay()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [startAutoPlay])

  const handleMouseEnter = (): void => {
    if (pauseOnHover) stopAutoPlay()
  }

  const handleMouseLeave = (): void => {
    if (pauseOnHover) startAutoPlay()
  }

  const handleManualScroll = (direction: "left" | "right"): void => {
    stopAutoPlay()
    scroll(direction)
    if (autoPlay) startAutoPlay()
  }

  return (
    <div
      className="relative flex flex-col group w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => handleManualScroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/60 text-white p-3 rounded-r shadow-md transition-all duration-200"
        aria-label="Previous item"
      >
        <FaChevronLeft size={18} />
      </button>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory"
        style={{ gap: `${gap}px` }}
      >
        {React.Children.map(children, child => (
          <div
            className="snap-start"
            style={{
              flex: `0 0 calc((100% - ${(resolvedItemsToShow - 1) * gap}px) / ${resolvedItemsToShow})`,
              minWidth: 0,
            }}
          >
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={() => handleManualScroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/60 text-white p-3 rounded-l shadow-md transition-all duration-200"
        aria-label="Next item"
      >
        <FaChevronRight size={18} />
      </button>
    </div>
  )
}

export default Carousel
