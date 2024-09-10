import SubmitWithdrawRequest from "./SubmitWithdrawRequest";
import EesRepositoryInterface from "../../../Domain/EES/RepositoryInterface";
import WithdrawSessionRepositoryInterface from "../../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
export default class SubmitWithdrawRequestHandler {
    private eesRepository;
    private sessionRepository;
    constructor(eesRepository: EesRepositoryInterface, sessionRepository: WithdrawSessionRepositoryInterface);
    execute(command: SubmitWithdrawRequest): Promise<string>;
}
