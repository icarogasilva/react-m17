import { useState } from 'react';

function ProdutoForm({ onAdicionar }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const novoProduto = {
      nome,
      preco: Number(preco),
      descricao,
      imagem,
    };

    const adicionado = await onAdicionar(novoProduto);

    if (adicionado) {
      setNome('');
      setPreco('');
      setDescricao('');
      setImagem('');
    }
  }

  return (
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
        min="0"
        step="0.01"
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
  );
}

export default ProdutoForm;
