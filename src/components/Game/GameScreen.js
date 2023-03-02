import { useState, useRef } from 'react';
import './GameScreen.css';

const GameScreen = (
    { 
        verify, 
        hint, 
        letters,
        guessedLetters, 
        wrongLetters, 
        guessesLeft, 
        score 
    }
) => {
    const [letter, setLetter] = useState("");
    //cria uma referencia a alguma lugar
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        verify(letter);
        setLetter("");
        //deixa o jogo mais dinamico e rapido
        letterInputRef.current.focus();
    };

  return (
    <div className='game'>
        <p className="points">
            <span>Score: {score}</span>
        </p>
        <h1>Guess the word</h1>
        <h3 className="hint">Hint: <span>{hint}</span></h3>
        <p>You still have {guessesLeft} attempts</p>
        <div className="wordContainer">
            {letters.map((letter, i) => 
                guessedLetters.includes(letter) ? (
                    <span key={i} className="letter">{letter}</span>
                ) : (
                    <span key={i} className="blankSquare"></span>
                )
            )}
        </div>
        <div className="letterContainer">
            <p>Try guess the letters</p>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name='letter'
                maxLength='1' 
                required
                onChange={(e) => setLetter(e.target.value)} 
                value={letter}
                ref={letterInputRef}/>
                <button>Try</button>
            </form>
        </div>
        <div className="wrongLetterContainer">
            <p>Letters already used: </p>
            {wrongLetters.map((letter, i) => (
                <span key={i}>{letter} - </span>
            ))}
        </div>
    </div>
  )
}

export default GameScreen