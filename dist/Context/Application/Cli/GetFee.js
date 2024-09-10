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
exports.GetFee = void 0;
const nest_commander_1 = require("nest-commander");
const ExternalBlockchain_1 = __importDefault(require("../../ExternalBlockchain/ExternalBlockchain"));
let GetFee = class GetFee extends nest_commander_1.CommandRunner {
    constructor(externalBlockchain) {
        super();
        this.externalBlockchain = externalBlockchain;
    }
    async run() {
        console.log(await this.externalBlockchain.getFee());
    }
};
GetFee = __decorate([
    (0, nest_commander_1.Command)({
        name: "get-fee",
        description: "Get deposit fee",
    }),
    __metadata("design:paramtypes", [ExternalBlockchain_1.default])
], GetFee);
exports.GetFee = GetFee;
//# sourceMappingURL=GetFee.js.map