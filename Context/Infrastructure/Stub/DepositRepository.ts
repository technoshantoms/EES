import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
import Deposit from "../../Domain/Deposit";

export default class DepositRepository implements DepositRepositoryInterface {
    public _exists = false
    public _depositByExternalId: Deposit | null = null

    private _deposits: {
        [index: string]: Deposit
    } = {}

    create(deposit: Deposit): void {
        this._deposits[deposit.id.toValue()] = deposit
    }

    save(deposit: Deposit): void {
        this._deposits[deposit.id.toValue()] = deposit
    }

    exists(contractId: string): Promise<boolean> {
        return Promise.resolve(this._exists)
    }

    getById(id: string): Promise<Deposit | null> {
        return Promise.resolve(this._deposits[id]?? null)
    }

    getByExternalId(externalId: string): Promise<Deposit | null> {
        return Promise.resolve(this._depositByExternalId)
    }

    first(): Deposit | null {
        return Object.values(this._deposits)[0]
    }

    get size(): number {
        return Object.values(this._deposits).length
    }

    reset() {
        this._deposits = {}
    }
}
