import Entity from "context/Core/Domain/Entity";
export default class InternalContract extends Entity {
    private _internalId;
    private _status;
    private _createdAt;
    constructor(_internalId: string);
    get internalId(): string;
    get createdAt(): Date;
    set createdAt(value: Date);
}
