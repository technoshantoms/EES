import Fee from "./Fee";
import { Fees } from "../types";
import OperationFeesType = Fees.OperationFeesType;
export default class Operation {
    private _id;
    private _name;
    private _fees;
    private _showCHParticipantTransferFee;
    private _ltmRequired;
    constructor(_id: number, _name: string);
    get id(): number;
    get name(): string;
    addFee(fee: Fee): void;
    get fees(): OperationFeesType;
    get updated(): boolean;
    get showCHParticipantTransferFee(): boolean;
    get ltmRequired(): boolean;
    setShowCHParticipantTransferFee(): void;
    setLtmRequired(): void;
    getFee(code: string): Fee;
    updateFee(code: string, newValue: number): void;
}
