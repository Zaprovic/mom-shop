import Link from "next/link";
import Navbar from "./navbar";
import NavbarIcons from "./navbar-icons";
import AuthChecker from "./auth-checker";
import LogoutBtn from "./logout-btn";
import { StoreIcon } from "lucide-react";
import { Suspense } from "react";
import AsideMenu from "./aside-menu";

const Header = () => {
  return (
    <header className="bg-background/95 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-18">
        <div className="flex items-center gap-3">
          <AsideMenu />

          <Link
            href="/"
            className="flex items-center"
            aria-label="YeseCommerce Home"
          >
            <StoreIcon className="h-5 w-5 sm:mr-2" />
            <span className="hover:text-primary/90 hidden text-lg font-medium tracking-wide sm:inline-block md:text-xl">
              YeseCommerce
            </span>
          </Link>
        </div>

        <div className="hidden md:block">
          <Navbar />
        </div>

        <div className="flex items-center">
          <NavbarIcons />

          <div className="ml-1 hidden md:flex md:items-center">
            <LogoutBtn />
            <Suspense fallback={<div>Loading...</div>}>
              <div className="ml-2">
                <AuthChecker />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
