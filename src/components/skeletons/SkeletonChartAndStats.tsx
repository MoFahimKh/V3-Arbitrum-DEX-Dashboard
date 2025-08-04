import { Skeleton } from "./Skeleton";

export function ChartAndStatsSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton width="48px" height="48px" />
          <div>
            <Skeleton width="150px" height="26px" className="mb-2" />
            <Skeleton width="60px" height="18px" />
          </div>
        </div>
        <Skeleton width="180px" height="36px" className="mb-4" />
        <Skeleton width="500px" height="220px" className="mb-6" />
        <div className="flex gap-2 mb-2">
          {["1M", "5M", "1H", "6H", "24H"].map((tab) => (
            <Skeleton key={tab} width="50px" height="32px" />
          ))}
        </div>
      </div>
      <div className="flex-shrink-0 w-full lg:w-[340px] lg:ml-8 mr-[170px]">
        <Skeleton width="160px" height="32px" className="mb-5" />
        <Skeleton width="140px" height="28px" className="mb-3" />
        <Skeleton width="140px" height="28px" className="mb-3" />
        <Skeleton width="140px" height="28px" className="mb-3" />
        <Skeleton width="140px" height="28px" className="mb-3" />
      </div>
    </div>
  );
}
