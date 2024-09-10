import RedeemWithdraw from "./RedeemWithdraw";
import EESRepositoryInterface from "../../../Domain/EES/RepositoryInterface";
import ExternalBlockchainRepositoryInterface from "../../../Domain/ExternalBlockchain/RepositoryInterface";
import SessionRepositoryInterface from "../../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
export default class RedeemWithdrawHandler {
    private readonly web3Repository;
    private readonly eesRepository;
    private readonly sessionRepository;
    constructor(web3Repository: ExternalBlockchainRepositoryInterface, eesRepository: EESRepositoryInterface, sessionRepository: SessionRepositoryInterface);
    execute(command: RedeemWithdraw): Promise<boolean>;
    static create(): RedeemWithdrawHandler;
}
