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
const Errors = __importStar(require("./Errors"));
const TransactionConfirmStore_1 = __importDefault(require("../../../../../stores/TransactionConfirmStore"));
class MakeWithdrawHandler {
    constructor(sessionRepository, eesRepository, internalRepository) {
        this.sessionRepository = sessionRepository;
        this.eesRepository = eesRepository;
        this.internalRepository = internalRepository;
    }
    async execute(command) {
        const session = await this.sessionRepository.load(command.sessionId);
        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }
        if (!session.isCreated()) {
            throw new Errors.SessionAlreadyPaid(command.sessionId);
        }
        const settings = await this.eesRepository.loadEESSettings();
        let isError = false;
        const onFinishConfirm = async (confirm_store_state) => {
            if (confirm_store_state.error) {
                isError = true;
            }
            if (confirm_store_state.error ||
                (confirm_store_state.included &&
                    confirm_store_state.broadcasted_transaction)) {
                TransactionConfirmStore_1.default.unlisten(onFinishConfirm);
                TransactionConfirmStore_1.default.reset();
            }
        };
        TransactionConfirmStore_1.default.listen(onFinishConfirm);
        await this.internalRepository.withdraw(settings, session);
        if (!isError) {
            session.submittedInInternalBlockchain();
            await this.sessionRepository.save(session);
        }
        return !isError;
    }
}
exports.default = MakeWithdrawHandler;
//# sourceMappingURL=MakeWithdrawHandler.js.map