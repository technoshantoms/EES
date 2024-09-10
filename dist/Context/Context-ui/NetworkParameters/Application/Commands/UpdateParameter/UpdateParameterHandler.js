"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateParameterHandler {
    execute(command) {
        let parameters = command.parameters;
        const path = command.key.split(".");
        const level1Name = path.shift();
        const level1Parameter = command.parameters.get(level1Name);
        if (level1Parameter.isLink()) {
            return parameters;
        }
        if (level1Parameter.isNormal()) {
            level1Parameter.newValue = command.newValue;
        }
        if (level1Parameter.isGroup()) {
            this.updateGroupParameter(level1Parameter, path, command.newValue);
        }
        parameters = parameters.set(level1Parameter.name, level1Parameter);
        return parameters;
    }
    updateGroupParameter(parameter, path, newValue) {
        if (path.length == 0) {
            parameter.newValue = newValue;
            return;
        }
        if (parameter.isGroup()) {
            const name = path.shift();
            const child = parameter.children.find(child => (child === null || child === void 0 ? void 0 : child.name) == name);
            this.updateGroupParameter(child, path, newValue);
        }
    }
}
exports.default = UpdateParameterHandler;
//# sourceMappingURL=UpdateParameterHandler.js.map