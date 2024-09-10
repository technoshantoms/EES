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
const Transformer_1 = __importDefault(require("./Transformer"));
const IndexedDB_1 = __importStar(require("../IndexedDB/IndexedDB"));
class IndexedDBWithdrawSessionRepository {
    constructor() {
        this.db = IndexedDB_1.default.getInstance();
    }
    async load(sessionId) {
        const store = await this.db
            .transaction(IndexedDB_1.WITHDRAW_SESSION_STORE)
            .objectStore(IndexedDB_1.WITHDRAW_SESSION_STORE);
        const request = await store.get(sessionId);
        if (request.hasOwnProperty("id") && request.id === sessionId) {
            return Transformer_1.default.reverseTransform(request);
        }
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                debugger;
                const session = request.result;
                if (!session) {
                    resolve(null);
                }
                resolve(Transformer_1.default.reverseTransform(session));
            };
            request.onerror = () => {
                debugger;
                console.log("Load session error.");
            };
        });
    }
    async all() {
        const store = this.db
            .transaction(IndexedDB_1.WITHDRAW_SESSION_STORE)
            .objectStore(IndexedDB_1.WITHDRAW_SESSION_STORE);
        const request = await store.getAll();
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const sessions = [];
                for (const session of request.result) {
                    sessions.push(Transformer_1.default.reverseTransform(session));
                }
                console.log(sessions);
                resolve(sessions);
            };
            request.onerror = () => {
                console.log("Load sessions error.");
            };
        });
    }
    async save(session) {
        const tx = this.db.transaction(IndexedDB_1.WITHDRAW_SESSION_STORE, "readwrite");
        const store = tx.objectStore(IndexedDB_1.WITHDRAW_SESSION_STORE);
        if (store.put === undefined) {
            return false;
        }
        await Promise.all([store.put(Transformer_1.default.transform(session)), tx.done]);
        return true;
    }
}
exports.default = IndexedDBWithdrawSessionRepository;
//# sourceMappingURL=IndexedDBWithdrawSessionRepository.js.map