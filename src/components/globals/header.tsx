import Link from "next/link";
import Navbar from "./navbar";
import NavbarIcons from "./navbar-icons";
import AuthChecker from "./auth-checker";
import LogoutBtn from "./logout-btn";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full border-b px-6 py-4 backdrop-blur-sm transition-all duration-300 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href={"/"}
          className="hidden pl-30 text-xl font-light tracking-widest transition-colors sm:block md:p-0"
        >
          YeseCommerce
        </Link>
        <Navbar />

        <div className="flex gap-3">
          <NavbarIcons />
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <LogoutBtn />
                </TooltipTrigger>
                <TooltipContent>Salir</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <AuthChecker />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
