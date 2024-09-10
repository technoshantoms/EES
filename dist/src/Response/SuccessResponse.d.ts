export default class SuccessResponse {
    private _data;
    constructor(_data?: any);
    get data(): any;
    static create(data?: any): SuccessResponse;
}
