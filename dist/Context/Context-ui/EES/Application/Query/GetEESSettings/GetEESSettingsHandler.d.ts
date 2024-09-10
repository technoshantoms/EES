import GetEESSettings from "./GetEESSettings";
import EesRepository from "../../../Infrastructure/EES/Repository";
import { EESSettings } from "../../../Domain/EES/RepositoryInterface";
export default class GetEESSettingsHandler {
    private readonly repository;
    constructor(repository: EesRepository);
    execute(query: GetEESSettings): Promise<EESSettings>;
}
