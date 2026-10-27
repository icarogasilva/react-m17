import { useEffect, useState } from 'react';
import ProdutoCard from './components/ProdutoCard.jsx';

const API_URL = 'https://crudcrud.com/api/520e52b01f85498999ed5d2e28c1b6d4/produtos';

const produtos = [
  {
    _id: '1',
    nome: 'Produto 1',
    preco: 10.00,
    imagem: 'https://cdn.pixabay.com/photo/2014/02/02/17/40/photographs-256888_640.jpg',
    descricao: 'Produto 1',
  },
  {
    _id: '2',
    nome: 'produto 2',
    preco: 10.00,
    imagem: 'https://cdn.pixabay.com/photo/2014/12/27/15/31/camera-581126_640.jpg',
    descricao: 'Produto 2',
  },
  {
    _id: '3',
    nome: 'produto 3',
    preco: 10.00,
    imagem: 'https://static.vecteezy.com/ti/fotos-gratis/t2/73918768-uma-camera-sentado-em-uma-banco-dentro-uma-parque-gratis-foto.jpg',
    descricao: 'Produto 3',
  },
];

function App() {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');

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
          setListaProdutos(produtos);
          setCarregando(false);
        });
    }, 1000);

    return () => clearTimeout(carregamento);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const novoProduto = {
      nome,
      preco: Number(preco),
      descricao,
      imagem,
    };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoProduto),
    })
      .then((response) => response.json())
      .then((produtoCriado) => {
        setListaProdutos((produtosAtuais) => [...produtosAtuais, produtoCriado]);
        setNome('');
        setPreco('');
        setDescricao('');
        setImagem('');
      })
      .catch((error) => console.error('Erro ao adicionar produto:', error));
  }

  return (
    <main className="catalogo">
      <header>
        <h1>Produtos</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(event) => setPreco(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          required
        />
        <input
          type="url"
          placeholder="URL da imagem"
          value={imagem}
          onChange={(event) => setImagem(event.target.value)}
          required
        />
        <button type="submit">Adicionar produto</button>
      </form>

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

export default App;
