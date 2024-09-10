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
var Setting_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERNAL_REDEEM_ALERT_THRESHOLD_TIMEOUT = exports.EXTERNAL_REDEEM_ALERT_THRESHOLD_TIMEOUT = void 0;
const Repository_1 = __importDefault(require("./Infrastructure/TypeOrm/Repository"));
const Repository_2 = __importDefault(require("./Infrastructure/Stub/Repository"));
const common_1 = require("@nestjs/common");
const Errors_1 = require("./Errors");
exports.EXTERNAL_REDEEM_ALERT_THRESHOLD_TIMEOUT = "external_redeem_alert_threshold_timeout";
exports.INTERNAL_REDEEM_ALERT_THRESHOLD_TIMEOUT = "internal_redeem_alert_threshold_timeout";
let Setting = Setting_1 = class Setting {
    constructor(config, typeormRepository) {
        this.config = config;
        this.typeormRepository = typeormRepository;
        if (config.repository == "typeorm") {
            if (typeormRepository) {
                this.repository = typeormRepository;
            }
            else if (config.dataSource) {
                this.repository = new Repository_1.default(config.dataSource);
            }
            else {
                throw new Errors_1.InvalidSettingConfigError();
            }
        }
        else {
            this.repository = new Repository_2.default();
        }
    }
    static init(config) {
        return new Setting_1(config);
    }
    async load(name, defaultValue) {
        const value = await this.repository.load(name);
        return value !== null && value !== void 0 ? value : defaultValue;
    }
    async save(name, value) {
        await this.repository.save(name, value);
    }
};
Setting = Setting_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("SettingConfig")),
    __metadata("design:paramtypes", [Object, Repository_1.default])
], Setting);
exports.default = Setting;
//# sourceMappingURL=Setting.js.map