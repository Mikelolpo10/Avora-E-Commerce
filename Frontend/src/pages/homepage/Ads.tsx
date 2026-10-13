import { Link } from "react-router"

interface AdsParam {
  url: string;
  src: string;
  alt: string;
  title: string;
  paragraph: string;
}

export default function Ads({url, src, alt, title, paragraph}: AdsParam) {
  return (
    <Link to={url} className="mb-8 relative">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          height={600}
          width={2000}
          className="w-full"
        />
        <div className="absolute bottom-20 px-16 flex flex-col z-10 cursor-pointer">
          <h2 className="text-white text-shadow-sm text-shadow-black/50 text-4xl">{title}</h2>
          <p className="mt-4 max-w-148 text-white text-shadow-xs text-shadow-black/70 text-[17px]">
            {paragraph}
          </p>
        </div>
      </Link>
  )
}