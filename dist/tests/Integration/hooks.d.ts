import { DataSource } from "typeorm";
declare let dataSourceTest: DataSource;
export declare const mochaHooks: {
    beforeAll: () => Promise<void>;
    afterAll: () => Promise<void>;
    afterEach: () => Promise<void>;
};
export { dataSourceTest };
