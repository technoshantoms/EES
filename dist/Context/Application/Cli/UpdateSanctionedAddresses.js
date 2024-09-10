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
exports.UpdateSanctionedAddresses = void 0;
const nest_commander_1 = require("nest-commander");
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const dayjs_1 = __importDefault(require("dayjs"));
let UpdateSanctionedAddresses = class UpdateSanctionedAddresses extends nest_commander_1.CommandRunner {
    async run() {
        const url = 'https://raw.githubusercontent.com/0xB10C/ofac-sanctioned-digital-currency-addresses/lists/sanctioned_addresses_ETH.json';
        const path = path_1.default.resolve(__dirname, '../../../src/assets/SanctionedAddresses/', 'sanctioned_addresses_ETH_' + (0, dayjs_1.default)().format('YYYY-MM-DD') + '.json');
        const usagePath = path_1.default.resolve(__dirname, '../../../src/assets/SanctionedAddresses/', 'sanctioned_addresses_ETH.json');
        await this.downloadFile(url, path);
        fs_1.default.cpSync(path, usagePath);
        console.log('Sanctioned Addresses updated');
        this.cleanUp();
    }
    async downloadFile(url, path) {
        const response = await (0, axios_1.default)({
            method: 'GET',
            url: url,
            responseType: 'stream'
        });
        response.data.pipe(fs_1.default.createWriteStream(path));
        return new Promise((resolve, reject) => {
            response.data.on('end', () => {
                if (!this.validateFile(path)) {
                    fs_1.default.unlinkSync(path);
                    reject();
                }
                resolve();
            });
            response.data.on('error', () => {
                reject();
            });
        });
    }
    async validateFile(path) {
        if (!fs_1.default.existsSync(path)) {
            throw new Error("File not found");
        }
        const data = fs_1.default.readFileSync(path, 'utf8');
        const json = JSON.parse(data);
        if (!json) {
            throw new Error("Invalid JSON");
        }
        if (json && json.length === 0) {
            throw new Error("Empty JSON");
        }
        if (!Array.isArray(json)) {
            throw new Error("Invalid JSON");
        }
        for (let i = 0; i < json.length && i < 3; i++) {
            if (typeof json[i] !== "string") {
                throw new Error("Invalid JSON");
            }
            if (json[i].length !== 42) {
                throw new Error("Invalid JSON");
            }
            if (json[i].substring(0, 2) !== '0x') {
                throw new Error("Invalid JSON");
            }
        }
    }
    cleanUp() {
        const files = [];
        fs_1.default.readdirSync(path_1.default.resolve(__dirname, '../../../src/assets/SanctionedAddresses/')).forEach((file) => {
            if (file !== 'sanctioned_addresses_ETH.json') {
                files.push(file);
            }
        });
        files.sort().splice(-3, 3);
        for (const file of files) {
            fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '../../../src/assets/SanctionedAddresses/', file));
        }
    }
};
UpdateSanctionedAddresses = __decorate([
    (0, nest_commander_1.Command)({
        name: "update-sanctioned-addresses",
        description: "Update Sanctioned Addresses from Github",
    })
], UpdateSanctionedAddresses);
exports.UpdateSanctionedAddresses = UpdateSanctionedAddresses;
//# sourceMappingURL=UpdateSanctionedAddresses.js.map