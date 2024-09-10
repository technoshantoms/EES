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
class IndexedDBDepositSessionRepository {
    constructor() {
        this.db = IndexedDB_1.default.getInstance();
    }
    async load(sessionId) {
        if (this.db === null) {
            return null;
        }
        const store = this.db
            .transaction(IndexedDB_1.DEPOSIT_SESSION_STORE)
            .objectStore(IndexedDB_1.DEPOSIT_SESSION_STORE);
        const request = await store.get(sessionId);
        if (request.hasOwnProperty("id") && request.id === sessionId) {
            return Transformer_1.default.reverseTransform(request);
        }
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const session = request.result;
                if (!session) {
                    resolve(null);
                }
                resolve(Transformer_1.default.reverseTransform(session));
            };
            request.onerror = () => {
                console.log("Load session error.");
            };
        });
    }
    async all(internalAccount) {
        if (this.db === null) {
            return [];
        }
        const store = this.db
            .transaction(IndexedDB_1.DEPOSIT_SESSION_STORE)
            .objectStore(IndexedDB_1.DEPOSIT_SESSION_STORE);
        try {
            const request = await store.getAll();
            const sessions = [];
            for (const session of request) {
                if (session.internalAccount !== internalAccount) {
                    continue;
                }
                sessions.push(Transformer_1.default.reverseTransform(session));
            }
            sessions.sort((a, b) => {
                if (a.timeLock > b.timeLock) {
                    return -1;
                }
                if (a.timeLock < b.timeLock) {
                    return 1;
                }
                return 0;
            });
            console.log(sessions);
            return sessions;
        }
        catch (e) {
            console.log("Load sessions error.", e);
            return [];
        }
    }
    async save(session) {
        if (this.db === null) {
            return false;
        }
        const tx = this.db.transaction(IndexedDB_1.DEPOSIT_SESSION_STORE, "readwrite");
        const store = tx.objectStore(IndexedDB_1.DEPOSIT_SESSION_STORE);
        if (store.put === undefined) {
            return false;
        }
        await Promise.all([store.put(Transformer_1.default.transform(session)), tx.done]);
        return true;
    }
}
exports.default = IndexedDBDepositSessionRepository;
//# sourceMappingURL=IndexedDBDepositSessionRepository.js.map