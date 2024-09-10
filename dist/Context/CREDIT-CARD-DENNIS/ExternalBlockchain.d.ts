import RepositoryInterface from "./Repository/RepositoryInterface";
import Contract from "context/ExternalBlockchain/Contract";
declare class ExternalBlockchain {
    private readonly _repository;
    constructor(repository: Repository);
    get repository(): RepositoryInterface;
    private createRepository;
    redeem(contractId: string, secret: string): Promise<string>;
    getAsset(): import("immutable").Map<string, number>;
    getGasPrice(): Promise<string>;
    createWithdrawHTLC(receiver: string, hashlock: string, timelock: number, amount: string): Promise<string>;
    loadWithdrawContract(txHash: string, contractId: string): Promise<Contract | null>;
    refund(contractId: string): Promise<string>;
    getFee(): Promise<number>;
}
export default ExternalBlockchain;
