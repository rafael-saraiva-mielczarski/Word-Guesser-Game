import './EndScreen.css';

const EndScreen = ({ retryGame, score, secretWord }) => {
  return (
    <div>
        <h1>Your attempts are over</h1>
        <h2>Your score: <span>{score}</span></h2>
        <h3>The secret word was: <span>{secretWord}</span></h3>
        <button onClick={retryGame}>Try again?</button>
    </div>
  )
}

export default EndScreen