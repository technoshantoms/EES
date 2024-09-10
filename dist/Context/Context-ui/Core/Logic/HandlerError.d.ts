interface HandlerErrorInterface {
    message: string;
}
export declare abstract class HandlerError implements HandlerErrorInterface {
    readonly message: string;
    constructor(message: string);
}
export {};
