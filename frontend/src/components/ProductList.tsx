"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  nome: string;
  preco: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/produtos").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Produtos</h2>
      <Link
        href="/produtos/novo"
        className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Adicionar Produto
      </Link>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="font-semibold text-gray-900 text-lg">
              {product.nome}
            </p>
            <p className="text-gray-900">R$ {product.preco.toFixed(2)}</p>
            <div className="mt-4 flex space-x-2">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                Editar
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
