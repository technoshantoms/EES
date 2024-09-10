"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rsquared_js_1 = require("@r-squared/rsquared-js");
class Memo {
    generate(message, accountFromPrivateKey, accountFrom, accountTo) {
        const accountFromPublicKey = this.getPublicKey(accountFrom);
        const accountToPublicKey = this.getPublicKey(accountTo);
        const nonce = rsquared_js_1.TransactionHelper.unique_nonce_uint64();
        return {
            from: accountFromPublicKey,
            to: accountToPublicKey,
            nonce: nonce,
            message: this.encryptMessage(accountFromPrivateKey, accountToPublicKey, nonce, message)
        };
    }
    getPublicKey(account) {
        let publicKey = account.getIn(["options", "memo_key"]);
        if (/111111111111111111111/.test(publicKey)) {
            publicKey = null;
        }
        return publicKey;
    }
    encryptMessage(accountFromPrivateKey, accountToPublicKey, nonce, message) {
        return rsquared_js_1.Aes.encrypt_with_checksum(accountFromPrivateKey, accountToPublicKey, nonce, message);
    }
}
exports.default = Memo;
//# sourceMappingURL=Memo.js.map