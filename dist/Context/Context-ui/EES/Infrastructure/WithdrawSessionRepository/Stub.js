"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stub {
    constructor() {
        this.sessions = {};
    }
    load(sessionId) {
        var _a;
        return Promise.resolve((_a = this.sessions[sessionId]) !== null && _a !== void 0 ? _a : null);
    }
    async all() {
        return Promise.resolve(Object.values(this.sessions));
    }
    save(session) {
        this.sessions[session.id] = session;
        return Promise.resolve(true);
    }
    clean() {
        this.sessions = {};
    }
    get count() {
        return Object.keys(this.sessions).length;
    }
    getById(id) {
        if (!this.sessions[id]) {
            return null;
        }
        return this.sessions[id];
    }
}
exports.default = Stub;
//# sourceMappingURL=Stub.js.map