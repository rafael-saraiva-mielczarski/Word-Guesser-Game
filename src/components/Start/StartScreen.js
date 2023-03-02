import './StartScreen.css';

const StartScreen = ({ startGame }) => {
  return (
    <div className='start'>
        <h1>Word Guesser</h1>
        <p>Click the button below to start the game</p>
        <button onClick={startGame}>Start guessing!</button>
    </div>
  )
}

export default StartScreen