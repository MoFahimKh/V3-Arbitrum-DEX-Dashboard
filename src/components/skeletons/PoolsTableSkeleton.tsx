import { Skeleton } from "./Skeleton";

export function PoolsTableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-[#181818] p-4 w-full max-w-3xl mx-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-[#b8b8b8] border-b border-[#2c2c2c] text-[20px] font-light">
            <th className="py-3 "></th>
            <th className="py-3 font-light">Pools</th>
            <th className="py-3 font-light">Protocol</th>
            <th className="py-3 font-light">Fee tier</th>
            <th className="py-3 font-light">TVL</th>
            <th className="py-3 font-light">Pool APR</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, i) => (
            <tr
              key={i}
              className="border-b border-[#232323] last:border-0 group"
            >
              <td className="py-5 pr-4 align-middle text-[#b8b8b8] text-lg w-8">
                <Skeleton width="24px" height="20px" />
              </td>
              <td className="py-5">
                <div className="flex items-center">
                  <Skeleton width="32px" height="32px" className="mr-2" />
                  <Skeleton width="32px" height="32px" className="mr-2" />
                  <Skeleton width="80px" height="20px" className="ml-2" />
                </div>
              </td>
              <td className="py-5">
                <Skeleton width="90px" height="20px" />
              </td>
              <td className="py-5">
                <Skeleton width="55px" height="20px" />
              </td>
              <td className="py-5">
                <Skeleton width="80px" height="20px" />
              </td>
              <td className="py-5">
                <Skeleton width="55px" height="20px" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
