"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Failure = exports.Success = void 0;
class Success {
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    isFailure() {
        return false;
    }
    isSuccess() {
        return true;
    }
    static create(value) {
        return new Success(value);
    }
}
exports.Success = Success;
class Failure {
    constructor(value) {
        this._error = value;
    }
    get error() {
        return this._error;
    }
    isFailure() {
        return true;
    }
    isSuccess() {
        return false;
    }
    static create(error) {
        return new Failure(error);
    }
}
exports.Failure = Failure;
//# sourceMappingURL=Result.js.map