"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const Factory_1 = __importDefault(require("../../../Domain/Factory"));
const lodash_1 = require("lodash");
class LoadAllHandler {
    constructor(repository, jsonParameters) {
        this.repository = repository;
        this.jsonParameters = jsonParameters;
    }
    async execute(request) {
        var _a;
        const data = await this.repository.load();
        const parameters = (0, immutable_1.Map)().asMutable();
        const factory = new Factory_1.default();
        for (const [name, value] of Object.entries(data)) {
            const parameter = factory.create(name, value, (_a = this.jsonParameters[name]) !== null && _a !== void 0 ? _a : null);
            parameters.set(name, parameter);
            delete this.jsonParameters[name];
        }
        for (const [name, value] of Object.entries(this.jsonParameters)) {
            if ((0, lodash_1.isEmpty)(value.defaultValue)) {
                continue;
            }
            const parameter = factory.create(name, value.defaultValue, this.jsonParameters[name]);
            parameter.newValue = value.defaultValue;
            parameters.set(name, parameter);
        }
        return parameters.asImmutable();
    }
}
exports.default = LoadAllHandler;
//# sourceMappingURL=LoadAllHandler.js.map