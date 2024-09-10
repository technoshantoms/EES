"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WITHDRAW_SESSION_STORE = exports.DEPOSIT_SESSION_STORE = void 0;
const idb_1 = require("idb");
const DB_NAME = "web3portal";
const DB_VERSION = 2;
exports.DEPOSIT_SESSION_STORE = "session";
exports.WITHDRAW_SESSION_STORE = "withdraw_session";
class IndexedDB {
    constructor() {
        this.db = null;
        this.openDatabase();
    }
    static getInstance() {
        if (!IndexedDB.instance) {
            IndexedDB.instance = new IndexedDB();
        }
        return IndexedDB.instance;
    }
    async openDatabase() {
        this.db = await (0, idb_1.openDB)(DB_NAME, DB_VERSION, {
            upgrade: (db, oldVersion, newVersion, transaction, event) => {
                if (oldVersion < 1) {
                    db.createObjectStore(exports.DEPOSIT_SESSION_STORE, {
                        keyPath: "id"
                    });
                }
                if (oldVersion < 2) {
                    db.createObjectStore(exports.WITHDRAW_SESSION_STORE, {
                        keyPath: "id"
                    });
                }
            }
        });
        return this.db;
    }
    transaction(storeNames, mode) {
        if (this.db === null) {
            throw new Error("DB is not available");
        }
        return this.db.transaction(storeNames, mode);
    }
}
exports.default = IndexedDB;
//# sourceMappingURL=IndexedDB.js.map