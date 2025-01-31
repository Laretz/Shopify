"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";

interface Produto {
  id: number;
  nome: string;
}

interface Compra {
  id: number;
  criadoEm: string;
  vendaId: number;
  produtos: Produto[];
}

export default function DetalheCompraPage() {
  const params = useParams<{ id: string }>();
  const [compra, setCompra] = useState<Compra | null>(null);

  useEffect(() => {
    if (params.id) {
      api
        .get<Compra>(`/compras/${params.id}`)
        .then((response) => setCompra(response.data))
        .catch((error) => console.error("Erro ao buscar compra:", error));
    }
  }, [params.id]);

  if (!compra) return <p>Carregando...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Compra #{compra.id}</h1>
      <p>Data: {new Date(compra.criadoEm).toLocaleString()}</p>
      <p>
        Venda Relacionada:{" "}
        <a href={`/vendas/${compra.vendaId}`} className="text-blue-500">
          Venda #{compra.vendaId}
        </a>
      </p>
      <h2 className="text-xl mt-4">Produtos Comprados</h2>
      <ul>
        {compra.produtos.map((produto) => (
          <li key={produto.id}>{produto.nome}</li>
        ))}
      </ul>
    </div>
  );
}
