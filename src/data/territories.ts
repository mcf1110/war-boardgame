import Territory from "../models/Territory";

const makeTerritory = (name: string) => ({
    name: name,
    currentOwner: null,
    nTroops: 1,
    nTroopsToDeploy: 0
});

const territories: Territory[] = ["A", "B", "C"].map(makeTerritory)
export default territories;