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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetFee = void 0;
const nest_commander_1 = require("nest-commander");
const common_1 = require("@nestjs/common");
const EthereumRepository_1 = __importDefault(require("../../ExternalBlockchain/Repository/EthereumRepository"));
let SetFee = class SetFee extends nest_commander_1.CommandRunner {
    constructor(ethereumRepository) {
        super();
        this.ethereumRepository = ethereumRepository;
    }
    async run(passedParam) {
        await this.ethereumRepository.setFee(parseInt(passedParam[0]));
        console.log("Fee set");
    }
};
SetFee = __decorate([
    (0, nest_commander_1.Command)({
        name: "set-fee",
        arguments: "<fee>",
        description: "Set deposit fee",
    }),
    __param(0, (0, common_1.Inject)("ExternalBlockchainRepositoryInterface")),
    __metadata("design:paramtypes", [EthereumRepository_1.default])
], SetFee);
exports.SetFee = SetFee;
//# sourceMappingURL=SetFee.js.map