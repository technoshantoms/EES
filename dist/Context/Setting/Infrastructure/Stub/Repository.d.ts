import RepositoryInterface from "../../Domain/RepositoryInterface";
export default class Repository implements RepositoryInterface {
    private settings;
    load(name: string): Promise<string | null>;
    save(name: string, value: any): Promise<void>;
}
