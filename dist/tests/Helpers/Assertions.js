"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(chai, utils) {
    const Assertion = chai.Assertion;
    utils.addProperty(chai.Assertion.prototype, 'repositoryEmpty', function () {
        const obj = utils.flag(this, 'object');
        const negate = utils.flag(this, "negate") || false;
        if (negate) {
            new Assertion(obj.size).gte(1, 'Repository is empty');
        }
        else {
            new Assertion(obj.size).equals(0, 'Repository is not empty');
        }
    });
    utils.addMethod(Assertion.prototype, 'repositorySize', function (size) {
        const obj = utils.flag(this, 'object');
        new Assertion(obj.size).equals(size, `Repository size not equals ${size}`);
    });
}
exports.default = default_1;
//# sourceMappingURL=Assertions.js.map