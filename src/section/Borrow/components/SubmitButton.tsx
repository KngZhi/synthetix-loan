import Wei from '@synthetixio/wei';
import ActionButton from '@/components/ActionButton';
import useTokensBalances from '@/hooks/useTokensBalances';

type SubmitButtonProps = {
  minCollateral: Wei;
  collateral: Wei;
  debt: Wei;
  cRatio: Wei;
  safeMinCratio: Wei;
  isWalletConnected: boolean;
  onClick(): void;
};

const SubmitButton = ({
  minCollateral,
  collateral,
  debt,
  cRatio,
  isWalletConnected,
  safeMinCratio,
  onClick,
}: SubmitButtonProps) => {
  const collateralBalance = useTokensBalances();
  const hasLowCollateralAmount = collateral.lt(minCollateral);
  const hasLowCratio =
    !collateral.eq(0) && !debt.eq(0) && cRatio.lt(safeMinCratio);
  const hasInsufficientCollateral = collateralBalance.lt(minCollateral);

  const getState = () => {
    if (!isWalletConnected) {
      return {
        disabled: false,
        msg: `Connect Wallet`,
        onClick,
      };
    }

    if (hasLowCollateralAmount) {
      return {
        disabled: true,
        msg: `MINIMUM COLLATERAL IS ${minCollateral.toString(2)}`,
        onClick,
      };
    }

    if (hasLowCratio) {
      return {
        disabled: true,
        msg: `C-RATIO TOO LOW`,
        onClick,
      };
    }

    if (hasInsufficientCollateral) {
      return {
        disabled: true,
        msg: `Insufficient Collateral To Borrow`,
        onClick,
      };
    }

    return {
      msg: `Borrow`,
      disabled: false,
      onClick,
    };
  };

  return <ActionButton {...getState()} />;
};

export default SubmitButton;
