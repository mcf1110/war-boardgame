import Territory from "./Territory";

export default interface G {
    territories: Territory[],
    availableTroops: number[],
    armedAttack: {
        from: number | null,
        to: number | null,
        amount: number
    }
}