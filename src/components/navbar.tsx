import { NavUser } from "./nav-user";
import IconNotification from "./svg-icon/icon-notification";
import SearchBar from "./ui/search-bar";
import { SidebarTrigger } from "./ui/sidebar";
import { useIsMobile } from "../hooks/use-mobile";
import { DropdownSelector, type DropdownOption } from "./dropdown";
import { Flag } from "lucide-react";

export default function Navbar() {
  const languages: DropdownOption<string>[] = [
  { value: "en", label: "English", icon: Flag },
  { value: "bn", label: "Bangla", icon: Flag },
];

  const isMobile = useIsMobile()
  
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon] justify-between px-2 md:px-4 ">
        {isMobile &&  <SidebarTrigger className="-ml-1" />}

      <div className="flex items-center justify-between w-full px-4 py-2">
        <div className="w-1/3 ">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4 ">
          {/* <AppThemeToggle /> */}
          {/* <LanguageSelector /> */}
          <DropdownSelector options={languages} />
          <IconNotification className="w-24 h-24 cursor-pointer hover:opacity-70" />
          <NavUser  />
        </div>
      </div>
    </header>
  );
}
