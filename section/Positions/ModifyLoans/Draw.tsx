import ActionPanel from '@/components/ActionPanel';
import ActionButton from '@/components/ActionButton';
import { Loan } from '@/containers/Loans/types';
import useSynthetixQueries, { GasPrice } from '@synthetixio/queries';
import Wei, { wei } from '@synthetixio/wei';
import type { useActionReturn } from '@/hooks/useAction';
import type { ActionPanelProps } from '@/components/ActionPanel';
import { safeWei } from '@/utils/wei';
import { useRouter } from 'next/router';
import { calculateMaxDraw } from './helper';

interface RepayProps
  extends Pick<useActionReturn, 'actionLabel' | 'activeToken'>,
    ActionPanelProps {
  loan: Loan;
  newCRatio: Wei;
  value: string;
  gasPrice: GasPrice;
}

const Draw = ({
  loan,
  newCRatio,
  value,
  gasPrice,
  activeToken,
  actionLabel,
  onGasChange,
  onChange,
}: RepayProps) => {
  const { useSynthetixTxn, useExchangeRatesQuery } = useSynthetixQueries();
  const router = useRouter();
  const valueWei = safeWei(value);
  const exchangeRatesQuery = useExchangeRatesQuery();
  const exchangeRates = exchangeRatesQuery.data ?? null;
  const maxDraw = calculateMaxDraw(loan, exchangeRates);
  const txn = useSynthetixTxn(
    `CollateralEth`,
    `draw`,
    [Number(loan.id), valueWei.toBN()],
    gasPrice,
    {
      enabled: valueWei.gt(0),
      onSuccess: () => {
        router.push(`/position`);
      },
      onError: () => {
        console.error(`Something went wrong when repay the loan`);
      },
    },
  );

  const repay = async () => {
    txn.mutate();
  };

  return (
    <>
      <ActionPanel
        value={valueWei.gt(maxDraw) ? maxDraw.toString(2) : value}
        onGasChange={onGasChange}
        onChange={onChange}
        tokenList={[]}
        activeToken={activeToken}
        cRatio={wei(loan.cratio)}
        newCRatio={newCRatio}
        optimismLayerOneFee={txn.optimismLayerOneFee}
      />
      <ActionButton onClick={repay} msg={actionLabel} disabled={false} />
    </>
  );
};

export default Draw;
