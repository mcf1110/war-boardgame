import { Game } from "boardgame.io";
import territories from "./data/territories";
import G from "./models/G";

export const War: Game<G> = {
    setup: () => ({ territories }),

    turn: {
        moveLimit: 1,
    },

    moves: {
        clickCell: (G, ctx, id: number) => {
            G.territories[id].currentOwner = ctx.currentPlayer;
        },
    },
};