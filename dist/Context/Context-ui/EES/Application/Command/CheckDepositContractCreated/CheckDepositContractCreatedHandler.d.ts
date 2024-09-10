import InternalBlockchainRepositoryInterface from "../../../Domain/InternalBlockchain/RepositoryInterface";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
import CheckDepositContractCreated from "./CheckDepositContractCreated";
import EesRepository from "../../../Infrastructure/EES/Repository";
export default class CheckDepositContractCreatedHandler {
    private readonly sessionRepository;
    private readonly internalBlockchainRepository;
    private readonly eesRepository;
    constructor(sessionRepository: SessionRepositoryInterface, internalBlockchainRepository: InternalBlockchainRepositoryInterface, eesRepository: EesRepository);
    execute(command: CheckDepositContractCreated): Promise<boolean>;
    private remove0x;
    static create(): CheckDepositContractCreatedHandler;
}
