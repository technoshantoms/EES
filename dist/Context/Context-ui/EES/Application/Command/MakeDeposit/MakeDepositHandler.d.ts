import MakeDeposit from "./MakeDeposit";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
import EesRepositoryInterface from "../../../Infrastructure/EES/Repository";
import ExternalBlockchainRepositoryInterface from "../../../Domain/ExternalBlockchain/RepositoryInterface";
export default class MakeDepositHandler {
    private readonly sessionRepository;
    private readonly eesRepository;
    private readonly web3Repository;
    constructor(sessionRepository: SessionRepositoryInterface, eesRepository: EesRepositoryInterface, web3Repository: ExternalBlockchainRepositoryInterface);
    execute(command: MakeDeposit): Promise<boolean>;
    private ensureHasPrefix;
}
