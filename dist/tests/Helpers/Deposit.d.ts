import Deposit from "context/Domain/Deposit";
import DepositRequest from "context/Domain/DepositRequest";
import ExternalContract from "context/Domain/ExternalContract";
interface Params {
    depositRequest?: DepositRequest;
    externalContract?: ExternalContract;
}
export declare function createDeposit(params?: Params): Deposit;
export {};
