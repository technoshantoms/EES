import SubmitDepositRequest from "./SubmitDepositRequest";
import EesRepositoryInterface from "../../../Domain/EES/RepositoryInterface";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
export default class SubmitDepositRequestHandler {
    private eesRepository;
    private sessionRepository;
    constructor(eesRepository: EesRepositoryInterface, sessionRepository: SessionRepositoryInterface);
    execute(command: SubmitDepositRequest): Promise<string>;
}
