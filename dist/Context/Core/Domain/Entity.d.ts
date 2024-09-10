import UniqueEntityID from './UniqueEntityID';
export default abstract class Entity {
    protected _id: UniqueEntityID;
    constructor(id?: UniqueEntityID);
    get idString(): string;
    set idString(id: string);
    equals(object?: Entity): boolean;
}
