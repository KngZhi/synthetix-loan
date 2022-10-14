import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import Connector from '@/containers/connector';
import { wei } from '@synthetixio/wei';
import { FlexCol } from '@/components/Base/Div';
import { SideText } from '@/components/Base/Text';

type BalanceProps = {
  asset: string;
  onSetMaxAmount?: (amount: string) => void;
};

const Balance: React.FC<BalanceProps> = ({ asset }) => {
  const { signer } = Connector.useContainer();
  return !signer ? null : asset === `ETH` ? <ETH /> : <ERC20 {...{ asset }} />;
};

export default Balance;

const ETH = () => {
  const { provider, signer } = Connector.useContainer();
  const [balance, setBalance] = useState(ethers.BigNumber.from(`0`));

  useEffect(() => {
    if (!signer) return;

    let isMounted = true;
    const unsubs: Array<any> = [() => (isMounted = false)];

    const onSetBalance = async () => {
      const balance = await signer.getBalance();
      if (isMounted) setBalance(balance);
    };

    const subscribe = () => {
      if (provider) {
        const newBlockEvent = `block`;
        provider.on(newBlockEvent, onSetBalance);
        unsubs.push(() => provider.off(newBlockEvent, onSetBalance));
      }
    };

    onSetBalance();
    subscribe();
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [signer, provider]);

  return (
    balance && (
      <Container>
        <SideText>ETH Balance: {wei(balance).toString(2)}</SideText>
      </Container>
    )
  );
};

type ERC20Props = {
  asset: string;
  onSetMaxAmount?: (amount: string) => void;
};

const ERC20: React.FC<ERC20Props> = ({ asset }) => {
  const { synthetixjs, walletAddress } = Connector.useContainer();

  const [balance, setBalance] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(`0`),
  );
  const [decimals, setDecimals] = useState<number>(0);

  const contract = useMemo(() => {
    if (!synthetixjs) return null;
    const {
      contracts: { SynthsBTC: sBTC, SynthsETH: sETH, SynthsUSD: sUSD },
    } = synthetixjs;
    const tokens: Record<string, typeof sBTC> = {
      sBTC,
      sETH,
      sUSD,
    };
    return tokens[asset];
  }, [asset, synthetixjs]);

  useEffect(() => {
    if (!(contract && walletAddress)) return;

    let isMounted = true;
    const unsubs: Array<any> = [() => (isMounted = false)];

    const loadBalance = async () => {
      const [decimals, balance] = await Promise.all([
        contract.decimals(),
        contract.balanceOf(walletAddress),
      ]);
      if (isMounted) {
        setDecimals(decimals);
        setBalance(balance);
      }
    };

    const subscribe = () => {
      const transferEvent = contract.filters.Transfer();
      const onBalanceChange = async (from: string, to: string) => {
        if (from === walletAddress || to === walletAddress) {
          if (isMounted) setBalance(await contract.balanceOf(walletAddress));
        }
      };

      contract.on(transferEvent, onBalanceChange);
      unsubs.push(() => contract.off(transferEvent, onBalanceChange));
    };

    loadBalance();
    subscribe();
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [contract, walletAddress]);

  return !(decimals && balance) ? null : (
    <Container>
      <SideText>
        {`${asset} Balance:`} {wei(balance, decimals).toString(2)}
      </SideText>
    </Container>
  );
};

const Container = styled(FlexCol)`
  align-items: flex-end;
`;
