import SessionRepositoryInterface from "../../Domain/Deposit/SessionRepositoryInterface";
import Session from "../../Domain/Deposit/Session";
export default class IndexedDBDepositSessionRepository implements SessionRepositoryInterface {
    private db;
    constructor();
    load(sessionId: string): Promise<Session | null>;
    all(internalAccount: string): Promise<Session[]>;
    save(session: Session): Promise<boolean>;
}
