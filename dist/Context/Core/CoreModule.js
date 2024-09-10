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
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = __importDefault(require("../config"));
const WithdrawRequestTypeOrmRepository_1 = __importDefault(require("../Infrastructure/TypeORM/WithdrawRequestTypeOrmRepository"));
const DataSource_1 = __importDefault(require("../Infrastructure/TypeORM/DataSource/DataSource"));
const DatabaseConfig_1 = __importDefault(require("../Infrastructure/TypeORM/DataSource/DatabaseConfig"));
const WithdrawTypeOrmRepository_1 = __importDefault(require("../Infrastructure/TypeORM/WithdrawTypeOrmRepository"));
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: config_1.default.db.host,
                port: config_1.default.db.port,
                username: config_1.default.db.user,
                password: config_1.default.db.password,
                database: config_1.default.db.name,
                entities: DatabaseConfig_1.default.entities,
            }),
            typeorm_1.TypeOrmModule.forFeature(DatabaseConfig_1.default.entities),
        ],
        providers: [
            {
                provide: "WithdrawRequestRepositoryInterface",
                useClass: WithdrawRequestTypeOrmRepository_1.default,
            },
            {
                provide: "WithdrawRepositoryInterface",
                useClass: WithdrawTypeOrmRepository_1.default,
            },
            {
                provide: "DataSource",
                useValue: DataSource_1.default,
            },
            {
                provide: "RQETHAssetSymbol",
                useValue: config_1.default.r_squared.rqeth_asset_symbol,
            },
        ],
        exports: [
            "WithdrawRequestRepositoryInterface",
            typeorm_1.TypeOrmModule,
            "WithdrawRepositoryInterface",
            "RQETHAssetSymbol",
            "DataSource"
        ],
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=CoreModule.js.map