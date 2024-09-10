interface DomainErrorInterface {
    message: string;
}
export declare abstract class DomainError implements DomainErrorInterface {
    readonly message: string;
    constructor(message: string);
}
export {};
