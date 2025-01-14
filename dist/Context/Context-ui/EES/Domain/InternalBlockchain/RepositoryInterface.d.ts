import Contract from "./Contract";
import { EESSettings } from "../EES/RepositoryInterface";
import WithdrawSession from "../Withdraw/WithdrawSession";
export default interface InternalBlockchainRepositoryInterface {
    loadContractsByAccount: (account: string) => Promise<Contract[]>;
    withdraw: (settings: EESSettings, session: WithdrawSession) => void;
    getICOBalanceObject(ethAddress: string): Promise<any[]>;
    icoBalanceClaim(balanceObject: any[], ethSign: string, publicKey: string, account: string): Promise<void>;
}
