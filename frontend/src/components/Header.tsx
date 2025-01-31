import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sistema de Vendas</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/produtos" className="hover:underline">
                Produtos
              </Link>
            </li>
            <li>
              <Link href="/vendas" className="hover:underline">
                Vendas
              </Link>
            </li>
            <li>
              <Link href="/compras" className="hover:underline">
                Compras
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
