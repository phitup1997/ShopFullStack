import type { FC } from "react"
import { CiMoneyBill } from "react-icons/ci"
import type { IconType } from "react-icons"
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGoogle,
  FaPinterest,
} from "react-icons/fa"

type SocialLink = {
  key: string
  label: string
  href: string
  Icon: IconType
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    key: "facebook",
    label: "Follow us on Facebook",
    href: "https://facebook.com",
    Icon: FaFacebookF,
  },
  {
    key: "twitter",
    label: "Follow us on Twitter",
    href: "https://twitter.com",
    Icon: FaTwitter,
  },
  {
    key: "instagram",
    label: "Follow us on Instagram",
    href: "https://instagram.com",
    Icon: FaInstagram,
  },
  {
    key: "google",
    label: "Find us on Google",
    href: "https://google.com",
    Icon: FaGoogle,
  },
  {
    key: "pinterest",
    label: "Follow us on Pinterest",
    href: "https://pinterest.com",
    Icon: FaPinterest,
  },
]

const TopHeader: FC = () => {
  return (
    <div className="flex w-full px-3 justify-center bg-main">
      <div className="flex w-main py-2.5 justify-between">
        <div className="flex items-center gap-2">
          <span className="uppercase text-[12px] font-main text-white border-r border-white/40 pr-2.5">
            Order Online Or Call Us (+1800) 000 8808
          </span>
          <div className="flex items-center gap-2">
            <CiMoneyBill size={16} color="white" />
            <span className="text-[12px] text-white font-main">VND</span>
          </div>
        </div>

        <ul className="flex divide-x divide-white/40">
          <li className="pr-2.5 flex items-center">
            <a
              href="/account/login"
              className="font-main text-white text-[12px] hover:text-white/70 transition-colors no-underline"
            >
              Sign in or Create Account
            </a>
          </li>
          {SOCIAL_LINKS.map(({ key, label, href, Icon }) => (
            <li
              key={key}
              className="px-2.5 first:pl-2.5 last:pr-0 flex items-center"
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center text-white hover:text-white/70 transition-colors"
              >
                <Icon size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TopHeader
