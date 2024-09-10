import MakeDepositRefund from "./MakeDepositRefund";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
import EesRepositoryInterface from "../../../Infrastructure/EES/Repository";
import ExternalBlockchainRepositoryInterface from "../../../Domain/ExternalBlockchain/RepositoryInterface";
export default class MakeDepositRefundHandler {
    private readonly sessionRepository;
    private readonly eesRepository;
    private readonly web3Repository;
    constructor(sessionRepository: SessionRepositoryInterface, eesRepository: EesRepositoryInterface, web3Repository: ExternalBlockchainRepositoryInterface);
    execute(command: MakeDepositRefund): Promise<boolean>;
    private ensureHasPrefix;
    static create(): MakeDepositRefundHandler;
}
