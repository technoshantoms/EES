"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureHasPrefix = void 0;
function ensureHasPrefix(hash) {
    if (hash.substring(0, 2) !== "0x") {
        hash = "0x" + hash;
    }
    return hash;
}
exports.ensureHasPrefix = ensureHasPrefix;
//# sourceMappingURL=Helpers.js.map