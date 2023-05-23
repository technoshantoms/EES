import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import Withdraw, { STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN } from "context/Domain/Withdraw";

export default class WithdrawStubRepository implements WithdrawRepositoryInterface {
    public _exists = false;
    private _withdraws: {
        [index: string]: Withdraw;
    } = {};
    save(withdraw: Withdraw): void {
        this._withdraws[withdraw.id.toValue()] = withdraw;
    }

    getAllForCheck(): Promise<Withdraw[]> {
        const withdraws = Object.values(this._withdraws).filter((withdraw: Withdraw) => {
            return withdraw.status === STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN;
        });

        return Promise.resolve(withdraws);
    }

    getById(id: string): Promise<Withdraw | null> {
        return Promise.resolve(this._withdraws[id] ?? null);
    }
}