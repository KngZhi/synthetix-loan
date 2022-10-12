import { NetworkId, NetworkName } from '@synthetixio/contracts-interface';
export type NetworkLabel = `Ethereum` | `Optimism`;

export type Network = {
  id: NetworkId;
  name: NetworkName;
  useOvm?: boolean;
  label: NetworkLabel;
};

export const NetworkLabelById: Record<1 | 10, NetworkLabel> = {
  1: `Ethereum`,
  10: `Optimism`,
};
