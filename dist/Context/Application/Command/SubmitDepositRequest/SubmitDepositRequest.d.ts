export default class SubmitDepositRequest {
    private _nativeAccount;
    private _hashLock;
    constructor(_nativeAccount: string, _hashLock: string);
    get nativeAccount(): string;
    get hashLock(): string;
}
