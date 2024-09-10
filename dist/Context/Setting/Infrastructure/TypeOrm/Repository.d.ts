import RepositoryInterface from "context/Setting/Domain/RepositoryInterface";
import { DataSource } from "typeorm";
export default class SettingRepository implements RepositoryInterface {
    private _datasource;
    constructor(_datasource: DataSource);
    load(name: string): Promise<string | null>;
    save(name: string, value: any): Promise<void>;
}
