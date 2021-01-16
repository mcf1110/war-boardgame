import Territory from "../../models/Territory";
import "./Territory.css"

const t: React.FC<{ t: Territory }> = (props) => (
    <div className={["territory", `owned-by-${props.t.currentOwner}`].join(' ')}>
        {props.t.name} <br></br>
        ({props.t.nTroops + props.t.nTroopsToDeploy})
    </div>
)

export default t;