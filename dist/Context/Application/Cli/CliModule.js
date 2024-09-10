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
exports.CliModule = void 0;
const common_1 = require("@nestjs/common");
const DataSource_1 = __importDefault(require("../../Infrastructure/TypeORM/DataSource/DataSource"));
const MonitorEthereumTransactions_1 = require("./MonitorEthereumTransactions");
const DepositRepository_1 = __importDefault(require("../../Infrastructure/TypeORM/DepositRepository"));
const DepositRequestRepository_1 = __importDefault(require("../../Infrastructure/TypeORM/DepositRequestRepository"));
const ExternalBlockchain_1 = __importDefault(require("../../ExternalBlockchain/ExternalBlockchain"));
const GetLastBlocksHandler_1 = __importDefault(require("../Query/ExternalBlockchain/GetLastBlocks/GetLastBlocksHandler"));
const ChainProcessor_1 = __importDefault(require("../Command/ExternalBlockchain/ChainProcessor/ChainProcessor"));
const ProcessIncomingContractCreationHandler_1 = __importDefault(require("../Command/ExternalBlockchain/ProcessIncomingContractCreation/ProcessIncomingContractCreationHandler"));
const Setting_1 = __importDefault(require("../../Setting/Setting"));
const Repository_1 = __importDefault(require("../../Setting/Infrastructure/TypeOrm/Repository"));
const IncomingContractsCreationsProcessingLink_1 = __importDefault(require("../Command/ExternalBlockchain/ProcessIncomingContractCreation/IncomingContractsCreationsProcessingLink"));
const RabbitMQ_1 = __importDefault(require("../../Queue/RabbitMQ"));
const MonitorExternalDepositRedeemsLink_1 = __importDefault(require("../Command/ExternalBlockchain/MonitorExternalDepositRedeem/MonitorExternalDepositRedeemsLink"));
const ExternalDepositRedeemHandler_1 = __importDefault(require("../Command/ExternalBlockchain/MonitorExternalDepositRedeem/ExternalDepositRedeemHandler"));
const EthereumRepository_1 = __importDefault(require("../../ExternalBlockchain/Repository/EthereumRepository"));
const ConsoleNotifier_1 = __importDefault(require("../../Notifier/ConsoleNotifier"));
const ExternalContractRedeemWorker_1 = require("./ExternalContractRedeemWorker");
const ConfirmDepositExternalContractRedeemedHandler_1 = __importDefault(require("../Command/ExternalBlockchain/ConfirmDepositExternalContractRedeemed/ConfirmDepositExternalContractRedeemedHandler"));
const MonitorDepositInternalContractRefunded_1 = require("./MonitorDepositInternalContractRefunded");
const DepositInternalContractRefundHandler_1 = __importDefault(require("../Command/InternalBlockchain/DepositInternalContractRefund/DepositInternalContractRefundHandler"));
const InternalBlockchain_1 = __importDefault(require("../../InternalBlockchain/InternalBlockchain"));
const MonitorDepositInternalContractBurned_1 = require("./MonitorDepositInternalContractBurned");
const BurnedHandler_1 = __importDefault(require("../Command/InternalBlockchain/Confirm/Burned/BurnedHandler"));
const EtherToWrappedEtherConverter_1 = __importDefault(require("../../Infrastructure/EtherToWrappedEtherConverter"));
const AssetNormalizer_1 = __importDefault(require("../../Infrastructure/AssetNormalizer"));
const MonitorWithdrawInternalContractCreated_1 = require("./MonitorWithdrawInternalContractCreated");
const GetLastWithdrawContractsHandler_1 = __importDefault(require("../Query/InternalBlockchain/GetLastWithdrawContracts/GetLastWithdrawContractsHandler"));
const ConfirmWithdrawInternalContractCreatedHandler_1 = __importDefault(require("../Command/InternalBlockchain/ConfirmWithdrawInternalContractCreated/ConfirmWithdrawInternalContractCreatedHandler"));
const CoreModule_1 = require("../../Core/CoreModule");
const FoundWithdrawInternalContractCreation_1 = require("./FoundWithdrawInternalContractCreation");
const CheckInternalWithdrawalOperationHandler_1 = __importDefault(require("../Command/InternalBlockchain/CheckInternalWithdrawalOperation/CheckInternalWithdrawalOperationHandler"));
const WorkerCreateWithdrawalExternalContract_1 = require("./WorkerCreateWithdrawalExternalContract");
const CreateWithdrawalExternalContractHandler_1 = __importDefault(require("../Command/ExternalBlockchain/CreateWithdrawalExternalContract/CreateWithdrawalExternalContractHandler"));
const WrappedEtherToEtherConverter_1 = __importDefault(require("../../Infrastructure/WrappedEtherToEtherConverter"));
const WithdrawContractsCreationsProcessingLink_1 = __importDefault(require("../Command/ExternalBlockchain/ProcessWithdrawContractCreation/WithdrawContractsCreationsProcessingLink"));
const ProcessWithdrawContractCreationHandler_1 = __importDefault(require("../Command/ExternalBlockchain/ProcessWithdrawContractCreation/ProcessWithdrawContractCreationHandler"));
const GetDepositLastContractsHandler_1 = __importDefault(require("../Query/ExternalBlockchain/GetDepositLastContractsEvents/GetDepositLastContractsHandler"));
const GetDepositLastRedeemsHandler_1 = __importDefault(require("../Query/ExternalBlockchain/GetDepositLastContractsEvents/GetDepositLastRedeemsHandler"));
const GetWithdrawLastContractsHandler_1 = __importDefault(require("../Query/ExternalBlockchain/GetWithdrawLastContractsEvents/GetWithdrawLastContractsHandler"));
const GetWithdrawLastRedeemsHandler_1 = __importDefault(require("../Query/ExternalBlockchain/GetWithdrawLastContractsEvents/GetWithdrawLastRedeemsHandler"));
const MonitorExternalWithdrawRedeemsLink_1 = __importDefault(require("../Command/ExternalBlockchain/MonitorExternalWithdrawRedeem/MonitorExternalWithdrawRedeemsLink"));
const ExternalWithdrawRedeemHandler_1 = __importDefault(require("../Command/ExternalBlockchain/MonitorExternalWithdrawRedeem/ExternalWithdrawRedeemHandler"));
const WorkerWithdrawExternalContractRedeemed_1 = require("./WorkerWithdrawExternalContractRedeemed");
const ConfirmWithdrawExternalContractRedeemedHandler_1 = __importDefault(require("../Command/ExternalBlockchain/ConfirmWithdrawExternalContractRedeemed/ConfirmWithdrawExternalContractRedeemedHandler"));
const ExecuteWithdrawInternalContractRedeem_1 = require("./ExecuteWithdrawInternalContractRedeem");
const ProcessWithdrawInternalContractRedeemHandler_1 = __importDefault(require("../Command/InternalBlockchain/ProcessWithdrawInternalContractRedeem/ProcessWithdrawInternalContractRedeemHandler"));
const MonitorWithdrawInternalContractRedeem_1 = require("./MonitorWithdrawInternalContractRedeem");
const ConfirmWithdrawInternalContractRedeemHandler_1 = __importDefault(require("../Command/InternalBlockchain/ConfirmWithdrawInternalContractRedeem/ConfirmWithdrawInternalContractRedeemHandler"));
const MonitorWithdrawInternalContractRedeemProcessed_1 = require("./MonitorWithdrawInternalContractRedeemProcessed");
const ConfirmWithdrawProcessedHandler_1 = __importDefault(require("../Command/InternalBlockchain/ConfirmWithdrawProcessed/ConfirmWithdrawProcessedHandler"));
const MonitorExternalWithdrawContractTimelock_1 = require("./MonitorExternalWithdrawContractTimelock");
const ProcessWithdrawExternalContractRefundHandler_1 = require("../Command/ExternalBlockchain/ProcessWithdrawExternalContractRefund/ProcessWithdrawExternalContractRefundHandler");
const UpdateSanctionedAddresses_1 = require("./UpdateSanctionedAddresses");
const GetFee_1 = require("./GetFee");
const SetFee_1 = require("./SetFee");
const ExternalDepositRefundHandler_1 = __importDefault(require("../Command/ExternalBlockchain/MonitorExternalDepositRefund/ExternalDepositRefundHandler"));
const MonitorExternalDepositRefundsLink_1 = __importDefault(require("../Command/ExternalBlockchain/MonitorExternalDepositRefund/MonitorExternalDepositRefundsLink"));
const MonitorExternalWithdrawRefundsLink_1 = __importDefault(require("../Command/ExternalBlockchain/MonitorExternalWithdrawRefund/MonitorExternalWithdrawRefundsLink"));
const ExternalWithdrawRefundHandler_1 = __importDefault(require("../Command/ExternalBlockchain/MonitorExternalWithdrawRefund/ExternalWithdrawRefundHandler"));
const GetDepositLastRefundsHandler_1 = __importDefault(require("../Query/ExternalBlockchain/GetDepositLastContractsEvents/GetDepositLastRefundsHandler"));
const GetWithdrawLastRefundsHandler_1 = __importDefault(require("../Query/ExternalBlockchain/GetWithdrawLastContractsEvents/GetWithdrawLastRefundsHandler"));
let CliModule = class CliModule {
};
CliModule = __decorate([
    (0, common_1.Module)({
        imports: [CoreModule_1.CoreModule],
        providers: [
            MonitorEthereumTransactions_1.MonitorEthereumTransactions,
            MonitorWithdrawInternalContractCreated_1.MonitorWithdrawInternalContractCreated,
            ExternalContractRedeemWorker_1.ExternalContractRedeemWorker,
            ExternalBlockchain_1.default,
            GetDepositLastContractsHandler_1.default,
            GetLastBlocksHandler_1.default,
            ChainProcessor_1.default,
            Setting_1.default,
            Repository_1.default,
            ProcessIncomingContractCreationHandler_1.default,
            IncomingContractsCreationsProcessingLink_1.default,
            MonitorExternalDepositRedeemsLink_1.default,
            MonitorExternalWithdrawRedeemsLink_1.default,
            GetDepositLastRedeemsHandler_1.default,
            ExternalDepositRedeemHandler_1.default,
            ExternalWithdrawRedeemHandler_1.default,
            ConfirmDepositExternalContractRedeemedHandler_1.default,
            MonitorDepositInternalContractRefunded_1.MonitorDepositInternalContractRefunded,
            DepositInternalContractRefundHandler_1.default,
            MonitorDepositInternalContractBurned_1.MonitorDepositInternalContractBurned,
            BurnedHandler_1.default,
            EtherToWrappedEtherConverter_1.default,
            AssetNormalizer_1.default,
            GetLastWithdrawContractsHandler_1.default,
            ConfirmWithdrawInternalContractCreatedHandler_1.default,
            FoundWithdrawInternalContractCreation_1.FoundWithdrawInternalContractCreation,
            CheckInternalWithdrawalOperationHandler_1.default,
            WorkerCreateWithdrawalExternalContract_1.WorkerCreateWithdrawalExternalContract,
            CreateWithdrawalExternalContractHandler_1.default,
            WrappedEtherToEtherConverter_1.default,
            WithdrawContractsCreationsProcessingLink_1.default,
            ProcessWithdrawContractCreationHandler_1.default,
            GetWithdrawLastContractsHandler_1.default,
            GetWithdrawLastRedeemsHandler_1.default,
            WorkerWithdrawExternalContractRedeemed_1.WorkerWithdrawExternalContractRedeemed,
            ConfirmWithdrawExternalContractRedeemedHandler_1.default,
            ExecuteWithdrawInternalContractRedeem_1.ExecuteWithdrawInternalContractRedeem,
            ProcessWithdrawInternalContractRedeemHandler_1.default,
            MonitorWithdrawInternalContractRedeem_1.MonitorWithdrawInternalContractRedeem,
            ConfirmWithdrawInternalContractRedeemHandler_1.default,
            MonitorWithdrawInternalContractRedeemProcessed_1.MonitorWithdrawInternalContractRedeemProcessed,
            ConfirmWithdrawProcessedHandler_1.default,
            MonitorExternalWithdrawContractTimelock_1.MonitorExternalWithdrawContractTimelock,
            ProcessWithdrawExternalContractRefundHandler_1.ProcessWithdrawExternalContractRefundHandler,
            UpdateSanctionedAddresses_1.UpdateSanctionedAddresses,
            ExternalDepositRefundHandler_1.default,
            MonitorExternalDepositRefundsLink_1.default,
            ExternalWithdrawRefundHandler_1.default,
            MonitorExternalWithdrawRefundsLink_1.default,
            GetDepositLastRefundsHandler_1.default,
            GetWithdrawLastRefundsHandler_1.default,
            GetFee_1.GetFee,
            SetFee_1.SetFee,
            {
                provide: "DataSource",
                useValue: DataSource_1.default,
            },
            {
                provide: "SettingConfig",
                useValue: { repository: "typeorm" },
            },
            {
                provide: "ExternalBlockchainRepositoryName",
                useValue: "ethereum",
            },
            {
                provide: "DepositRepositoryInterface",
                useClass: DepositRepository_1.default,
            },
            {
                provide: "DepositRequestRepositoryInterface",
                useClass: DepositRequestRepository_1.default,
            },
            {
                provide: "ExternalBlockchainRepositoryInterface",
                useClass: EthereumRepository_1.default,
            },
            {
                provide: "InternalBlockchain",
                useFactory: () => {
                    return InternalBlockchain_1.default.init({ repository: "native" });
                },
            },
            {
                provide: "NotifierInterface",
                useClass: ConsoleNotifier_1.default,
            },
            {
                provide: "ConverterInterface",
                useClass: EtherToWrappedEtherConverter_1.default,
            },
            {
                provide: "QueueInterface",
                useClass: RabbitMQ_1.default,
            },
        ],
    })
], CliModule);
exports.CliModule = CliModule;
//# sourceMappingURL=CliModule.js.map