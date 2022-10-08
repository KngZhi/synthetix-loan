import { Signer, Contract } from 'ethers';
import { contracts as WalletContracts } from './wallet';
import { contracts as LoanContracts } from './loans';
import {
  ContractsMap,
  NetworkId,
  NetworkNameById,
} from '@synthetixio/contracts-interface';

export const contracts: any = {
  ...WalletContracts,
  ...LoanContracts,
};

type ContractName = keyof typeof contracts;

export function initializeSynthetix(networkId: NetworkId, signer: Signer) {
  const contractsNames = Object.keys(contracts) as ContractName[];
  return contractsNames
    .map((contractName: ContractName) => {
      if (!contracts[contractName][NetworkNameById[networkId]]) {
        // Some contracts are not supported on both networks
        return null;
      }

      const { name, address, abi } =
        contracts[contractName][NetworkNameById[networkId]];

      return {
        name,
        address,
        abi,
      };
    })
    .filter((item) => item !== null)
    .reduce((acc: ContractsMap, contract) => {
      acc[contract?.name] = new Contract(
        contract?.address,
        contract?.abi,
        signer,
      );
      return acc;
    }, {});
}
