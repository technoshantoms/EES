import Deposit from "./Deposit";

export default interface RepositoryInterface {
    create: (deposit: Deposit) => void
}