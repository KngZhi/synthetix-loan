import styled from 'styled-components';
import { BaseCard } from '@/components/Base/Card';
import { Text } from '@/components/Base/Text';
import { DefaultDropdownMenu } from '@/components/Dropdown';
import { ChevronDown } from 'react-feather';
import { FlexRowCentered, FlexCenter } from '@/components/Base/Div';
import ActionPanel from '@/components/ActionPanel';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { loanState } from '@/store/loan';
import { sUSD, sETH, TokenInterface, ETH } from '@/constants/tokens';
import useCalcLoanCRatio from '@/hooks/useCalcLoanCRatio';
import { GasPrice } from '@synthetixio/queries';
import useSynthetixQueries from '@synthetixio/queries';
import Wei, { wei } from '@synthetixio/wei';
import { calculateLoanCRatio } from '@/components/ActionPanel/utils';
import generateWei from '@/utils/wei';
import { formatPercent } from '@/utils/formatters/number';

const TokenList: Record<string, TokenInterface> = {
  sUSD,
  sETH,
  ETH,
};

const ActionCard = () => {
  const actions = [`borrow`, `repay`, `deposit`, `withdraw`, `close`];
  const [action, setAction] = useState<string>(``);
  const [loan] = useRecoilState(loanState);
  const activeToken = TokenList[loan.currency];
  const [value, setValue] = useState<string>(``);
  const [gasPrice, setGasPrice] = useState<GasPrice | undefined>();
  const { useExchangeRatesQuery } = useSynthetixQueries();
  const exchangeRatesQuery = useExchangeRatesQuery();
  const exchangeRates = exchangeRatesQuery.data || null;
  const collateral = generateWei(wei(loan.collateral), loan.collateralAsset);
  const debtWei = generateWei(value, activeToken);
  const totalDebt = wei(loan.amount.add(debtWei.amount.toBN()));

  const newCRatio = value
    ? calculateLoanCRatio(exchangeRates, collateral, {
        amount: totalDebt,
        asset: loan.currency,
      })
    : wei(0);

  return (
    <Container>
      <Text size={20} fontWeight={700}>
        What do you want to do
      </Text>
      <DefaultDropdownMenu
        className="dropdown"
        trigger={
          <Select>
            <span>{action || `Select an action`}</span>
            <ChevronDown size={14} />
          </Select>
        }
        offset={55}
        dropdownCls="dropdownContainer"
        dropList={
          <DropdownList>
            {actions.map((action) => (
              <Option onClick={() => setAction(action)}>
                <Text size={18}>{action}</Text>
              </Option>
            ))}
          </DropdownList>
        }
      />
      {action && (
        <>
          <SubHeader gap={5}>
            <Text fontWeight={700}>{action}</Text>
          </SubHeader>
          <ActionPanel
            cRatio={wei(loan.cratio)}
            optimismLayerOneFee={wei(0)}
            onGasChange={setGasPrice}
            tokenList={[]}
            value={value}
            activeToken={activeToken}
            onChange={setValue}
            newCRatio={newCRatio}
          />
        </>
      )}
    </Container>
  );
};

const Select = styled(FlexRowCentered)`
  border: 1px solid #424251;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: normal;
  cursor: pointer;
  text-transform: capitalize;
`;

const Option = styled.div`
  padding: 10px 16px;
  text-transform: capitalize;

  &:hover {
    background: ${({ theme }) => theme.colors.bgWhiteAlpha};
  }
  cursor: pointer;
  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }
`;

const Container = styled(BaseCard)`
  padding: 10px;
  min-width: 553px;
  height: 100%;
  .dropdown {
    margin-top: 10px;
  }
  .dropdownContainer {
    width: 100%;
  }
`;

const DropdownList = styled(BaseCard)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubHeader = styled(FlexCenter)`
  margin-top: 21px;
`;

export default ActionCard;
