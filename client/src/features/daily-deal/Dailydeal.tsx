import { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import { FaBars } from "react-icons/fa6"
import { formatCurrency } from "../../utils/helpers"
import CountDown from "../../components/ui/count-down/count-down"
import { useDailyDealStore } from "./dailyDealStore"
import moment from "moment"

// Change these to control the countdown's starting point
const DEAL_END_DATE = "2026-08-20T01:13:33.970Z"

type TimeLeft = {
  hours: number
  minutes: number
  seconds: number
}

const ZERO_TIME_LEFT: TimeLeft = { hours: 0, minutes: 0, seconds: 0 }

const getTimeLeft = (endDate: string): TimeLeft => {
  const diffSeconds = moment(endDate).diff(moment(), "seconds")

  if (diffSeconds <= 0) {
    return ZERO_TIME_LEFT
  }

  const duration = moment.duration(diffSeconds, "seconds")

  return {
    hours: Math.floor(duration.asHours()),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  }
}

const DealCountdown = ({ endDate }: { endDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(endDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [endDate])

  return (
    <div className="flex w-full mt-3 gap-2">
      <CountDown time={String(timeLeft.hours)} unit="Hours" />
      <CountDown time={String(timeLeft.minutes)} unit="Minutes" />
      <CountDown time={String(timeLeft.seconds)} unit="seconds" />
    </div>
  )
}

const DailyDeal = () => {
  const product = useDailyDealStore(state => state.product)
  const isLoading = useDailyDealStore(state => state.isLoading)
  const fetchDailyDeal = useDailyDealStore(state => state.fetchDailyDeal)

  useEffect(() => {
    void fetchDailyDeal()
  }, [fetchDailyDeal])

  if (isLoading) {
    return <p className="spinner">Loading daily deal product...</p>
  }

  if (!product) {
    return <p className="spinner">Can not found daily deal product</p>
  }

  return (
    <div className="flex flex-col w-[25%] justify-center items-center border border-main-border p-[20px]">
      <div className="flex items-center w-full mb-10">
        <FaStar color="red" size={"20"} className="absolute object-contain" />
        <span className="uppercase font-semibold text-[20px] text-center w-full font-main text-secondary">
          DAILY DEALS
        </span>
      </div>
      <a href="/">
        <img
          src={product.thumb}
          alt="daily-deal"
          className="w-full object-contain"
        />
      </a>
      <a
        href="/"
        className="mt-5 text-[16px] text-center font-main text-quaternary hover:text-main no-underline"
      >
        {product.title}
      </a>
      <span className="mt-3 text-[16px] text-neutral font-main">
        {formatCurrency(product.price, "VND")}
      </span>
      <DealCountdown endDate={DEAL_END_DATE} />
      <button
        type="button"
        className="w-full flex mt-4 gap-2 py-[15px] justify-center items-center bg-main uppercase text-sm text-white hover:bg-neutral transition-colors duration-[150ms] ease-out text-white"
      >
        <FaBars color="white" size={16} />
        <span className="text-white text-sm">OPTIONS</span>
      </button>
    </div>
  )
}

export default DailyDeal
