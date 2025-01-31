export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Bem-vindo ao Sistema de Vendas!
      </h1>
      <p className="text-gray-700 mb-6">
        Navegue pelo menu para gerenciar produtos, vendas e compras.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Produtos</h2>
          <p className="text-gray-600">Gerencie seus produtos cadastrados.</p>
          <a
            href="/produtos"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ver Produtos
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Vendas</h2>
          <p className="text-gray-600">Acompanhe as vendas realizadas.</p>
          <a
            href="/vendas"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ver Vendas
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Compras</h2>
          <p className="text-gray-600">Registre e visualize as compras.</p>
          <a
            href="/compras"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ver Compras
          </a>
        </div>
      </div>
    </div>
  );
}
