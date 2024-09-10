import WithdrawSessionRepositoryInterface from "../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import WithdrawSession from "../../Domain/Withdraw/WithdrawSession";
export default class IndexedDBWithdrawSessionRepository implements WithdrawSessionRepositoryInterface {
    private db;
    constructor();
    load(sessionId: string): Promise<WithdrawSession | null>;
    all(): Promise<WithdrawSession[]>;
    save(session: WithdrawSession): Promise<boolean>;
}
