import Head from 'next/head';
import Layout from '@/components/layout';
import { Text30, Text16, Text12, SideText } from '@/components/Base/Text';
import { BaseCard } from '@/components/Base/Card';
import styled from 'styled-components';
import { Flex, FlexCol, FlexItemsCenter, FlexRow } from '@/components/Base/Div';
import NumericInput from '@/components/NumericInput';
import { ArrowDownCircle, ArrowDown } from 'react-feather';
import ActionButton from '@/components/ActionButton';
import Slider from '@/components/Slider';

const MainCard = styled(BaseCard)`
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

const CoinSelector = styled(Flex)`
  align-items: center;
  gap: 5px;
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

export default function Home() {
  return (
    <div>
      <Head>
        <title>Synthetic Loans</title>
        <meta name="description" content="Borrow Synths using other assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Text30>Borrow</Text30>
        <MainCard>
          <div>
            <Text12>Supply</Text12>
          </div>
          <TokenCard>
            <CoinSelector>ETH</CoinSelector>
            <Balance>
              <NumericInput value="0.1" placeholder="0.00" />
              <SideText>ETH Balance: 1000</SideText>
            </Balance>
          </TokenCard>
          <IconArrow>
            <ArrowDown size={32} color="#9999AC" />
          </IconArrow>
          <TokenCard>
            <CoinSelector>ETH</CoinSelector>
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
            <RatioRow
              lText="Gas Price(GWEI)"
              rText="Tx Cost: 0.0009 E ≠ $8.00"
            />
          </InfoCard>

          <ActionButton />
        </MainCard>
      </Layout>
    </div>
  );
}
