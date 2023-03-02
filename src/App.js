import './App.css';
import { useCallback, useState, useEffect } from 'react'
import { wordsList } from './data/words';
import StartScreen from './components/Start/StartScreen';
import GameScreen from './components/Game/GameScreen';
import EndScreen from './components/End/EndScreen';

const stages = [
    {id: 1, name: "start"},
    {id: 2, name: "game"},
    {id: 3, name: "end"}
]
function App() {
    const [gameStage, setGameStage] = useState(stages[0].name);
    
    const [words] = useState(wordsList);
    const [chosenWord, setChosenWord] = useState("");
    const [chosenCategory, setChosenCategory] = useState("");
    const [letters, setLetters] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState("");
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(3);
    const [score, setScore] = useState(0);


    const chooseWordAndCategory = useCallback(() => {
        //get secret word and hint for the game
        const categories = Object.keys(words);
        const category = categories[
            Math.floor(Math.random() * Object.keys(categories).length)
        ]
        
        const secretWord = words[category][Math.floor(Math.random() * words[category].length)]

        return {secretWord, category}
    }, [words]);

    const onStartGame = useCallback(() => {
        //limpar todas letras
        clearLetterStates();

        //get secret word and hint
        const { secretWord, category } = chooseWordAndCategory();

        //split word into letter and make it case insensitive
        let wordLetters = secretWord.split("");
        wordLetters = wordLetters.map((letter) => letter.toLowerCase());

        //create initial state
        setChosenCategory(category);
        setChosenWord(secretWord);
        setLetters(wordLetters);
        
        setGameStage(stages[1].name);
    }, [chooseWordAndCategory]);

    const verifyLetter = (letter) => {
        const lowereCasedLetter = letter.toLowerCase();

        //checar se a letra ja foi utilizada
        if( guessedLetters.includes(lowereCasedLetter) || wrongLetters.includes(lowereCasedLetter)) {   
            alert("This letter was already used!")
           return;
        }

        //mostrar a letra or remover uma chance
        if(letters.includes(lowereCasedLetter)) {
            setGuessedLetters((actualGuessedLetter) => [
                ...actualGuessedLetter,
                lowereCasedLetter
            ]);
        } else {
            setWrongLetters((actualWrongLetter) => [
                ...actualWrongLetter,
                lowereCasedLetter
            ]);

            setGuesses((actualGuesses) => actualGuesses - 1)
        }
    };

    //resetar ao estado inicial do jogo
    function clearLetterStates() {
        setGuessedLetters([]);
        setWrongLetters([]);
    }

    //checar se a tentativas acabaram e finalizar o jogo
    useEffect(() => {
        if(guesses <= 0) {
            //resetar todos estados
            clearLetterStates();

            setGameStage(stages[2].name);
        }

    }, [guesses]);

    //checar condição de vitória
    useEffect(() => {
        const uniqueLetters = [...new Set(letters)]
        //condição da vitória
        if(guessedLetters.length === uniqueLetters.length) {
            //adicionar score
            setScore((actualScore) => actualScore += 100);

            //recomeçar o jogo
            onStartGame();
        }

    }, [guessedLetters, letters, onStartGame])

    //func para recomeçar o jogo
    const onRetryGame = () => {
        setScore(0);
        setGuesses(3);

        setGameStage(stages[0].name);
    };

  return (
    <div className="App">
        {gameStage === "start" && <StartScreen startGame={onStartGame} />}
        {gameStage === "game" && 
        <GameScreen 
        verify={verifyLetter} 
        hint={chosenCategory} 
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guessesLeft={guesses}
        score={score}
        />}
        {gameStage === "end" && <EndScreen 
        retryGame={onRetryGame}
        score={score} 
        secretWord={chosenWord}/>}
    </div>
  );
}

export default App;
