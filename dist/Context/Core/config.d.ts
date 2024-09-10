declare class Config {
    constructor();
    config(): {
        env: string;
        isTest: boolean;
    };
    private env;
}
declare const _default: Config;
export default _default;
