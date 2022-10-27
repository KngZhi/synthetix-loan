import ActionPanel from '@/components/ActionPanel';
import ActionButton from '@/components/ActionButton';
import { Loan } from '@/containers/Loans/types';
import useSynthetixQueries, { GasPrice } from '@synthetixio/queries';
import Wei, { wei } from '@synthetixio/wei';
import Connector from '@/containers/connector';
import type { useActionReturn } from '@/hooks/useAction';
import type { ActionPanelProps } from '@/components/ActionPanel';
import { safeWei } from '@/utils/wei';
import { useRouter } from 'next/router';

interface RepayProps
  extends Pick<useActionReturn, 'actionLabel' | 'activeToken'>,
    ActionPanelProps {
  loan: Loan;
  newCRatio: Wei;
  value: string;
  gasPrice: GasPrice;
}

const Repay = ({
  loan,
  newCRatio,
  value,
  gasPrice,
  activeToken,
  actionLabel,
  onGasChange,
  onChange,
}: RepayProps) => {
  const { useSynthetixTxn } = useSynthetixQueries();
  const router = useRouter();
  const { walletAddress } = Connector.useContainer();
  const valueWei = safeWei(value);
  const txn = useSynthetixTxn(
    `CollateralEth`,
    `repay`,
    [walletAddress, Number(loan.id), valueWei.toBN()],
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
  let submitDisabled = false;
  let errorMsg = undefined;

  if (valueWei.gt(loan.amount)) {
    submitDisabled = true;
    errorMsg = `consider closing the loan instead of full repayment`;
  }

  return (
    <>
      <ActionPanel
        errorMsg={errorMsg}
        value={value}
        onGasChange={onGasChange}
        onChange={onChange}
        tokenList={[]}
        activeToken={activeToken}
        cRatio={wei(loan.cratio)}
        newCRatio={newCRatio}
        optimismLayerOneFee={txn.optimismLayerOneFee}
      />
      <ActionButton
        onClick={repay}
        msg={actionLabel}
        disabled={submitDisabled}
      />
    </>
  );
};

export default Repay;
