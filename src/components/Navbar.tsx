import { SearchBar } from "./SearchBar";
import AlphaswapIcon from "@/public/icons/alphaswap-icon.svg";
import { WalletConnector } from "./WalletConnector";

export const Navbar = () => {
  return (
    <header className="bg-[#181818] border-b border-[#222529] shadow">
      <div className="p-8 mx-auto  h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 flex items-center justify-center">
            <img src={AlphaswapIcon} alt="" />
          </span>
          <a
            href="/"
            className="text-[#00FFF0] text-2xl font-semibold tracking-tight"
          >
            AlphaSwap
          </a>
        </div>

        <nav className="flex items-center gap-8">
          <span className="text-gray-300 text-base font-normal text-[16px]">
            Explore
          </span>
          <SearchBar />
          <WalletConnector />
        </nav>
      </div>
    </header>
  );
};
