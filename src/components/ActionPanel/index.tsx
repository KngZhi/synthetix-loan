import Wei from '@synthetixio/wei';
import { GasPrice } from '@synthetixio/queries';
import { Text16 } from '@/components/Base/Text';
import { BaseCard } from '@/components/Base/Card';
import styled from 'styled-components';
import { FlexCol, FlexRow } from '@/components/Base/Div';
import NumericInput from '@/components/NumericInput';
import { sUSD, sETH, TokenInterface, ETH } from '@/constants/tokens';
import TokenSelector from '@/components/TokenSelector';
import Loans from '@/containers/Loans';
import Connector from '@/containers/connector';
import { formatPercent } from '@/utils/formatters/number';
import Balance from '@/components/Balance';
import GasPriceDisplay from './GasPriceDisplay';
import useGasPrice from '@/hooks/useGasPrice';
import { useEffect } from 'react';
import { ArrowRight } from 'react-feather';
import { Flex } from '@/components/Base/Div';

type ActionPanelProps = {
  activeToken: TokenInterface;
  value: string;
  cRatio: Wei;
  newCRatio?: Wei;
  onChange: (value: string) => void;
  onClick?: (token: TokenInterface) => void;
  optimismLayerOneFee: Wei | null;
  onGasChange(gas: GasPrice | undefined): void;
  tokenList?: TokenInterface[];
};

const ActionPanel = ({
  onChange,
  activeToken,
  onClick,
  value,
  cRatio,
  optimismLayerOneFee,
  onGasChange,
  tokenList = [sUSD, sETH],
  newCRatio,
}: ActionPanelProps) => {
  const { isL2 } = Connector.useContainer();
  const { issueFeeRate, interestRate, minCRatio } = Loans.useContainer();
  const gasPrice = useGasPrice();

  useEffect(() => {
    onGasChange(gasPrice);
  }, [gasPrice, onGasChange]);

  return (
    <>
      <TokenCard>
        <TokenSelector
          onClick={onClick}
          activeToken={activeToken}
          tokenList={tokenList}
        />
        <BalanceContainer>
          <NumericInput onChange={onChange} value={value} placeholder="0.00" />
          <Balance asset={activeToken.name} />
        </BalanceContainer>
      </TokenCard>
      <InfoCard>
        <RatioRow
          lText="C-Ratio"
          rText={
            <CRatio
              cRatio={cRatio}
              minCRatio={minCRatio}
              newCRatio={newCRatio}
            />
          }
        />
        <RatioRow lText="Min C-Ratio" rText={formatPercent(minCRatio)} />
        <SeparateLine />
        <RatioRow lText="Borrow APY" rText={formatPercent(interestRate)} />
        <RatioRow lText="Issuance Fee" rText={formatPercent(issueFeeRate)} />
        <SeparateLine />
        <RatioRow
          lText="Gas Price(GWEI)"
          rText={
            <GasPriceDisplay
              isL2={isL2}
              gasPrice={gasPrice}
              optimismLayerOneFee={optimismLayerOneFee}
            />
          }
        />
      </InfoCard>
    </>
  );
};

type CRatioProps = {
  cRatio: Wei;
  minCRatio: Wei;
  newCRatio?: Wei;
};

const CRatio = ({ cRatio, minCRatio, newCRatio }: CRatioProps) => {
  if (cRatio.eq(0)) return <Text16>-</Text16>;

  const isHealthy = cRatio.gt(minCRatio);

  return (
    <CRatioContainer>
      <Text16 color={isHealthy ? `#34EDB3` : `rgb(255, 30, 57)`}>
        {formatPercent(cRatio)}
      </Text16>
      {newCRatio && newCRatio.gt(0) && (
        <>
          <ArrowRight size={16} />
          <Text16
            color={newCRatio.gt(minCRatio) ? `#34EDB3` : `rgb(255, 30, 57)`}
          >
            {formatPercent(newCRatio)}
          </Text16>
        </>
      )}
    </CRatioContainer>
  );
};

export default ActionPanel;

const CRatioContainer = styled(Flex)`
  align-items: center;
`;

const TokenCard = styled(BaseCard)`
  padding: 10px 8px 12px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BalanceContainer = styled(FlexCol)`
  align-items: flex-end;
`;

type RatioRowProps = {
  lText: string | JSX.Element;
  rText: string | JSX.Element;
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
