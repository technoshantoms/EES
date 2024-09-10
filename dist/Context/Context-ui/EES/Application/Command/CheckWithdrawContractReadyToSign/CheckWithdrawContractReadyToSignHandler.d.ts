import CheckWithdrawContractReadyToSign from "./CheckWithdrawContractReadyToSign";
import EesRepository from "../../../Infrastructure/EES/Repository";
import WithdrawSessionRepositoryInterface from "../../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
export default class CheckWithdrawContractReadyToSignHandler {
    private readonly sessionRepository;
    private readonly eesRepository;
    constructor(sessionRepository: WithdrawSessionRepositoryInterface, eesRepository: EesRepository);
    execute(command: CheckWithdrawContractReadyToSign): Promise<boolean>;
    static create(): CheckWithdrawContractReadyToSignHandler;
}
