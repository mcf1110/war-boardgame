import { BoardProps } from 'boardgame.io/dist/types/packages/react';
import React from 'react';
import G from '../models/G';
import Territory from './territory/Territory';

export class Board extends React.Component<BoardProps<G>> {
    claim(id: number) {
        this.props.moves.claimTerritory(id);
    }

    deploy(id: number, amount: number) {
        this.props.moves.deployToTerritory(id, amount);
    }

    render() {
        if(!this.props.isActive){
            //inactive player
            return (<div>
                <div style={{ display: 'flex' }}>
                    {this.props.G.territories.map((t, id) => <div key={t.name}><Territory t={t}></Territory></div>)}
                </div>
                <h1>Guenta ai filhote</h1>
            </div>)
        }
        if(!this.props.playerID){
            //spectator
            return (<div>
                <div style={{ display: 'flex' }}>
                    {this.props.G.territories.map((t, id) => <div key={t.name}><Territory t={t}></Territory></div>)}
                </div>
                <h1>Espectador</h1>
            </div>)
        }
        if(this.props.ctx.phase === 'choosing'){
            return (<div style={{ display: 'flex' }}>
                {this.props.G.territories.map((t, id) => <div onClick={() => this.claim(id)} key={t.name}><Territory t={t}></Territory></div>)}
            </div>)
        }
        if(this.props.ctx.activePlayers === null){
            return <p>Erro</p>
        }
        const phase = this.props.ctx.activePlayers[this.props.playerID] as string;
        if(phase === 'deploy'){
            return  (<div style={{ display: 'flex' }}>
                {this.props.G.territories.map((t, id) => (<div key={t.name}>
                    <Territory t={t}></Territory>
                    {t.currentOwner === this.props.ctx.currentPlayer ?
                    (<div><button onClick={() => this.deploy(id, 1)}>+</button>
                    <button onClick={() => this.deploy(id, -1)}>-</button></div>)
                    : ''}
                    </div>))}
                <button onClick={() => this.props.moves.done()}>Finalizar</button>
            </div>);
        } else if (phase === 'attack'){
            return <h1>Atacar</h1>
        }
        return <p>?</p>
    }
}