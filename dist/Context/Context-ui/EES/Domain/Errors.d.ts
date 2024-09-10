import { DomainError } from "../../Core";
export declare class SessionWrongStatusError extends DomainError {
    constructor(sessionId: string, message: string);
}
