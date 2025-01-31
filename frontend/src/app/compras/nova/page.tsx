"use client";

import { useState, useEffect } from "react";
import api from "../../../services/api";
import { useRouter } from "next/navigation";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface Venda {
  id: number;
  criadoEm: string;
}

export default function NovaCompra() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedVenda, setSelectedVenda] = useState<number | null>(null);
  const [selectedProduto, setSelectedProduto] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    api.get("/vendas").then((response) => {
      setVendas(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedVenda) {
      api.get(`/vendas/${selectedVenda}/produtos`).then((response) => {
        setProdutos(response.data);
        setSelectedProduto(null); // Reseta produto ao mudar a venda
      });
    } else {
      setProdutos([]);
      setSelectedProduto(null);
    }
  }, [selectedVenda]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVenda || !selectedProduto || quantidade <= 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    try {
      await api.post("/compras", {
        vendaId: selectedVenda,
        produtoId: selectedProduto,
        quantidade,
      });
      router.push("/compras"); // Redireciona para a página de compras
    } catch (error) {
      console.error("Erro ao criar compra:", error);
      alert("Erro ao criar compra. Tente novamente.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Nova Compra</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Selecione a Venda</label>
          <select
            value={selectedVenda ?? ""}
            onChange={(e) => setSelectedVenda(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value="">Escolha uma venda</option>
            {vendas.map((venda) => (
              <option key={venda.id} value={venda.id}>
                Venda #{venda.id} -{" "}
                {new Date(venda.criadoEm).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Selecione o Produto
          </label>
          <select
            value={selectedProduto ?? ""}
            onChange={(e) => setSelectedProduto(Number(e.target.value))}
            className="w-full p-2 border rounded"
            disabled={!selectedVenda}
          >
            <option value="">Escolha um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome} - R$ {produto.preco.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantidade</label>
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={!selectedVenda || !selectedProduto || quantidade <= 0}
        >
          Criar Compra
        </button>
      </form>
    </div>
  );
}
