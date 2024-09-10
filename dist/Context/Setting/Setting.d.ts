import { DataSource } from "typeorm";
import TypeOrmRepository from "./Infrastructure/TypeOrm/Repository";
export declare const EXTERNAL_REDEEM_ALERT_THRESHOLD_TIMEOUT = "external_redeem_alert_threshold_timeout";
export declare const INTERNAL_REDEEM_ALERT_THRESHOLD_TIMEOUT = "internal_redeem_alert_threshold_timeout";
interface Config {
    repository: "typeorm" | "stub";
    dataSource?: DataSource;
}
export default class Setting {
    private config;
    private typeormRepository?;
    private repository;
    constructor(config: Config, typeormRepository?: TypeOrmRepository | undefined);
    static init(config: Config): Setting;
    load(name: string, defaultValue?: any): Promise<string>;
    save(name: string, value: any): Promise<void>;
}
export {};
