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
const GetSettingsController_1 = __importDefault(require("./GetSettingsController"));
const SubmitDepositRequestController_1 = __importDefault(require("./SubmitDepositRequestController"));
const CheckDepositSubmittedToInternalBlockchainController_1 = __importDefault(require("./CheckDepositSubmittedToInternalBlockchainController"));
const DepositRepository_1 = __importDefault(require("../../Context/Infrastructure/TypeORM/DepositRepository"));
const DataSource_1 = __importDefault(require("../../Context/Infrastructure/TypeORM/DataSource/DataSource"));
const SubmitWithdrawRequestHandler_1 = __importDefault(require("../../Context/Application/Command/SubmitWithdrawRequest/SubmitWithdrawRequestHandler"));
const CoreModule_1 = require("../../Context/Core/CoreModule");
const SubmitWithdrawRequestController_1 = __importDefault(require("./SubmitWithdrawRequestController"));
const GetWithdrawExternalContractController_1 = __importDefault(require("./GetWithdrawExternalContractController"));
const GetDepositContractIdController_1 = __importDefault(require("./GetDepositContractIdController"));
const GetDepositsStatusesController_1 = __importDefault(require("./GetDepositsStatusesController"));
let WalletModule = class WalletModule {
};
WalletModule = __decorate([
    (0, common_1.Module)({
        imports: [CoreModule_1.CoreModule],
        providers: [
            {
                provide: "DepositRepositoryInterface",
                useClass: DepositRepository_1.default,
            },
            {
                provide: "DataSource",
                useValue: DataSource_1.default,
            },
            SubmitWithdrawRequestHandler_1.default,
        ],
        controllers: [
            GetSettingsController_1.default,
            SubmitDepositRequestController_1.default,
            SubmitWithdrawRequestController_1.default,
            CheckDepositSubmittedToInternalBlockchainController_1.default,
            GetWithdrawExternalContractController_1.default,
            GetDepositContractIdController_1.default,
            GetDepositsStatusesController_1.default,
        ],
    })
], WalletModule);
exports.default = WalletModule;
//# sourceMappingURL=WalletModule.js.map