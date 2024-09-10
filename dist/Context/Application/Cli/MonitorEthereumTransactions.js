"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorEthereumTransactions = void 0;
const nest_commander_1 = require("nest-commander");
const GetLastBlocks_1 = __importDefault(require("../Query/ExternalBlockchain/GetLastBlocks/GetLastBlocks"));
const ChainedHandlerCommand_1 = __importDefault(require("../Command/ExternalBlockchain/ChainProcessor/ChainedHandlerCommand"));
const GetLastBlocksErrors = __importStar(require("../Query/ExternalBlockchain/GetLastBlocks/Errors"));
const ChainProcessor_1 = __importDefault(require("../Command/ExternalBlockchain/ChainProcessor/ChainProcessor"));
const GetLastBlocksHandler_1 = __importDefault(require("../Query/ExternalBlockchain/GetLastBlocks/GetLastBlocksHandler"));
const AfterIncomingContractProcessed_1 = __importDefault(require("../../Subscribers/AfterIncomingContractProcessed"));
const config_1 = __importDefault(require("../../config"));
let MonitorEthereumTransactions = class MonitorEthereumTransactions extends nest_commander_1.CommandRunner {
    constructor(getLastBlocksHandler, chainProcessor) {
        super();
        this.getLastBlocksHandler = getLastBlocksHandler;
        this.chainProcessor = chainProcessor;
    }
    async run(passedParam, options) {
        new AfterIncomingContractProcessed_1.default();
        if (!(options === null || options === void 0 ? void 0 : options.blockNumber)) {
            await this.cycleProcess(options.interval);
        }
        else {
            this.process(options.blockNumber).then(() => {
                process.exit();
            });
        }
    }
    parseBlockNumber(val) {
        return Number(val);
    }
    parseInterval(val) {
        return Number(val);
    }
    async process(blockNumber) {
        const query = new GetLastBlocks_1.default(blockNumber);
        let result;
        try {
            result = await this.getLastBlocksHandler.execute(query);
            console.log(`Found blocks from ${result.fromBlock} to ${result.toBlock}`);
            await this.chainProcessor.execute(new ChainedHandlerCommand_1.default(result.fromBlock, result.toBlock));
            await this.getLastBlocksHandler.saveLastBlockNumber(query, result.toBlock);
        }
        catch (e) {
            if (e instanceof GetLastBlocksErrors.BlockNotExists ||
                e instanceof GetLastBlocksErrors.FromBlockLargerThanToBlock ||
                e instanceof GetLastBlocksErrors.FromBlockHashEqualsToBlockHash) {
                console.log("MonitorEthereumTransactions: ", e.message);
                return;
            }
            throw e;
        }
    }
    cycleProcess(interval) {
        this.process(null).then(() => {
            setTimeout(() => {
                this.cycleProcess(interval);
            }, interval * 1000);
        });
    }
};
__decorate([
    (0, nest_commander_1.Option)({
        flags: "-b, --block-number [number]",
        description: "Block to search",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Number)
], MonitorEthereumTransactions.prototype, "parseBlockNumber", null);
__decorate([
    (0, nest_commander_1.Option)({
        flags: "-i, --interval [number]",
        description: "Launch interval (seconds)",
        defaultValue: config_1.default.worker.period,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Number)
], MonitorEthereumTransactions.prototype, "parseInterval", null);
MonitorEthereumTransactions = __decorate([
    (0, nest_commander_1.Command)({ name: "monitor-ethereum-transactions", description: "Monitor Ethereum Transactions" }),
    __metadata("design:paramtypes", [GetLastBlocksHandler_1.default, ChainProcessor_1.default])
], MonitorEthereumTransactions);
exports.MonitorEthereumTransactions = MonitorEthereumTransactions;
//# sourceMappingURL=MonitorEthereumTransactions.js.map