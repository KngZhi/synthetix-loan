import { FC } from 'react';
import styled, { css } from 'styled-components';
import Image, { StaticImageData } from 'next/image';

import { DefaultDropdownMenu } from '@/components/Dropdown';
import { NetWorkButton, BaseButton } from '@/components/Base/Button';

// import { networkState } from '../store/index';

import EthereumLogo from '@/assets/svg/ethereum.svg';
import OptimismLogo from '@/assets/svg/optimism.svg';
import DownArrow from '@/assets/svg/down-arrow.svg';
import { Optimism, Ethereum, SupportedChains } from '@/constants/chains';
// import { useConnectorContext } from 'connector/Connector';

const NETWORK_ICON = {
  [Ethereum.id]: EthereumLogo,
  [Optimism.id]: OptimismLogo,
};

const NetworkSelectorContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgNavy};
  position: absolute;
  margin-top: 44px;
  gap: 2px;

  width: 100%;

  border: 1px solid ${({ theme }) => theme.colors.gray900};
  border-radius: 5px;
  cursor: pointer;
`;

const NetWorkSelectorButton = styled(BaseButton)<{ active?: boolean }>`
  border: unset;
  border-radius: 0 0 4px 4px;
  width: 100%;
  height: 40px;
  padding: 8px 10px;
  gap: 5px;
  justify-content: flex-start;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bgNavy};
  color: white;
  font-weight: 700;
  ${({ active }) =>
    active &&
    css`
      background: rgba(130, 130, 149, 0.3);
      &::after {
        justify-self: end;
        display: block;
        content: ' ';
        background: #31d8a4;
        height: 8px;
        width: 8px;
        border: 2px solid #31d8a4;
        border-radius: 50%;
        box-shadow: 0px 0px 15px rgba(68, 239, 193, 0.6);
        position: absolute;
        right: 11%;
      }
    `}
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
      offset={13}
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
