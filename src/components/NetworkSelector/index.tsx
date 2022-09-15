import { FC, useEffect } from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';
import { useRecoilState } from 'recoil';
import { useSetChain } from '@web3-onboard/react';

import { DefaultDropdownMenu } from '@/components/Dropdown';
import { NetWorkButton, NetWorkSelectorButton } from '@/components/Base/Button';

// import { networkState } from '../store/index';

import EthereumLogo from '@/assets/svg/ethereum.svg';
import OptimismLogo from '@/assets/svg/optimism.svg';
import DownArrow from '@/assets/svg/down-arrow.svg';
import { Optimism, Ethereum, Chain, SupportedChains } from '@/constants/chains';
// import { useConnectorContext } from 'connector/Connector';

const NETWORK_ICON = {
  [Ethereum.id]: EthereumLogo,
  [Optimism.id]: OptimismLogo,
};

const NetworkSelectorContainer = styled.div`
  background: linear-gradient(121.5deg, #101215 55.37%, #22272b 106.67%);
  position: absolute;
  margin-top: 54px;
  padding: 8px;
  gap: 2px;

  width: 160px;

  border: 1px solid #8282954d;
  border-radius: 4px;
  cursor: pointer;
`;

const NetworkButton: FC<NetworkButtonProps> = ({
  name,
  src,
  onClick,
  isActive,
}) => {
  return (
    <NetWorkSelectorButton active={isActive} onClick={onClick}>
      <Image src={src} alt={name} />
      <span className="ml-1.25">{name}</span>
    </NetWorkSelectorButton>
  );
};

type NetworkSelectorProps = {
  menuCls?: string;
  dropdownCls?: string;
  containerCls?: string;
};

type NetworkButtonProps = {
  name: string;
  src: StaticImageData;
  onClick: () => void;
  isActive: boolean;
};

const NetworkSelector: FC<NetworkSelectorProps> = ({
  menuCls,
  dropdownCls,
  containerCls,
}) => {
  // const [activeNetwork, setActiveNetwork] = useRecoilState(networkState);

  // const { isWalletConnected, network } = useConnectorContext();
  // const [{ connectedChain }, setChain] = useSetChain();

  // console.log(activeNetwork, network, connectedChain)
  // useEffect(() => {
  //   if (network) {
  //     const chain = SupportedChains.find(
  //       (chain) => Number(chain.id) === network.id,
  //     ) as Chain;
  //     setActiveNetwork(chain);
  //   }
  // }, [network, setActiveNetwork]);

  // const onSwitchChain = async (chain: Chain) => {
  //   if (isWalletConnected) {
  //     try {
  //       const isSuccess = await setChain({ chainId: chain.id });
  //       if (isSuccess) {
  //         setActiveNetwork(chain);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     setActiveNetwork(chain);
  //   }
  // };

  return (
    <DefaultDropdownMenu
      className={containerCls}
      triggerCls={menuCls}
      dropdownCls={dropdownCls}
      trigger={
        <NetWorkButton>
          <Image
            style={{ marginRight: `5px` }}
            src={NETWORK_ICON[10]}
            alt={Optimism.label}
            priority={true}
          />
          <span>{Optimism.label}</span>
          <Image src={DownArrow} alt="down-arrow" priority={true} />
        </NetWorkButton>
      }
      dropList={
        <NetworkSelectorContainer>
          {SupportedChains.map((chain) => (
            <NetworkButton
              src={NETWORK_ICON[chain.id]}
              onClick={() => console.log(`hello world`)}
              isActive={chain.id === Optimism?.id}
              key={chain.id}
              name={chain.label}
            />
          ))}
        </NetworkSelectorContainer>
      }
    />
  );
};

export default NetworkSelector;
