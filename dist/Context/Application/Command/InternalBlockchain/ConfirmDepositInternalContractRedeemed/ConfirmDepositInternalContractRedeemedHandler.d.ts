import { UseCase } from "context/Core/Domain/UseCase";
import ConfirmDepositInternalContractRedeemed from "./ConfirmDepositInternalContractRedeemed";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
import InternalBlockchain from "context/InternalBlockchain/InternalBlockchain";
export default class ConfirmDepositInternalContractRedeemedHandler implements UseCase<ConfirmDepositInternalContractRedeemed, void> {
    private repository;
    private internalBlockchain;
    constructor(repository: DepositRepositoryInterface, internalBlockchain: InternalBlockchain);
    execute(command: ConfirmDepositInternalContractRedeemed): Promise<void>;
}
