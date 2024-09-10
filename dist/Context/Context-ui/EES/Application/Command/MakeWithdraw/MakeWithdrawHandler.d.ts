import MakeWithdraw from "./MakeWithdraw";
import SessionRepositoryInterface from "../../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import EesRepositoryInterface from "../../../Infrastructure/EES/Repository";
import InternalBlockchainRepositoryInterface from "../../../Domain/InternalBlockchain/RepositoryInterface";
export default class MakeWithdrawHandler {
    private readonly sessionRepository;
    private readonly eesRepository;
    private readonly internalRepository;
    constructor(sessionRepository: SessionRepositoryInterface, eesRepository: EesRepositoryInterface, internalRepository: InternalBlockchainRepositoryInterface);
    execute(command: MakeWithdraw): Promise<boolean>;
}
