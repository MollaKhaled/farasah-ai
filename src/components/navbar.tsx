
import AppThemeToggle from "./app-theme-toggle";
import { NavUser } from "./nav-user";
import IconNotification from "./svg-icon/icon-notification";
import SearchBar from "./ui/search-bar";
import { SidebarTrigger } from "./ui/sidebar";
import LanguageSelector from "./language-selector";

export default function Navbar() {
  
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon] justify-between px-2 md:px-4 ">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex items-center justify-between w-full px-4 py-2">
        <div className="w-1/3 ">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4 ">
          <AppThemeToggle />
          <LanguageSelector />
          <IconNotification className="w-24 h-24 cursor-pointer hover:opacity-70" />
          <NavUser />
        </div>
      </div>
    </header>
  );
}
