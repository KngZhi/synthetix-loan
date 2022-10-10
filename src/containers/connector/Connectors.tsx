import {
  useCallback,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from 'react';
import { AppState } from '@web3-onboard/core';
import { createContainer } from 'unstated-next';
import TransactionNotifier from '@synthetixio/transaction-notifier';
import { loadProvider, SynthetixProvider } from '@synthetixio/providers';

import { getIsOVM, isSupportedNetworkId } from '@/utils/network';

import {
  NetworkNameById,
  NetworkIdByName,
  NetworkId,
} from '@synthetixio/contracts-interface';
import { ethers } from 'ethers';

import { onboard as Web3Onboard } from './config';
import { LOCAL_STORAGE_KEYS } from '@/constants/storage';
import { CurrencyKey, ETH_ADDRESS } from '@/constants/currency';
import { synthToContractName } from '@/utils/currencies';
import { AppEvents, initialState, reducer } from './reducer';

import { getChainIdHex, getNetworkIdFromHex } from '@/utils/infura';
import { Network } from '@/store/wallet';
import { initializeSynthetix } from '@/utils/contracts';

const defaultNetwork: Network = {
  id: NetworkIdByName.mainnet,
  name: NetworkNameById[NetworkIdByName.mainnet],
  useOvm: getIsOVM(NetworkIdByName.mainnet),
};
// Ethereum Mainnet
const L1DefaultProvider: SynthetixProvider = loadProvider({
  infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
    ? process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
    : `0`,
  networkId: NetworkIdByName.mainnet,
});

// Optimism Mainnet
const L2DefaultProvider: SynthetixProvider = loadProvider({
  infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
    ? process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
    : `0`,
  networkId: NetworkIdByName[`mainnet-ovm`],
});
const transactionNotifier = new TransactionNotifier(L1DefaultProvider);

const ConnectorContext = createContext<unknown>(null);
export const useConnectorContext = () => {
  return useContext(ConnectorContext);
};

const useConnector = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const {
  //   isAppReady,
  //   provider,
  //   network,
  //   signer,
  //   synthetixjs,
  //   walletAddress,
  //   walletWatched,
  //   ensName,
  //   ensAvatar,
  //   onboard,
  //   walletType,
  // } = state;

  return {
    name: 0.01,
  };
};

const Connector = createContainer(useConnector);

export default Connector;
