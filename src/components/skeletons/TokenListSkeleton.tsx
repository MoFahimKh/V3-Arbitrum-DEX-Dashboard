export const TokenListSkeleton = () => {
  const rows = Array.from({ length: 10 });

  return (
    <>
      {rows.map((_, idx) => (
        <tr key={idx} className="border-b border-[#24262c]">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#2c2f36] rounded-full animate-pulse" />
              <div className="h-4 w-24 bg-[#2c2f36] rounded-md animate-pulse" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-16 bg-[#2c2f36] rounded-md animate-pulse" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-10 bg-[#2c2f36] rounded-md animate-pulse" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-10 bg-[#2c2f36] rounded-md animate-pulse" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-20 bg-[#2c2f36] rounded-md animate-pulse" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-20 bg-[#2c2f36] rounded-md animate-pulse" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-16 bg-[#2c2f36] rounded-md animate-pulse" />
          </td>
        </tr>
      ))}
    </>
  );
};
