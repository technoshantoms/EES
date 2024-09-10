import Session from "../../../EES/Domain/Deposit/Session";
export default class GetTransactionExplorerLink {
    private _session;
    constructor(_session: Session);
    get session(): Session;
}
