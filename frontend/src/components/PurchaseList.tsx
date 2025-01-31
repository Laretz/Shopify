import axios from "axios";
import { useEffect, useState } from "react";

interface Purchase {
  id: number;
  vendaId: number;
  produtoId: number;
  quantidade: number;
  produto: {
    id: number;
    nome: string;
    preco: number;
  };
}

export default function PurchaseList() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/compras").then((response) => {
      setPurchases(response.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Compras</h2>
      <ul className="space-y-4">
        {purchases.map((purchase) => (
          <li key={purchase.id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">Compra #{purchase.id}</p>
            <p>Produto: {purchase.produto.nome}</p>
            <p>Quantidade: {purchase.quantidade}</p>
            <p>
              Total: R${" "}
              {(purchase.quantidade * purchase.produto.preco).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
