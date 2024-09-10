"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = __importDefault(require("../config"));
let EtherToWrappedEtherConverter = class EtherToWrappedEtherConverter {
    convert(eth) {
        return eth / config_1.default.r_squared.eth_to_rqeth_rate;
    }
};
EtherToWrappedEtherConverter = __decorate([
    (0, common_1.Injectable)()
], EtherToWrappedEtherConverter);
exports.default = EtherToWrappedEtherConverter;
//# sourceMappingURL=EtherToWrappedEtherConverter.js.map