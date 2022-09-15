import { getInfuraRpcURL } from '@/utils/infura';
import { NetworkIdByName } from '@synthetixio/contracts-interface';

type Token = 'ETH';

export interface Chain {
  id: number;
  token: Token;
  label: string;
  rpcUrl: string;
}

export const Ethereum: Chain = {
  id: NetworkIdByName.mainnet,
  token: `ETH`,
  label: `Ethereum`,
  rpcUrl: getInfuraRpcURL(NetworkIdByName.mainnet),
};

export const Optimism: Chain = {
  id: NetworkIdByName[`mainnet-ovm`],
  token: `ETH`,
  label: `Optimism`,
  rpcUrl: getInfuraRpcURL(NetworkIdByName[`mainnet-ovm`]),
};

export const SupportedChains: Chain[] = [Ethereum, Optimism];
