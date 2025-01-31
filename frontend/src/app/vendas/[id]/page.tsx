"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";

interface Venda {
  id: number;
  criadoEm: string;
  produtos: { id: number; nome: string }[];
}

export default function DetalheVendaPage() {
  const { id } = useParams();
  const [venda, setVenda] = useState<Venda | null>(null);

  useEffect(() => {
    if (id) {
      api
        .get(`/vendas/${id}`)
        .then((response) => setVenda(response.data))
        .catch((error) => console.error("Erro ao buscar venda:", error));
    }
  }, [id]);

  if (!venda) return <p>Carregando...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Venda #{venda.id}</h1>
      <p>Data: {new Date(venda.criadoEm).toLocaleString()}</p>
      <h2 className="text-xl mt-4">Produtos</h2>
      <ul>
        {venda.produtos.map((produto) => (
          <li key={produto.id}>{produto.nome}</li>
        ))}
      </ul>
    </div>
  );
}
