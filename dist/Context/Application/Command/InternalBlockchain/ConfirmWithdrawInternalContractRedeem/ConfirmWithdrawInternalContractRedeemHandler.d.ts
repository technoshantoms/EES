import { UseCase } from "context/Core/Domain/UseCase";
import ConfirmWithdrawInternalContractRedeem from "./ConfirmWithdrawInternalContractRedeem";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
export default class ConfirmWithdrawInternalContractRedeemHandler implements UseCase<ConfirmWithdrawInternalContractRedeem, void> {
    private readonly withdrawRepository;
    constructor(withdrawRepository: WithdrawRepositoryInterface);
    execute(command: ConfirmWithdrawInternalContractRedeem): Promise<void>;
    private validateTransaction;
}
