"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const NetworkParameter_1 = __importDefault(require("./NetworkParameter"));
class Factory {
    create(name, value, jsonParameter = null) {
        let parameter = new NetworkParameter_1.default(name);
        parameter = this.updateFromJsonParameter(parameter, jsonParameter);
        if (parameter.isLink()) {
            parameter.linkValue = value;
            return parameter;
        }
        if (!(0, lodash_1.isObject)(value)) {
            parameter.value = value;
            return parameter;
        }
        const childrenKeys = Object.keys(value);
        childrenKeys.forEach(name => (parameter.children = parameter.children.set(name, this.create(name, value[name]))));
        return parameter;
    }
    updateFromJsonParameter(parameter, jsonParameter) {
        if (null != jsonParameter) {
            parameter.description = jsonParameter.description;
            parameter.type = jsonParameter.type;
            parameter.link = jsonParameter.link ? jsonParameter.link : null;
        }
        return parameter;
    }
}
exports.default = Factory;
//# sourceMappingURL=Factory.js.map