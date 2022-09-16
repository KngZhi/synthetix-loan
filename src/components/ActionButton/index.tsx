import styled, { css } from 'styled-components';
import { Button } from '@/components/Base/Button';

type state = 'error' | 'ok' | 'unconnected';

interface State {
  disabled: boolean;
  msg: string;
  action?(): void;
  state: state;
}

type ActionButtonProps = {
  isWalletConnected: boolean;
  balanceValue: string;
  inputValue: string;
  onClick(): void;
  connect(): void;
};

const IndexButton = styled(Button)<{ state: state }>`
  width: 100%;
  height: 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
  text-transform: capitalize;

  ${({ state }) => {
    switch (state) {
      case `error`:
        return css`
          background: rgba(86, 86, 99, 0.6);
          color: #565663;
          cursor: not-allowed;
          &:hover {
            box-shadow: unset;
          }
        `;
      case `ok`:
      case `unconnected`:
        return css`
          background: linear-gradient(90deg, #85ffc4, #5cc6ff);
          color: #000;
        `;
    }
  }}
`;

export default function ActionButton({
  isWalletConnected,
  inputValue,
  balanceValue,
  onClick,
  connect,
}: ActionButtonProps): JSX.Element {
  const errorState = (msg: string): State => ({
    state: `error`,
    msg,
    disabled: false,
  });
  const actionState = (): State => {
    if (!isWalletConnected) {
      return {
        state: `unconnected`,
        msg: `Connect Wallet`,
        action: connect,
        disabled: false,
      };
    }

    if (parseFloat(balanceValue) === 0) {
      return errorState(`No sufficient balance`);
    }

    if (parseFloat(inputValue) > parseFloat(balanceValue)) {
      return errorState(`No sufficient balance`);
    }

    return {
      state: `ok`,
      msg: `Borrow`,
      action: onClick,
      disabled: false,
    };
  };
  const state = actionState();

  return (
    <IndexButton onClick={state.action} state={state.state}>
      <span>{state.msg}</span>
    </IndexButton>
  );
}
