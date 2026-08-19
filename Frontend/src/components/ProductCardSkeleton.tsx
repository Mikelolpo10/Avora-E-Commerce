import Skeleton from "@/components/common/Skeleton"

export default function ProductCardSkeleton() {
  return (
    <div
      className="px-2 max-h-120 flex flex-col"
    >
      <div className="relative flex h-full w-full items-center overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="mb-8 pt-3 flex flex-col gap-2">
        <Skeleton className="w-40 h-5" />
        <div className="flex text-[15px] font-semibold">
          <Skeleton className="w-24 h-5" />
        </div>
        <div className="flex gap-0.5 text-xs">
          <Skeleton className="w-16 h-4" />
        </div>
      </div>
    </div>
  )
}