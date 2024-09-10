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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WithdrawStubRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/Stub/WithdrawStubRepository"));
const StubRepository_1 = __importDefault(require("../../../../../../Context/InternalBlockchain/Repository/StubRepository"));
const WrappedEtherToEtherConverter_1 = __importDefault(require("../../../../../../Context/Infrastructure/WrappedEtherToEtherConverter"));
const AssetNormalizer_1 = __importDefault(require("../../../../../../Context/Infrastructure/AssetNormalizer"));
const CreateWithdrawalExternalContractHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/CreateWithdrawalExternalContract/CreateWithdrawalExternalContractHandler"));
const Withdraw_1 = __importStar(require("../../../../../../Context/Domain/Withdraw"));
const WithdrawRequest_1 = __importDefault(require("../../../../../../Context/Domain/WithdrawRequest"));
const NativeAccount_1 = __importDefault(require("../../../../../../Context/Domain/ValueObject/NativeAccount"));
const InternalContract_1 = __importDefault(require("../../../../../../Context/Domain/InternalContract"));
const ExternalBlockchain_1 = __importDefault(require("../../../../../../Context/ExternalBlockchain/ExternalBlockchain"));
const InternalBlockchain_1 = __importDefault(require("../../../../../../Context/InternalBlockchain/InternalBlockchain"));
const dayjs_1 = __importDefault(require("dayjs"));
describe("CreateWithdrawExternalContractHandler", () => {
    let withdrawRepository;
    let externalBlockchain;
    let internalBlockchain;
    let wrappedEtherToEtherConverter;
    let normalizer;
    let withdraw;
    let handler;
    beforeEach(function () {
        withdrawRepository = new WithdrawStubRepository_1.default();
        externalBlockchain = new ExternalBlockchain_1.default("stub");
        internalBlockchain = new InternalBlockchain_1.default(new StubRepository_1.default());
        wrappedEtherToEtherConverter = new WrappedEtherToEtherConverter_1.default();
        normalizer = new AssetNormalizer_1.default();
        handler = new CreateWithdrawalExternalContractHandler_1.default(withdrawRepository, externalBlockchain, internalBlockchain, wrappedEtherToEtherConverter, normalizer);
        withdraw = new Withdraw_1.default(WithdrawRequest_1.default.create(NativeAccount_1.default.create("native_account_name"), 1, "0x0000000AddressOfUserInEthereum", 1, "ETH"), new InternalContract_1.default("0x123InternalContract"), "0x123CreateOperationId", "0x123TransferOperationId");
        withdraw.status = Withdraw_1.STATUS_READY_TO_PROCESS;
        withdraw.internalContract.createdAt = (0, dayjs_1.default)().subtract(1, "day").toDate();
        withdraw.amountOfHTLC = 0.01;
        withdraw.timelock = 1;
        withdrawRepository.save(withdraw);
    });
});
//# sourceMappingURL=CreateWithdrawalExternalContractHandler.js.map