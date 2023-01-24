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
    const [words] = useState(wordsList)

  return (
    <div className="App">
        {gameStage === "start" && <StartScreen />}
        {gameStage === "game" && <GameScreen />}
        {gameStage === "end" && <EndScreen />}
    </div>
  );
}

export default App;
