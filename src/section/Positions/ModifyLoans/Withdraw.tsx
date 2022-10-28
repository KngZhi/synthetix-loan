import { wei } from '@synthetixio/wei';
import { useRouter } from 'next/router';
import Loans from '@/containers/Loans';
import useSynthetixQueries from '@synthetixio/queries';
import { ActionProps } from './type';
import { safeWei } from '@/utils/wei';

import ActionPanel from '@/components/ActionPanel';
import ActionButton from '@/components/ActionButton';

const Withdraw: React.FC<ActionProps> = ({
  loan,
  newCRatio,
  value,
  gasPrice,
  activeToken,
  actionLabel,
  onGasChange,
  onChange,
}) => {
  const { reloadPendingWithdrawals, minCRatio } = Loans.useContainer();
  const { useSynthetixTxn } = useSynthetixQueries();
  const router = useRouter();
  const withdrawalAmount = safeWei(value);

  const withdrawTxn = useSynthetixTxn(
    `CollateralEth`,
    `withdraw`,
    [Number(loan.id), withdrawalAmount.toBN()],
    gasPrice,
    {
      enabled: !withdrawalAmount.eq(0),
      onSuccess: async () => {
        await reloadPendingWithdrawals();
        // setIsWorking('');
        // setTxModalOpen(false);
        router.push(`/position`);
      },
      onError: () => {
        // setIsWorking('');
        // setTxModalOpen(false);
      },
    },
  );

  const withdraw = async () => {
    // setIsWorking(`depositing`);
    // setTxModalOpen(true);
    withdrawTxn.mutate();
  };
  let errorMsg = ``;
  if (newCRatio.lt(minCRatio)) {
    errorMsg = `C-Ratio is too low`;
  }

  return (
    <>
      <ActionPanel
        {...{
          errorMsg,
          tokenList: [],
          onChange,
          value,
          onGasChange,
          activeToken,
          cRatio: wei(loan.cratio),
          newCRatio,
          optimismLayerOneFee: withdrawTxn.optimismLayerOneFee,
        }}
      />
      <ActionButton
        onClick={withdraw}
        msg={actionLabel}
        disabled={withdrawalAmount.eq(0) || newCRatio.lt(minCRatio)}
      />
    </>
  );
};

export default Withdraw;
