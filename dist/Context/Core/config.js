"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
class Config {
    constructor() {
        dotenv_1.default.config();
        if (process.env.NODE_ENV === 'test') {
            dotenv_1.default.config({
                path: path_1.default.resolve(process.cwd(), '.env.test'),
                override: true
            });
        }
    }
    config() {
        return {
            env: this.env(),
            isTest: this.env() === 'test'
        };
    }
    env() {
        let env = 'prod';
        if (process.env.NODE_ENV === 'test' || process.env.APP_ENV === 'test') {
            env = 'test';
        }
        return env;
    }
}
exports.default = new Config();
//# sourceMappingURL=config.js.map