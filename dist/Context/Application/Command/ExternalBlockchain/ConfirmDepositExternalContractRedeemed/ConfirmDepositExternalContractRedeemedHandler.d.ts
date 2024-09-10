import ConfirmDepositExternalContractRedeemed from "context/Application/Command/ExternalBlockchain/ConfirmDepositExternalContractRedeemed/ConfirmDepositExternalContractRedeemed";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
import RepositoryInterface from "context/ExternalBlockchain/Repository/RepositoryInterface";
import NotifierInterface from "context/Notifier/NotifierInterface";
import Setting from "context/Setting/Setting";
export default class ConfirmDepositExternalContractRedeemedHandler {
    private readonly depositRepository;
    private readonly blockchainRepository;
    private readonly notifier;
    private readonly setting;
    constructor(depositRepository: DepositRepositoryInterface, blockchainRepository: RepositoryInterface, notifier: NotifierInterface, setting: Setting);
    execute(command: ConfirmDepositExternalContractRedeemed): Promise<void>;
}
