import { UseCase } from "context/Core/Domain/UseCase";
import DepositInternalContractRefund from "./DepositInternalContractRefund";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
import InternalBlockchain from "context/InternalBlockchain/InternalBlockchain";
import AssetNormalizer from "context/Infrastructure/AssetNormalizer";
import ConverterInterface from "context/Domain/ConverterInterface";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
export default class DepositInternalContractRefundHandler implements UseCase<DepositInternalContractRefund, void> {
    private repository;
    private internalBlockchain;
    private externalBlockchain;
    private normalizer;
    private converter;
    constructor(repository: DepositRepositoryInterface, internalBlockchain: InternalBlockchain, externalBlockchain: ExternalBlockchain, normalizer: AssetNormalizer, converter: ConverterInterface);
    execute(command: DepositInternalContractRefund): Promise<void>;
    private hasRefundOperation;
}
