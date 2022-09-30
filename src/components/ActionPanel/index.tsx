import { Text30, Text16, Text12, SideText } from '@/components/Base/Text';
import { BaseCard } from '@/components/Base/Card';
import styled from 'styled-components';
import { Flex, FlexCol, FlexItemsCenter, FlexRow } from '@/components/Base/Div';
import NumericInput from '@/components/NumericInput';
import { ArrowDown, ChevronDown } from 'react-feather';
import ActionButton from '@/components/ActionButton';
import Slider from '@/components/Slider';
import type { TokenInterface } from '@/constants/tokens';
import { sUSD, ETH } from '@/constants/tokens';
import Image from 'next/image';
import { Text18 } from '@/components/Base/Text';
import { DefaultDropdownMenu } from '@/components/Dropdown';

const ActionPanel = () => {
  return (
    <>
      {` `}
      <TokenCard>
        <TokenSelector token={sUSD} />
        <Balance>
          <NumericInput value="0.1" placeholder="0.00" />
          <SideText>ETH Balance: 1000</SideText>
        </Balance>
      </TokenCard>
      <InfoCard>
        <RatioRow lText="C-Ratio" rText="123% -> 453%" />
        <Slider />
        <FlexRow>
          <Text12 color="#828295">Increase Risk</Text12>
          <Text12 color="#828295">Decrease Risk</Text12>
        </FlexRow>
        <SeparateLine />
        <RatioRow lText="Borrow APY" rText="2.99%" />
        <RatioRow lText="Issuance Fee" rText="2.99%" />
        <SeparateLine />
        <RatioRow lText="Gas Price(GWEI)" rText="Tx Cost: 0.0009 E ≠ $8.00" />
      </InfoCard>
      <ActionButton />
    </>
  );
};

export default ActionPanel;

const TokenCard = styled(BaseCard)`
  padding: 10px 8px 12px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const TokenSelector = ({ token }: { token: TokenInterface }) => {
  const CoinSelector = styled(Flex)<{ height?: string }>`
    align-items: center;
    gap: 5px;
    height: ${({ height }) => height || `100%`};
  `;

  const Coin = styled(Flex)<{ active: boolean }>`
    height: 44px;
    align-items: center;
    padding: 10px 8px;
    gap: 5px;
    ${(props) => props.active && `background: rgba(255, 255, 255, 0.06);`}
  `;

  const DropdownContainer = styled.div`
    width: 192px;
    background-color: ${({ theme }) => theme.colors.bgNavy};
    border: 1px solid #2d2d38;
    box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    z-index: 10;
  `;
  return (
    <DefaultDropdownMenu
      leftOffset={`-8`}
      offset={64}
      trigger={
        <CoinSelector>
          <Image src={token.src} alt={token.name} width={34} height={34} />
          <Text18>{token.name}</Text18>
          <ChevronDown size={16} />
        </CoinSelector>
      }
      dropList={
        <DropdownContainer>
          {[sUSD, ETH].map((token) => (
            <Coin key={token.key} active={token.key === `susd`}>
              <Image src={token.src} alt={token.name} width={24} height={24} />
              <Text18>{token.name}</Text18>
            </Coin>
          ))}
        </DropdownContainer>
      }
    />
  );
};

const Balance = styled(FlexCol)`
  align-items: flex-end;
`;

const IconArrow = styled(FlexItemsCenter)`
  border: 1px solid ${({ theme }) => theme.colors.gray900};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  margin-bottom: 26px;
`;
type RatioRowProps = {
  lText: string;
  rText: string;
};

const RatioRow = ({ lText, rText }: RatioRowProps) => {
  return (
    <FlexRow>
      <Text16>{lText}</Text16>
      <Text16>{rText}</Text16>
    </FlexRow>
  );
};

const InfoCard = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 10px;
  margin-bottom: 35px;
`;

const SeparateLine = styled.div`
  background: rgba(130, 130, 149, 0.3);
  height: 1px;
`;
