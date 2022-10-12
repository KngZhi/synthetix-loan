import styled from 'styled-components';
import { useState } from 'react';

import { BaseCard } from '@/components/Base/Card';
import { FlexCol, FlexItemsCenter } from '@/components/Base/Div';
import NumericInput from '@/components/NumericInput';
import { ArrowDown } from 'react-feather';
import { sUSD, ETH, TokenInterface } from '@/constants/tokens';
import { Text12, SideText } from '@/components/Base/Text';
import ActionPanel from '@/components/ActionPanel';
import TokenSelector from '@/components/TokenSelector';

export default function MainCard() {
  const [supplyToken, setSupplyToken] = useState<TokenInterface>(ETH);
  return (
    <Container>
      <div>
        <Text12>Supply</Text12>
      </div>
      <TokenCard>
        <TokenSelector
          onClick={(token) => setSupplyToken(token)}
          activeToken={supplyToken}
          tokenList={[sUSD, ETH]}
        />
        <Balance>
          <NumericInput value="0.1" placeholder="0.00" />
          <SideText>ETH Balance: 1000</SideText>
        </Balance>
      </TokenCard>
      <IconArrow>
        <ArrowDown size={32} color="#9999AC" />
      </IconArrow>
      <ActionPanel />
    </Container>
  );
}

const Container = styled(BaseCard)`
  padding: 10px;
  min-width: 648px;
  width: 46.388889%;
  margin-top: 19px;
`;

const TokenCard = styled(BaseCard)`
  padding: 10px 8px 12px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

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
