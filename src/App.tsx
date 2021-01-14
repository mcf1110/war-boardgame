import { Client } from 'boardgame.io/react';
import { Board } from './board';
import { War } from './Game';

const App = Client({ game: War, board: Board });

export default App;