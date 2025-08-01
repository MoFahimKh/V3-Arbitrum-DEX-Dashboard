import { useParams } from "react-router-dom";
import { TokenDetail } from "@/components/TokenDetail";

const TokenDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="p-8 text-center">Token ID not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <TokenDetail tokenId={id} />
    </div>
  );
};

export default TokenDetailPage;
