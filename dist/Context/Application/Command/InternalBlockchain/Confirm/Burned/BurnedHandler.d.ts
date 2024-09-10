import { UseCase } from "context/Core/Domain/UseCase";
import Burned from "./Burned";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
import InternalBlockchain from "context/InternalBlockchain/InternalBlockchain";
export default class BurnedHandler implements UseCase<Burned, void> {
    private repository;
    private internalBlockchain;
    constructor(repository: DepositRepositoryInterface, internalBlockchain: InternalBlockchain);
    execute(command: Burned): Promise<void>;
}
