import { Ctx } from "boardgame.io";
import Territory from "../../models/Territory";
import "./Territory.css"

const t: React.FC<{ t: Territory }> = (props) => (
    <div className="territory">
        {props.t.name} <br></br> 
        Dono: {props.t.currentOwner ?? "Ngm"} 
        ({props.t.nTroops + props.t.nTroopsToDeploy})
    </div>
)

export default t;