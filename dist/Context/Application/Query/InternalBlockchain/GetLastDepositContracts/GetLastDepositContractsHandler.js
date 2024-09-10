"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = __importDefault(require("./Response"));
const DEPOSIT_LAST_PROCESSED_INTERNAL_CONTRACT = "deposit_last_processed_internal_contract";
class GetLastDepositContractsHandler {
    constructor(internalBlockchain, setting) {
        this.internalBlockchain = internalBlockchain;
        this.setting = setting;
    }
    async execute(query) {
        const lastProcessedContract = await this.getLastProcessedContract();
        const [nextContractToProcessId, getNextContractToProcess] = this.getNextContractToProcess(lastProcessedContract);
        const contracts = await this.internalBlockchain.getIncomingContracts(nextContractToProcessId);
        const contractsToProcessed = [];
        for (const contract of contracts) {
            if (!contract.hasMessage()) {
                continue;
            }
            if (this.parseContractIdLastNumber(contract.id) < getNextContractToProcess) {
                continue;
            }
            contractsToProcessed.push(contract);
        }
        if (contractsToProcessed.length > 0) {
            await this.setting.save(DEPOSIT_LAST_PROCESSED_INTERNAL_CONTRACT, contractsToProcessed[contractsToProcessed.length - 1].id);
        }
        return new Response_1.default(contractsToProcessed);
    }
    async getLastProcessedContract() {
        return await this.setting.load(DEPOSIT_LAST_PROCESSED_INTERNAL_CONTRACT, null);
    }
    getNextContractToProcess(lastProcessedContract) {
        if (null === lastProcessedContract) {
            return ["1.16.0", 0];
        }
        const lastProcessedIdParts = lastProcessedContract.split(".");
        const nextContractToProcessedNumber = parseInt(lastProcessedIdParts[2], 10) + 1;
        lastProcessedIdParts[2] = nextContractToProcessedNumber.toString();
        return [lastProcessedIdParts.join("."), nextContractToProcessedNumber];
    }
    parseContractIdLastNumber(id) {
        return parseInt(id.split(".")[2], 10);
    }
}
exports.default = GetLastDepositContractsHandler;
//# sourceMappingURL=GetLastDepositContractsHandler.js.map