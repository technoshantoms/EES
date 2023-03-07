import {UseCase} from "context/Core/Domain/UseCase";
import ConfirmDepositInternalContractCreated from "./ConfirmDepositInternalContractCreated";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
import InternalContract from "context/Domain/InternalContract";
import {DepositNotFound} from "./Errors";
import {ensureHasPrefix} from "context/Infrastructure/Helper";

export default class ConfirmDepositInternalContractCreatedHandler implements UseCase<ConfirmDepositInternalContractCreated, void> {
    public constructor(
        private readonly depositRepository: DepositRepositoryInterface
    ) {}

    public async execute(command: ConfirmDepositInternalContractCreated): Promise<void> {
        const txHash = ensureHasPrefix(command.txHash)
        const deposit = await this.depositRepository.getByTxHash(txHash)

        if (null === deposit) {
            throw new DepositNotFound(txHash)
        }

        const internalContract = new InternalContract(command.internalId)
        deposit.createdInInternalBlockchain(internalContract)

        await this.depositRepository.save(deposit)
    }
}