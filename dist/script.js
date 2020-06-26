class Jogo extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "jogo" },
      React.createElement("div", { className: "jogo-tabuleiro" },
      React.createElement(Tabuleiro, null)),


      React.createElement("div", { className: "jogo-info" },
      React.createElement("ol", null))));



  }}


class Tabuleiro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quadrados: Array(9).fill(null),
      xIsNext: true,
      x: true };

    this.reiniciarJogo = this.reiniciarJogo.bind(this);
  }
  render() {
    return (

      React.createElement("div", null,
      React.createElement(Restart, {
        value: "Reiniciar",
        onClick: () => {
          this.reiniciarJogo();
        } }),

      React.createElement(RandomValue, {
        value: "Aleatorio",
        onClick: () => {
          this.jogarAleatorio();
        } }),


      React.createElement(Melhorjogada, {
        value: "Melhor Jogada",
        onClick: () => {
          this.melhorJogada();
        } }),




      React.createElement("text", null, this.state.x, " "),
      this.state.x ?
      React.createElement("div", null,
      React.createElement("div", { className: "linha" },
      this.renderizarQuadrado(0),
      this.renderizarQuadrado(1),
      this.renderizarQuadrado(2)),

      React.createElement("div", { className: "linha" },
      this.renderizarQuadrado(3),
      this.renderizarQuadrado(4),
      this.renderizarQuadrado(5)),

      React.createElement("div", { className: "linha" },
      this.renderizarQuadrado(6),
      this.renderizarQuadrado(7),
      this.renderizarQuadrado(8))) :



      React.createElement("div", null,
      React.createElement("div", { className: "linha" },
      this.renderizarQuadrado(0),
      this.renderizarQuadrado(1),
      this.renderizarQuadrado(2)),

      React.createElement("div", { className: "linha" },
      this.renderizarQuadrado(3),
      this.renderizarQuadrado(4),
      this.renderizarQuadrado(5)),

      React.createElement("div", { className: "linha" },
      this.renderizarQuadrado(6),
      this.renderizarQuadrado(7),
      this.renderizarQuadrado(8)))));






  }
  reiniciarJogo() {
    this.setState({
      quadrados: Array(9).fill(null),
      xIsNext: true,
      x: this.state.x ? false : true });

  }
  renderizarQuadrado(i) {
    return (
      React.createElement(Quadrado, {
        value: this.state.quadrados[i],
        onClick: () => this.handleClick(i) }));


  }


  jogarAleatorio() {
    var RandomNumber = Math.floor(Math.random() * 9) + 0;
    this.clickAleatorio(RandomNumber);

  }
  melhorJogada() {
    const quadrados = this.state.quadrados.slice();
    let jogada = calculateBestMove(quadrados);
    if (jogada) {
      this.melhorClick(jogada);
    }
  }

  melhorClick(i) {
    const quadrados = this.state.quadrados.slice();
    let vencedor = calculateWinner(quadrados);
    if (vencedor) {
      alert(vencedor + " ganhou!");
      return;
    }
    if (quadrados[i]) {
      this.clickAleatorio(i);
      return;
    }

    quadrados[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
  }
  handleClick(i) {
    const quadrados = this.state.quadrados.slice();
    let vencedor = calculateWinner(quadrados);
    if (vencedor) {
      alert(vencedor + " ganhou!");
      return;
    }
    if (quadrados[i]) {
      alert("Quadrado ocupado!");
      return;
    }
    quadrados[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
  }
  clickAleatorio(i) {
    const quadrados = this.state.quadrados.slice();
    let vencedor = calculateWinner(quadrados);
    if (vencedor) {
      alert(vencedor + " ganhou!");
      return;
    }
    if (quadrados[i]) {
      this.jogarAleatorio();
      return;

    }
    quadrados[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
  }}


function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    return squares[a];
  }
  return null;
}

function calculateBestMove(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] != squares[c])
    return c;
    if (squares[a] && squares[a] === squares[c] && squares[a] != squares[b])
    return b;

    if (squares[c] && squares[c] === squares[b] && squares[c] != squares[a])
    return a;


  }

}





class Quadrado extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("button", { className: "quadrado", onClick: () => this.props.onClick() },
      this.props.value));


  }}


function Restart(props) {
  return (
    React.createElement("button", { class: "btnEscolha", onClick: props.onClick },
    props.value));


}

function RandomValue(props) {
  return (
    React.createElement("button", { class: "btnEscolha", onClick: props.onClick },
    props.value));


}


function Melhorjogada(props) {
  return (
    React.createElement("button", { class: "btnEscolha", onClick: props.onClick },
    props.value));


}

ReactDOM.render(React.createElement(Jogo, null), document.getElementById("root"));