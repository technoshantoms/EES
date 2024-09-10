export default class WithdrawContract {
    private readonly _id;
    txHash: string | null;
    constructor(_id: string);
    static create(id: string): WithdrawContract;
    get id(): string;
}
