export default class TokenDistributionRequest {
    private _rsquaredAccount;
    private _ethAccount;
    private _phrase;
    constructor(_rsquaredAccount: string, _ethAccount: string, _phrase: string);
    get rsquaredAccount(): string;
    get ethAccount(): string;
    get phrase(): string;
}
