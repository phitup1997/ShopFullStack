interface ICountDown {
  time: string
  unit: string
}

const CountDown = ({ time, unit }: ICountDown) => {
  return (
    <div className="flex flex-col justify-center items-center bg-wildsand py-2.5 px-1.5 w-full">
      <span className="text-[18px] font-main text-accent font-semibold">
        {time}
      </span>
      <span className="text-xs text-suvagrey">{unit}</span>
    </div>
  )
}

export default CountDown
