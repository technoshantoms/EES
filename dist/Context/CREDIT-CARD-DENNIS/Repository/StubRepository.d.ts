import RepositoryInterface from "./RepositoryInterface";
import Contract from "../Contract";
import { EventData } from "web3-eth-contract";
import { BlockTransactionString, TransactionReceipt } from "web3-eth";
import * as Errors from "context/ExternalBlockchain/Errors";
import { Map } from "immutable";
interface RedeemRequest {
    contractId: string;
    secret: string;
    receiver: string;
}
export default class StubRepository implements RepositoryInterface {
    _txIncluded: boolean;
    _contract: Contract | null;
    _error: Errors.ExternalBlockchainError | null;
    _redeemedRequests: RedeemRequest[];
    _redeemTxHash: string | null;
    _transactionReceipt: TransactionReceipt | null;
    _lastBlockNumber: number;
    txIncluded(txHash: string): Promise<boolean>;
    loadDepositContract(txHash: string, contractId: string): Promise<Contract | null>;
    loadWithdrawContract(txHash: string, contractId: string): Promise<Contract | null>;
    getLastBlockNumber(): Promise<number>;
    getBlock(number: number): Promise<BlockTransactionString | null>;
    loadDepositHTLCNewEvents(fromBlock: number, toBlock: number): Promise<EventData[]>;
    loadWithdrawHTLCNewEvents(fromBlock: number, toBlock: number): Promise<EventData[]>;
    redeem(contractId: string, secret: string, receiver: string): Promise<string>;
    getAsset(): Map<string, number>;
    reset(): void;
    loadDepositHTLCRedeemEvents(fromBlock: number, toBlock: number): Promise<EventData[]>;
    loadWithdrawHTLCRedeemEvents(fromBlock: number, toBlock: number): Promise<EventData[]>;
    getTransactionReceipt(txHash: string): Promise<TransactionReceipt>;
    getGasPrice(): Promise<string>;
    createWithdrawHTLC(receiver: string, hashlock: string, timelock: number, amount: string): Promise<string>;
    refund(contractId: string): Promise<string>;
    loadWithdrawHTLCRefundEvents(fromBlock: number, toBlock: number): Promise<EventData[]>;
    loadDepositHTLCRefundEvents(fromBlock: number, toBlock: number): Promise<EventData[]>;
    getFee(): Promise<number>;
    setFee(fee: number): Promise<string>;
}
export {};
