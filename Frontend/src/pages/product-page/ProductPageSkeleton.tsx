import Divider from "@/components/common/Divider";
import Skeleton from "@/components/common/Skeleton";

export default function ProductPageSkeleton() {
  return (
    <div className="mt-16 px-24 flex flex-col bg-gray">
      <div className="pt-8 flex w-full">
        <div className="flex w-160 h-124">
          <div className="flex flex-col w-40 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <Skeleton key={index} className="h-28 w-28" />
            ))}
          </div>
          <div className="group relative flex w-full bg-gray-dark rounded-2xl">
            <Skeleton className="w-full" />
          </div>
        </div>

        <div className="pl-8 flex-1 flex flex-col gap-4">
          <Skeleton className="h-12 w-60 rounded-xl" />

          <div className="relative flex">
            <Skeleton className="h-8 w-32" />
          </div>

          <Skeleton className="w-24 h-6" />

          <Divider />

          <div className="mt-2 flex flex-col gap-3">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-32 h-8" />
          </div>

          <div>
            <Skeleton className="mb-2 w-12 h-8" />
            <Skeleton className="w-28 h-8" />
          </div>

          <div className="mt-4 flex h-12">
            <Skeleton className="mr-4 h-full w-48 rounded-3xl" />
            <Skeleton className="w-full h-12 rounded-2xl" />
          </div>
          <div className="flex">
            <Skeleton className="mr-4 w-12 h-12" />
            <Skeleton className="w-full h-12" />
          </div>

          <h2 className="mt-4 text-xl font-semibold">Description</h2>
          <div className="flex flex-col gap-4 text-primary-black">
            <Skeleton className="w-40 h-20" />
          </div>
        </div>
      </div>
    </div>
  )
}