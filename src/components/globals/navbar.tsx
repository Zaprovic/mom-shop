import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="hidden items-center space-x-8 text-sm md:flex md:text-base">
      <Link href={"/categories"} className="header-link -tracking-wider">
        Categorias
      </Link>
      <Link href={"/products"} className="header-link -tracking-wider">
        Productos
      </Link>
    </nav>
  );
};

export default Navbar;
