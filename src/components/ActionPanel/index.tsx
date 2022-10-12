import { Text16, Text12, SideText } from '@/components/Base/Text';
import { BaseCard } from '@/components/Base/Card';
import styled from 'styled-components';
import { FlexCol, FlexRow } from '@/components/Base/Div';
import NumericInput from '@/components/NumericInput';
// import ActionButton from '@/components/ActionButton';
import Slider from '@/components/Slider';
import type { TokenInterface } from '@/constants/tokens';
import { sUSD, ETH } from '@/constants/tokens';
import TokenSelector from '@/components/TokenSelector';

const ActionPanel = () => {
  return (
    <>
      {` `}
      <TokenCard>
        <TokenSelector activeToken={sUSD} tokenList={[sUSD, ETH]} />
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
      {/* <ActionButton /> */}
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

const Balance = styled(FlexCol)`
  align-items: flex-end;
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
