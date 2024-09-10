"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("./Entity"));
const DomainEvents_1 = __importDefault(require("./Events/DomainEvents"));
class AggregateRoot extends Entity_1.default {
    constructor() {
        super(...arguments);
        this._domainEvents = [];
    }
    get id() {
        return this._id;
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
        DomainEvents_1.default.markAggregateForDispatch(this);
    }
    clearEvents() {
        this._domainEvents.splice(0, this._domainEvents.length);
    }
    set id(id) {
        this._id = id;
    }
}
exports.default = AggregateRoot;
//# sourceMappingURL=AggregateRoot.js.map