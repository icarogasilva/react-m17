import { useEffect, useState } from 'react';
import ProdutoCard from '../components/ProdutoCard.jsx';
import ProdutoForm from '../components/ProdutoForm.jsx';

const API_URL = 'https://crudcrud.com/api/4d64a2664cf34ddbb01b9ff65c9e036e/produtos';

function Catalogo() {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregamento = setTimeout(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setListaProdutos(data);
          setCarregando(false);
        })
        .catch((error) => {
          console.error('Erro ao buscar produtos:', error);
          setCarregando(false);
        });
    }, 1000);

    return () => clearTimeout(carregamento);
  }, []);

  function adicionarProduto(novoProduto) {
    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoProduto),
    })
      .then((response) => response.json())
      .then((produtoCriado) => {
        setListaProdutos((produtosAtuais) => [...produtosAtuais, produtoCriado]);
        return true;
      })
      .catch((error) => {
        console.error('Erro ao adicionar produto:', error);
        return false;
      });
  }

  return (
    <main className="catalogo">
      <header>
        <h1>Produtos</h1>
      </header>

      <ProdutoForm onAdicionar={adicionarProduto} />

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <section className="produtos">
          {listaProdutos.map((produto) => (
            <ProdutoCard
              key={produto._id}
              nome={produto.nome}
              preco={produto.preco}
              imagem={produto.imagem}
              descricao={produto.descricao}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Catalogo;
