import { useState } from "react";
import { ChevronDown, Flag } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type LanguageOption = {
  code: string; // e.g., "en" or "bn"
  label: string; // e.g., "English"
  icon: typeof Flag;
};

const languages: LanguageOption[] = [
  { code: "en", label: "English", icon: Flag },
  { code: "bn", label: "Bangla", icon: Flag },
  // Add more languages here
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState<LanguageOption>(languages[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <selected.icon className="w-4 h-4" />
          {selected.label}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="m-2">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setSelected(lang)}
            className="flex items-center gap-2"
          >
            <lang.icon className="w-4 h-4" />
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
