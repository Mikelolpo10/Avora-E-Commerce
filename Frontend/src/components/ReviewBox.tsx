import type { Review } from '../pages/homepage/Reviews'

export default function ReviewBox({ title, body, source }: Review) {
  return (
    <div className="py-4 px-12 flex w-120 shrink-0 flex-col justify-center items-center gap-6 border border-gray-400 rounded-xl bg-white text-center shadow">
      <h2 className="pt-4 text-primary text-xl font-bold">{title}</h2>
      <p className="text-sm text-black/70">
        "{body}"
      </p>
      <span className="pb-4 text-sm text-black font-semibold italic">{source}</span>
    </div>
  )
}