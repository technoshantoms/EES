declare const config: {
    contract: {
        minimum_timelock: number;
    };
    eth: {
        providers: {
            infura: {
                api_key: string | undefined;
            };
        };
        provider: string;
        network: string;
        private_key: string;
        minimum_deposit_amount: import("bn.js");
        deposit_contract_address: string;
        withdraw_contract_address: string;
        receiver: string;
    };
    env: string;
    isTest: boolean;
};
export default config;
