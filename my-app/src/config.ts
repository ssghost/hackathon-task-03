import {
    BrowserWalletConnector,
    Network,
    persistentConnectorType,
    WalletConnectConnector,
} from '@concordium/react-components';
import { SignClientTypes } from '@walletconnect/types';

export const DEFAULT_CONTRACT_INDEX = BigInt(81);
export const MAX_CONTRACT_EXECUTION_ENERGY = BigInt(30000);
export const PING_INTERVAL_MS = 5000;

const TESTNET_GENESIS_BLOCK_HASH = '4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796';
export const TESTNET: typeof Network = {
    name: 'testnet',
    genesisHash: TESTNET_GENESIS_BLOCK_HASH,
    jsonRpcUrl: 'https://json-rpc.testnet.concordium.com',
    ccdScanBaseUrl: 'https://testnet.ccdscan.io',
};

const WALLET_CONNECT_PROJECT_ID = '76324905a70fe5c388bab46d3e0564dc';
const WALLET_CONNECT_OPTS: typeof SignClientTypes.Options = {
    projectId: WALLET_CONNECT_PROJECT_ID,
    metadata: {
        name: 'myStorage',
        description: 'Example dApp',
        url: '#',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
};

export const BROWSER_WALLET = persistentConnectorType(BrowserWalletConnector.create);
export const WALLET_CONNECT = persistentConnectorType(WalletConnectConnector.create.bind(this, WALLET_CONNECT_OPTS));