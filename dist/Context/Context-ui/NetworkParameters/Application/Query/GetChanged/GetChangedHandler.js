"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
class GetChangedHandler {
    execute(request) {
        const parameters = request.parameters;
        return this.findChanged(parameters);
    }
    findChanged(parameters) {
        let changedParameters = (0, immutable_1.Map)();
        parameters.forEach(child => {
            if (child === null || child === void 0 ? void 0 : child.isGroup()) {
                const children = this.findChanged(child.children);
                if (children.size > 0) {
                    child.children = children;
                    changedParameters = changedParameters.set(child === null || child === void 0 ? void 0 : child.name, child);
                }
            }
            if ((child === null || child === void 0 ? void 0 : child.isNormal()) && (child === null || child === void 0 ? void 0 : child.isModified())) {
                changedParameters = changedParameters.set(child === null || child === void 0 ? void 0 : child.name, child);
            }
        });
        return changedParameters;
    }
}
exports.default = GetChangedHandler;
//# sourceMappingURL=GetChangedHandler.js.map