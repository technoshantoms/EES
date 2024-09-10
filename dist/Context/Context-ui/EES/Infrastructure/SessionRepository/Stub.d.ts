import SessionRepositoryInterface from "../../Domain/Deposit/SessionRepositoryInterface";
import Session from "../../Domain/Deposit/Session";
export default class Stub implements SessionRepositoryInterface {
    private sessions;
    load(sessionId: string): Promise<Session | null>;
    all(internalAccount: string): Promise<Session[]>;
    save(session: Session): Promise<boolean>;
    clean(): void;
    get count(): number;
    getById(id: string): Session | null;
}
