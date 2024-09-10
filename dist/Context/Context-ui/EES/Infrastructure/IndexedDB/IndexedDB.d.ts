export declare const DEPOSIT_SESSION_STORE = "session";
export declare const WITHDRAW_SESSION_STORE = "withdraw_session";
export default class IndexedDB {
    private static instance;
    private db;
    private constructor();
    static getInstance(): IndexedDB;
    private openDatabase;
    transaction(storeNames: any, mode?: any): any;
}
