"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  nome: string;
  preco: number;
}

export default function NovaVenda() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const router = useRouter();

  // Carrega a lista de produtos ao montar o componente
  useEffect(() => {
    axios.get("http://localhost:3000/produtos").then((response) => {
      setProdutos(response.data);
    });
  }, []);

  // Manipula a seleção/deseleção de produtos
  const handleProductSelection = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      // Remove o produto da lista de selecionados
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      // Adiciona o produto à lista de selecionados
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Envia os IDs dos produtos selecionados ao backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação: Verifica se pelo menos um produto foi selecionado
    if (selectedProducts.length === 0) {
      alert("Selecione pelo menos um produto.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/vendas", {
        produtosIds: selectedProducts,
      });
      router.push("/vendas"); // Redireciona para a página de vendas após criar a venda
    } catch (error) {
      console.error("Erro ao criar venda:", error);
      alert("Ocorreu um erro ao criar a venda. Tente novamente.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Nova Venda</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Selecione os Produtos
          </label>
          <p className="text-gray-600 mb-4">
            {selectedProducts.length} produto(s) selecionado(s)
          </p>
          <ul className="space-y-2">
            {produtos.map((product) => (
              <li key={product.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`product-${product.id}`}
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleProductSelection(product.id)}
                  className="mr-2"
                />
                <label
                  htmlFor={`product-${product.id}`}
                  className="text-gray-700"
                >
                  {product.nome} - R$ {product.preco.toFixed(2)}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Criar Venda
        </button>
      </form>
    </div>
  );
}
