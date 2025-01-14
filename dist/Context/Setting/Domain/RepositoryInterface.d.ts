export default interface RepositoryInterface {
    load: (name: string) => Promise<string | null>;
    save: (name: string, value: any) => void;
}
