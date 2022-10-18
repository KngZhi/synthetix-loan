import styled from 'styled-components';
import Wei, { wei } from '@synthetixio/wei';
import { useState } from 'react';

import { BaseCard } from '@/components/Base/Card';
import { FlexCol, FlexItemsCenter } from '@/components/Base/Div';
import NumericInput from '@/components/NumericInput';
import { ArrowDown } from 'react-feather';
import { sUSD, ETH } from '@/constants/tokens';
import type { TokenInterface } from '@/constants/tokens';
import { Text12 } from '@/components/Base/Text';
import ActionPanel from '@/components/ActionPanel';
import TokenSelector from '@/components/TokenSelector';
import useSynthetixQueries, { GasPrice } from '@synthetixio/queries';
import { getETHToken } from '@/contracts/ethToken';
import Connector from '@/containers/connector/Connector';
import Balance from '@/components/Balance';
import { calculateLoanCRatio } from '@/components/ActionPanel/utils';
import { parseSafeWei } from '@/utils/parse';
import { formatPercent } from '@/utils/formatters/number';
import Loans from '@/containers/Loans';
import { getSafeMinCRatioBuffer } from './utils';
import { ethers } from 'ethers';

const generateWei = (
  value: string,
  token: TokenInterface,
): { amount: Wei; asset: string } => {
  const amount = value ? wei(value, token.decimals) : wei(0);
  return {
    amount,
    asset: token.name,
  };
};

export default function MainCard() {
  const { network } = Connector.useContainer();
  const { minCRatio } = Loans.useContainer();
  const [collateralToken, setCollateralToken] = useState<TokenInterface>(ETH);
  const [debtToken, setDebtToken] = useState<TokenInterface>(sUSD);
  const [collateralInput, setCollateralInput] = useState<string>(``);
  const [debtInput, setDebtInput] = useState<string>(``);
  const [gasPrice, setGasPrice] = useState<GasPrice | undefined>();
  const { useExchangeRatesQuery, useSynthetixTxn } = useSynthetixQueries();
  const exchangeRatesQuery = useExchangeRatesQuery();
  const exchangeRates = exchangeRatesQuery.data || null;
  const collateralWei = generateWei(collateralInput, collateralToken);
  const debtWei = generateWei(debtInput, debtToken);
  const cRatio = calculateLoanCRatio(exchangeRates, collateralWei, debtWei);
  const safeMinCratio = minCRatio
    ? minCRatio.add(getSafeMinCRatioBuffer(debtWei.asset, collateralWei.asset))
    : wei(0);

  const openTxn = useSynthetixTxn(
    `CollateralEth`,
    `open`,
    [debtWei.amount.toBN(), ethers.utils.formatBytes32String(debtWei.asset)],
    {
      ...gasPrice,
      value: collateralWei.amount.toBN(),
    },
  );
  const onSubmit = () => {
    if (!openTxn) return;
    openTxn.mutate();
  };
  return (
    <Container>
      <div>
        <Text12>Supply</Text12>
      </div>
      <TokenCard>
        <TokenSelector
          onClick={setCollateralToken}
          activeToken={collateralToken}
          tokenList={[sUSD, ETH]}
        />
        <BalanceContainer>
          <NumericInput
            value={collateralInput}
            placeholder="0.00"
            onChange={setCollateralInput}
          />
          <Balance
            asset="ETH"
            onSetMaxAmount={(value) => setCollateralInput(value)}
          />
        </BalanceContainer>
      </TokenCard>
      <IconArrow>
        <ArrowDown size={32} color="#9999AC" />
      </IconArrow>
      <ActionPanel
        onGasChange={setGasPrice}
        optimismLayerOneFee={openTxn.optimismLayerOneFee}
        onSubmit={onSubmit}
        cRatio={formatPercent(cRatio)}
        value={debtInput}
        activeToken={debtToken}
        onClick={setDebtToken}
        onChange={setDebtInput}
      />
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

const BalanceContainer = styled(FlexCol)`
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
