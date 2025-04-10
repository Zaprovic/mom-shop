import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex">
      <ul className="flex space-x-8">
        <li>
          <Link 
            href="/categories" 
            className="px-2 py-1 text-sm font-medium transition-colors hover:text-primary"
          >
            Categorias
          </Link>
        </li>
        <li>
          <Link 
            href="/products" 
            className="px-2 py-1 text-sm font-medium transition-colors hover:text-primary"
          >
            Productos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
