"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProcessIncomingContractCreationHandler_1 = __importDefault(require("./ProcessIncomingContractCreationHandler"));
const ProcessIncomingContractCreation_1 = __importDefault(require("./ProcessIncomingContractCreation"));
const common_1 = require("@nestjs/common");
const GetDepositLastContractsHandler_1 = __importDefault(require("../../../Query/ExternalBlockchain/GetDepositLastContractsEvents/GetDepositLastContractsHandler"));
let IncomingContractsCreationsProcessingLink = class IncomingContractsCreationsProcessingLink {
    constructor(getLastContractsHandler, processIncomingContractCreationHandler) {
        this.getLastContractsHandler = getLastContractsHandler;
        this.processIncomingContractCreationHandler = processIncomingContractCreationHandler;
    }
    async execute(command) {
        const lastContracts = await this.getLastContractsHandler.execute(command);
        for (const event of lastContracts.events) {
            console.log(`Deposit IncomingContractsCreationsProcessingLink: Process transaction ${event.transactionHash}`);
            try {
                const command = new ProcessIncomingContractCreation_1.default(event.transactionHash, event.returnValues.contractId);
                await this.processIncomingContractCreationHandler.execute(command);
            }
            catch (e) {
                if (e instanceof Error) {
                    console.log(`Deposit IncomingContractsCreationsProcessingLink: Error while processed transaction ${event.transactionHash}: `, e.message);
                    continue;
                }
            }
            console.log(`Deposit IncomingContractsCreationsProcessingLink: Successfully added new transaction ${event.transactionHash}. `);
        }
    }
};
IncomingContractsCreationsProcessingLink = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [GetDepositLastContractsHandler_1.default,
        ProcessIncomingContractCreationHandler_1.default])
], IncomingContractsCreationsProcessingLink);
exports.default = IncomingContractsCreationsProcessingLink;
//# sourceMappingURL=IncomingContractsCreationsProcessingLink.js.map