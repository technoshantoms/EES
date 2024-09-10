import Contract from "../../../Domain/InternalBlockchain/Contract";
import InternalBlockchainRepositoryInterface from "../../../Domain/InternalBlockchain/RepositoryInterface";
import { EESSettings } from "../../../Domain/EES/RepositoryInterface";
import Memo from "../Memo";
import WithdrawSession from "../../../Domain/Withdraw/WithdrawSession";
import AssetNormalizer from "../../AssetNormalizer";
export default class RSquaredRepository implements InternalBlockchainRepositoryInterface {
    private memo;
    private normalizer;
    constructor(memo: Memo, normalizer: AssetNormalizer);
    static create(): RSquaredRepository;
    loadContractsByAccount(account: string): Promise<Contract[]>;
    withdraw(settings: EESSettings, session: WithdrawSession): Promise<void>;
    getICOBalanceObject(ethAddress: string): Promise<any[]>;
    icoBalanceClaim(balanceObject: any, ethSign: string, publicKey: string, account: string): Promise<void>;
    private getPrivateKey;
    private getAsset;
}
