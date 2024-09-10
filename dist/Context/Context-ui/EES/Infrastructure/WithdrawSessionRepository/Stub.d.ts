import WithdrawSessionRepositoryInterface from "../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import WithdrawSession from "../../Domain/Withdraw/WithdrawSession";
export default class Stub implements WithdrawSessionRepositoryInterface {
    private sessions;
    load(sessionId: string): Promise<WithdrawSession | null>;
    all(): Promise<WithdrawSession[]>;
    save(session: WithdrawSession): Promise<boolean>;
    clean(): void;
    get count(): number;
    getById(id: string): WithdrawSession | null;
}
