import { BoardProps } from 'boardgame.io/dist/types/packages/react';
import React from 'react';
import G from '../models/G';
import Territory from './territory/Territory';

export class Board extends React.Component<BoardProps<G>> {
    onClick(id: number) {
        this.props.moves.clickCell(id);
    }

    render() {
        return (<div style={{ display: 'flex' }}>
            {this.props.G.territories.map((t, id) => <div onClick={() => this.onClick(id)} key={t.name}><Territory t={t}></Territory></div>)}
        </div>)
    }
}