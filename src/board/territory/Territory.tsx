import Territory from "../../models/Territory";
import "./Territory.css"

const t: React.FC<{ t: Territory }> = (props) => (
    <div className="territory">{props.t.name} <br></br> {props.t.currentOwner ?? "Ngm"} ({props.t.nTroops})</div>
)

export default t;