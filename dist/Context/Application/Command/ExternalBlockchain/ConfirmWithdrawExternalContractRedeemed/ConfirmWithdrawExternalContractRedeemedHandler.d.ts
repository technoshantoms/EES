import RepositoryInterface from "context/ExternalBlockchain/Repository/RepositoryInterface";
import NotifierInterface from "context/Notifier/NotifierInterface";
import Setting from "context/Setting/Setting";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import ConfirmWithdrawExternalContractRedeemed from "context/Application/Command/ExternalBlockchain/ConfirmWithdrawExternalContractRedeemed/ConfirmWithdrawExternalContractRedeemed";
import Contract from "context/ExternalBlockchain/Contract";
export default class ConfirmWithdrawExternalContractRedeemedHandler {
    private readonly withdrawRepository;
    private readonly blockchainRepository;
    private readonly notifier;
    private readonly setting;
    constructor(withdrawRepository: WithdrawRepositoryInterface, blockchainRepository: RepositoryInterface, notifier: NotifierInterface, setting: Setting);
    execute(command: ConfirmWithdrawExternalContractRedeemed): Promise<void>;
    checkContract(contract: Contract | null, command: ConfirmWithdrawExternalContractRedeemed): void;
}
