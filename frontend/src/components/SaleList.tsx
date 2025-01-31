import axios from "axios";
import { useEffect, useState } from "react";

interface Sale {
  id: number;
  criadoEm: string;
  produtos: {
    id: number;
    nome: string;
    preco: number;
  }[];
}

export default function SaleList() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/vendas").then((response) => {
      setSales(response.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Vendas</h2>
      <ul className="space-y-4">
        {sales.map((sale) => (
          <li key={sale.id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">Venda #{sale.id}</p>
            <p>Data: {new Date(sale.criadoEm).toLocaleDateString()}</p>
            <ul className="mt-2">
              {sale.produtos.map((product) => (
                <li key={product.id} className="ml-4">
                  {product.nome} - R$ {product.preco.toFixed(2)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
