import Head from 'next/head';
import Layout from '@/components/layout';
import { Text30, Text12, SideText } from '@/components/Base/Text';
import { BaseCard } from '@/components/Base/Card';
import styled from 'styled-components';
import { Flex, FlexCol, FlexItemsCenter } from '@/components/Base/Div';
import NumericInput from '@/components/NumericInput';
import { ArrowDown, ChevronDown } from 'react-feather';
import type { TokenInterface } from '@/constants/tokens';
import { sUSD, ETH } from '@/constants/tokens';
import Image from 'next/image';
import { Text18 } from '@/components/Base/Text';
import { DefaultDropdownMenu } from '@/components/Dropdown';
import ActionPanel from '@/components/ActionPanel';

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
            <TokenSelector token={sUSD} />
            <Balance>
              <NumericInput value="0.1" placeholder="0.00" />
              <SideText>ETH Balance: 1000</SideText>
            </Balance>
          </TokenCard>
          <IconArrow>
            <ArrowDown size={32} color="#9999AC" />
          </IconArrow>
          <ActionPanel />
        </MainCard>
      </Layout>
    </div>
  );
}
