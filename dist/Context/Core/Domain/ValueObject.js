"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shallow_equal_object_1 = require("shallow-equal-object");
class ValueObject {
    constructor(props) {
        this.props = Object.freeze(props);
    }
    get value() {
        return this.props.value;
    }
    equals(vo) {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return (0, shallow_equal_object_1.shallowEqual)(this.props, vo.props);
    }
}
exports.default = ValueObject;
//# sourceMappingURL=ValueObject.js.map