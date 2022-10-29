import Wei from '@synthetixio/wei';
import ActionButton from '@/components/ActionButton';
import useTokensBalances from '@/hooks/useTokensBalances';

type SubmitButtonProps = {
  isWalletConnected: boolean;
  onClick(): void;
  disabled: boolean;
};

const SubmitButton = ({
  isWalletConnected,
  onClick,
  disabled,
}: SubmitButtonProps) => {
  const getState = () => {
    if (!isWalletConnected) {
      return {
        disabled: false,
        msg: `Connect Wallet`,
        onClick,
      };
    }

    return {
      msg: `Borrow`,
      disabled: disabled,
      onClick,
    };
  };

  return <ActionButton {...getState()} />;
};

export default SubmitButton;
