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
const ExternalBlockchain_1 = __importDefault(require("../../../../ExternalBlockchain/ExternalBlockchain"));
const Response_1 = __importDefault(require("./Response"));
const common_1 = require("@nestjs/common");
let GetDepositLastContractsHandler = class GetDepositLastContractsHandler {
    constructor(externalBlockchain) {
        this.externalBlockchain = externalBlockchain;
    }
    async execute(query) {
        const events = await this.externalBlockchain.repository.loadDepositHTLCNewEvents(query.fromBlock, query.toBlock);
        return new Response_1.default(query.fromBlock, query.toBlock, events);
    }
};
GetDepositLastContractsHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ExternalBlockchain_1.default])
], GetDepositLastContractsHandler);
exports.default = GetDepositLastContractsHandler;
//# sourceMappingURL=GetDepositLastContractsHandler.js.map