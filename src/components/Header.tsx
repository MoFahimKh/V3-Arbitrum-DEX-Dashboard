import { SearchBar } from "./SearchBar";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">
              <a href="/" className="text-primary">
                Neobase FE Assignment
              </a>
            </h1>
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
};
