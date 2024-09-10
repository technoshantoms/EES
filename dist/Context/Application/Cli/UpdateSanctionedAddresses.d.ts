import { CommandRunner } from "nest-commander";
export declare class UpdateSanctionedAddresses extends CommandRunner {
    run(): Promise<void>;
    private downloadFile;
    private validateFile;
    private cleanUp;
}
