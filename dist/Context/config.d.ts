declare const config: {
    contract: {
        minimum_timelock: number;
        withdraw_internal_timelock: number;
        withdraw_external_timelock: number;
    };
    worker: {
        period: number;
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
        minimum_withdraw_amount: number;
        deposit_contract_address: string;
        withdraw_contract_address: string;
        deploy_block_number: number;
        receiver: string;
        required_block_confirmations: number;
        redeem_timeframe: number;
    };
    r_squared: {
        node_url: string | undefined;
        ees_account: string;
        asset_symbol: string | undefined;
        asset_id: string | undefined;
        account_private_key: string | undefined;
        redeem_timeframe: number;
        chain_id: string | undefined;
        rqrx_withdrawal_fee: number;
        rqeth_withdrawal_fee: number;
        rqeth_deposit_fee: number;
        eth_to_rqeth_rate: number;
        chain_network_name: string;
        rqeth_asset_symbol: string;
    };
    db: {
        name: string | undefined;
        host: string | undefined;
        port: number;
        user: string | undefined;
        password: string | undefined;
    };
    rabbitmq: {
        host: string;
        port: number;
    };
    env: string;
    isTest: boolean;
};
export default config;
