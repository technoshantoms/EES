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
const Setting_1 = __importDefault(require("../../../../Setting/Setting"));
const config_1 = __importDefault(require("../../../../config"));
const ExternalBlockchain_1 = __importDefault(require("../../../../ExternalBlockchain/ExternalBlockchain"));
const Errors = __importStar(require("./Errors"));
const common_1 = require("@nestjs/common");
const Response_1 = __importDefault(require("./Response"));
const ETH_LAST_BLOCK_NAME = "eth_htlc_new_events_last_block";
let GetLastBlocksHandler = class GetLastBlocksHandler {
    constructor(externalBlockchain, setting) {
        this.externalBlockchain = externalBlockchain;
        this.setting = setting;
    }
    async execute(query) {
        let blocks;
        if (query.blockNumber) {
            const block = await this.getBlock(query.blockNumber);
            blocks = {
                from: block,
                to: block,
            };
        }
        else {
            blocks = await this.getBlocks();
        }
        return new Response_1.default(blocks.from.number, blocks.to.number);
    }
    async saveLastBlockNumber(query, blockNumber) {
        if (!query.blockNumber) {
            await this.setting.save(ETH_LAST_BLOCK_NAME, blockNumber);
        }
    }
    async getBlock(fromBlockNumber) {
        const block = await this.externalBlockchain.repository.getBlock(fromBlockNumber);
        if (null === block) {
            throw new Errors.BlockNotExists(fromBlockNumber);
        }
        return block;
    }
    async getBlocks() {
        const lastProcessedBlockNumber = parseInt(await this.setting.load(ETH_LAST_BLOCK_NAME, config_1.default.eth.deploy_block_number), 10);
        const lastProcessedBlock = (await this.externalBlockchain.repository.getBlock(lastProcessedBlockNumber));
        const fromBlockNumber = lastProcessedBlockNumber + 1;
        const fromBlock = await this.externalBlockchain.repository.getBlock(fromBlockNumber);
        if (null === fromBlock) {
            throw new Errors.BlockNotExists(fromBlockNumber);
        }
        const lastBlockNumber = await this.externalBlockchain.repository.getLastBlockNumber();
        const lastIrreversibleBlockNumber = lastBlockNumber - config_1.default.eth.required_block_confirmations;
        if (lastIrreversibleBlockNumber <= lastProcessedBlockNumber) {
            throw new Errors.FromBlockLargerThanToBlock(lastProcessedBlockNumber, lastIrreversibleBlockNumber);
        }
        const toBlock = await this.externalBlockchain.repository.getBlock(lastIrreversibleBlockNumber);
        if (null === toBlock) {
            throw new Errors.BlockNotExists(lastIrreversibleBlockNumber);
        }
        if (lastProcessedBlock.hash === toBlock.hash) {
            throw new Errors.FromBlockHashEqualsToBlockHash(fromBlock.hash, fromBlock.number);
        }
        return {
            from: fromBlock,
            to: toBlock,
        };
    }
};
GetLastBlocksHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ExternalBlockchain_1.default, Setting_1.default])
], GetLastBlocksHandler);
exports.default = GetLastBlocksHandler;
//# sourceMappingURL=GetLastBlocksHandler.js.map