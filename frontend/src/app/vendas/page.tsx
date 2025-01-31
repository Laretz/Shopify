"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Venda {
  id: number;
  criadoEm: string;
  produtos: {
    id: number;
    nome: string;
    preco: number;
  }[];
}

export default function Vendas() {
  const [sales, setSales] = useState<Venda[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/vendas").then((response) => {
      setSales(response.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Vendas</h2>
      <Link
        href="/vendas/nova"
        className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Nova Venda
      </Link>
      <ul className="space-y-4">
        {sales.map((sale) => (
          <li key={sale.id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="font-semibold text-lg">Venda #{sale.id}</p>
            <p className="text-gray-950">
              Data: {new Date(sale.criadoEm).toLocaleDateString()}
            </p>
            <ul className="mt-2">
              {sale.produtos.map((product) => (
                <li key={product.id} className="ml-4">
                  {product.nome} - R$ {product.preco.toFixed(2)}
                </li>
              ))}
            </ul>
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
