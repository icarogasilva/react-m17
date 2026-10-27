import './ProdutoCard.css';

function ProdutoCard({ nome, preco, imagem, descricao }) {
  return (
    <div className="produto-card">
      <img className="imagem" src={imagem} alt={nome} />
      <div className="conteudo">
        <h2>{nome}</h2>
        <p>{descricao}</p>
        <span className="preco">R$ {preco}</span>
      </div>
    </div>
  );
}

export default ProdutoCard;
