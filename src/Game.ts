import { Game } from "boardgame.io";
import territories from "./data/territories";
import G from "./models/G";

export const War: Game<G> = {
    setup: (ctx) => ({ territories, availableTroops: Array(ctx.numPlayers).fill(0), armedAttack: { from: null, to: null, amount: 0 } }),
    phases: {
        choosing: {
            start: true,
            next: 'main',
            moves: {
                claimTerritory(G, ctx, id: number) {
                    if (G.territories[id].currentOwner != null
                        || ctx.events?.endTurn === undefined
                        || ctx.events?.endPhase === undefined) {
                        return;
                    }
                    G.territories[id].currentOwner = ctx.currentPlayer;
                    ctx.events.endTurn();
                    if (!G.territories.some(t => t.currentOwner === null)) {
                        ctx.events.endPhase();
                    }
                },
            },
        },
        main: {
            turn: {
                activePlayers: { currentPlayer: 'deploy' },
                onBegin(G, ctx) {
                    const territoryCount = Array(ctx.numPlayers).fill(0);
                    G.territories.forEach(t => territoryCount[+(t.currentOwner as string)]++);
                    G.availableTroops = territoryCount.map(tc => Math.max(3, Math.floor(tc / 2)));
                },
                stages: {
                    deploy: {
                        next: 'attack',
                        moves: {
                            deployToTerritory(G, ctx, id: number, amount: number) {
                                if (G.territories[id].currentOwner !== ctx.currentPlayer
                                    || ctx.events?.endTurn === undefined
                                    || ctx.events?.endPhase === undefined) {
                                    return;
                                }
                                if (G.territories[id].nTroopsToDeploy === 0 && amount < 0) {
                                    return;
                                }
                                if (amount > 0 &&
                                    G.territories
                                        .filter(t => t.currentOwner === ctx.currentPlayer)
                                        .map(t => t.nTroopsToDeploy)
                                        .reduce((a, b) => a + b) >= G.availableTroops[+ctx.currentPlayer]
                                ) {
                                    return;
                                }
                                G.territories[id].nTroopsToDeploy += amount;
                            },
                            done(G, ctx) {
                                if (ctx.events?.endStage === undefined) {
                                    return;
                                }
                                G.territories.forEach(t => {
                                    t.nTroops += t.nTroopsToDeploy;
                                    t.nTroopsToDeploy = 0;
                                });
                                ctx.events.endStage();
                            }
                        },
                    },
                    attack: {
                        moves: {
                            setFrom(G, ctx, from: number) {
                                G.armedAttack.from = from;
                            },
                            setTo(G, ctx, to: number) {
                                G.armedAttack.to = to;
                            },
                            setAmount(G, ctx, amount: number) {
                                if (amount > 3 || amount < 1) {
                                    return;
                                }
                                G.armedAttack.amount = amount;
                            }
                        }
                    }
                }
            }
        }
    }
};