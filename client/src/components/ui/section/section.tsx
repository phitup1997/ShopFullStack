type SectionTab<T extends string = string> = {
  key: T
  title: string
}

type ISection<T extends string = string> = {
  name: string
  tabs?: SectionTab<T>[]
  selectedTab?: T
  onTabChange?: (key: T) => void
}

const Section = <T extends string = string>({
  name,
  tabs,
  selectedTab,
  onTabChange,
}: ISection<T>) => {
  return (
    <div className="flex w-full justify-between mb-5 py-3.75 border-b-2 border-main">
      <span className="text-[20px] font-semibold text-accent font-main uppercase">
        {name}
      </span>

      {tabs && tabs.length > 0 && (
        <div className="flex items-end divide-x gap-5 divide-main-border">
          {tabs.map((tab, idx) => (
            <span
              key={`${name}_tab_${tab.key}`}
              className={`text-gray text-[14px] cursor-pointer ${
                idx === tabs.length - 1 ? "" : "pr-5"
              } ${selectedTab === tab.key ? "text-main" : ""} font-main hover:text-main`}
              onClick={() => onTabChange?.(tab.key)}
            >
              {tab.title}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default Section
