import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout';
import Head from 'next/head';
import { Title, Text } from '@/components/Base/Text';
import {
  Flex,
  FlexColCentered,
  FlexCol,
  FlexCenter,
  FlexRowCentered,
  FlexRow,
} from '@/components/Base/Div';
import {
  DualCurrencyIcon,
  CurrencyIcon,
} from '@/components/Currency/CurrencyIcon';
import { BaseCard } from '@/components/Base/Card';
import { InfoTooltip } from '@/components/Tooltip';
import ActionHistory from '@/sections/Positions/ActionHistory';

const Cell = ({
  width = `100%`,
  title,
  content,
  toolTipContent,
  html,
}: {
  width?: string;
  title: string;
  content?: string;
  toolTipContent: string;
  html?: JSX.Element;
}) => {
  return (
    <Col width={width}>
      <FlexCenter gap={5}>
        <Text size={12} color="#9999AC">
          {title}
        </Text>
        <InfoTooltip content={toolTipContent} />
      </FlexCenter>
      {html ? (
        <FlexCenter gap={8}>{html}</FlexCenter>
      ) : (
        <Text size={20} color="white" fontWeight={700}>
          {content}
        </Text>
      )}
    </Col>
  );
};

export default function PostPage() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Head>
        <title>Loan #{id}</title>
      </Head>
      <Layout>
        <Header>
          <DualCurrencyIcon
            sizes={40}
            leftCurrencyKey="sUSD"
            rightCurrencyKey="sETH"
          />
          <Title> Loan #{id}</Title>
        </Header>
        <FlexRow>
          <FlexCol gap={19}>
            <LoanDetail>
              <Row>
                <Cell
                  width="50%"
                  toolTipContent="Hello World"
                  title="Loan"
                  html={
                    <>
                      <CurrencyIcon currencyKey="sUSD" sizes={24} />
                      <Text size={20} color="white">
                        68 sUSD
                      </Text>
                    </>
                  }
                />
                <Cell
                  width="50%"
                  toolTipContent="hello world"
                  title="Collateral"
                  html={
                    <>
                      <CurrencyIcon currencyKey="sUSD" sizes={24} />
                      <Text size={20} color="white">
                        68 sUSD
                      </Text>
                    </>
                  }
                />
              </Row>
              <Line />
              <Row>
                <Cell
                  title="C-Ratio"
                  toolTipContent="hello world"
                  html={
                    <FlexRowCentered gap={5}>
                      <Text size={20} color="white">
                        234%
                      </Text>
                      <CRatioSign>Good</CRatioSign>
                    </FlexRowCentered>
                  }
                />
              </Row>
              <Line />
              <Row>
                <Cell
                  width="33.3%"
                  title="ETH Price"
                  toolTipContent="hello world"
                  content="$4200"
                />
                <Cell
                  width="33.3%"
                  title="Liquidation Price"
                  toolTipContent="hello world"
                  content="$690"
                />
                <Cell
                  width="33.3%"
                  title="Interest Rate"
                  toolTipContent="hello world"
                  content="0.25%"
                />
              </Row>
            </LoanDetail>
            <ActionHistory />
          </FlexCol>
          <div>Hello world</div>
        </FlexRow>
      </Layout>
    </>
  );
}

const Header = styled(Flex)`
  gap: 14px;
`;

const LoanDetail = styled(BaseCard)`
  width: 553px;
  padding: 20px 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  height: 1px;
  background-color: rgba(130, 130, 149, 0.3);
`;

const Row = styled(Flex)`
  height: 45px;
  align-items: center;
`;

const Col = styled(FlexCol)<{ width?: string }>`
  width: ${({ width }) => width || `100%`};
  gap: 5px;
`;

const CRatioSign = styled(FlexRowCentered)`
  font-size: 12px;
  color: white;
  padding: 0 8px;
  background-color: #34edb3;
  border-radius: 4px;
  height: 16px;
`;

const Container = styled(FlexRow)``;
