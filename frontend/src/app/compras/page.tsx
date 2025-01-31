"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Venda {
  id: number;
  criadoEm: string;
  produtos: {
    id: number;
    nome: string;
    preco: number;
  }[];
}

interface ProdutoSelecionado {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export default function NovaCompra() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);
  const [produtosSelecionados, setProdutosSelecionados] = useState<
    ProdutoSelecionado[]
  >([]);
  const router = useRouter();

  // Carrega a lista de vendas ao montar o componente
  useEffect(() => {
    axios.get("http://localhost:3000/vendas").then((response) => {
      setVendas(response.data);
    });
  }, []);

  // Carrega os produtos da venda selecionada
  const handleSelecionarVenda = (vendaId: number) => {
    const venda = vendas.find((v) => v.id === vendaId);
    if (venda) {
      setVendaSelecionada(venda);
      // Inicializa os produtos selecionados com quantidade 0
      setProdutosSelecionados(
        venda.produtos.map((produto) => ({
          ...produto,
          quantidade: 0,
        }))
      );
    }
  };

  // Atualiza a quantidade de um produto selecionado
  const handleQuantidadeChange = (productId: number, quantidade: number) => {
    setProdutosSelecionados((prev) =>
      prev.map((produto) =>
        produto.id === productId ? { ...produto, quantidade } : produto
      )
    );
  };

  // Envia os dados da compra ao backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filtra apenas os produtos com quantidade maior que 0
    const produtosComprados = produtosSelecionados.filter(
      (produto) => produto.quantidade > 0
    );

    // Validação: Verifica se pelo menos um produto foi selecionado
    if (produtosComprados.length === 0) {
      alert("Selecione pelo menos um produto e defina a quantidade.");
      return;
    }

    try {
      // Cria uma compra para cada produto selecionado
      for (const produto of produtosComprados) {
        await axios.post("http://localhost:3000/compras", {
          vendaId: vendaSelecionada?.id,
          produtoId: produto.id,
          quantidade: produto.quantidade,
        });
      }

      router.push("/compras"); // Redireciona para a página de compras após criar as compras
    } catch (error) {
      console.error("Erro ao criar compra:", error);
      alert("Ocorreu um erro ao criar a compra. Tente novamente.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl text-gray-900 mb-4">Nova Compra</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-4 text-gray-900 ">
          <label className="block  text-gray-900  mb-2">
            Selecione a Venda
          </label>
          <select
            onChange={(e) => handleSelecionarVenda(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Selecione uma venda</option>
            {vendas.map((venda) => (
              <option key={venda.id} value={venda.id}>
                Venda #{venda.id} -{" "}
                {new Date(venda.criadoEm).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        {vendaSelecionada && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Produtos da Venda
            </label>
            <ul className="space-y-2">
              {produtosSelecionados.map((produto) => (
                <li
                  key={produto.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold">{produto.nome}</p>
                    <p className="text-gray-600">
                      R$ {produto.preco.toFixed(2)}
                    </p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={produto.quantidade}
                    onChange={(e) =>
                      handleQuantidadeChange(produto.id, Number(e.target.value))
                    }
                    className="w-20 p-2 border rounded"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Criar Compra
        </button>
      </form>
    </div>
  );
}
