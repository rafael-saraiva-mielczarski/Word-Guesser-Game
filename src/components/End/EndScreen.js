import './EndScreen.css';

const EndScreen = ({ retryGame, score, secretWord }) => {
  return (
    <div>
        <h1>Suas tentativas acabaram!</h1>
        <h2>Sua pontuação foi: <span>{score}</span></h2>
        <h3>A palavra secreta era: <span>{secretWord}</span></h3>
        <button onClick={retryGame}>Tentar outra palavra</button>
    </div>
  )
}

export default EndScreen