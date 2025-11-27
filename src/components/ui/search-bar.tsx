

import { useId } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "./input";


interface SearchBarProps {
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
}

export default function SearchBar({
  searchValue = "",
  searchPlaceholder = "Search...",
  onSearchChange,
}: SearchBarProps) {
  const id = useId();

  return (
    <div className="relative w-full max-w-xs ">
      <Input
        id={`search-${id}`}
        className="peer h-8 w-full ps-8 pe-2 bg-[#FFFFFF]"
        type="search"
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
      />

      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50 ">
        <SearchIcon size={16} />
      </div>
    </div>
  );
}
