import { Game } from "boardgame.io";
import territories from "./data/territories";
import G from "./models/G";

export const War: Game<G> = {
    setup: () => ({ territories }),
    phases: {
        choosing: {
            start: true,
            moves: {
                clickCell: (G, ctx, id: number) => {
                    if (G.territories[id].currentOwner != null || ctx.events?.endTurn === undefined) {
                        return;
                    }
                    G.territories[id].currentOwner = ctx.currentPlayer;
                    ctx.events.endTurn();
                },
            },
        }
    }
};