import { sUSD, sETH, TokenInterface, ETH } from '@/constants/tokens';
import Wei, { wei } from '@synthetixio/wei';
import { BigNumber } from 'ethers';

type Asset = {
  asset: string;
  amount: BigNumber;
};

type WeiAsset = {
  asset: string;
  amount: Wei;
};

type useActionType = {
  action: string;
  value: string;
  loan: Asset;
  collateral: Asset;
};

type useActionReturn = {
  activeToken: TokenInterface;
  loan: WeiAsset;
  collateral: WeiAsset;
};

const TokenList: Record<string, TokenInterface> = {
  sUSD,
  sETH,
  ETH,
};

const safeWei = (value: string) => {
  return value ? wei(value, 18) : wei(0);
};

function useAction({
  action,
  value,
  loan,
  collateral,
}: useActionType): useActionReturn {
  let loanWei = wei(loan.amount, 18);
  let collateralWei = wei(collateral.amount, 18);
  let activeToken = TokenList[loan.asset];
  const valueWei = safeWei(value);
  switch (action) {
    case `borrow`:
      loanWei = loanWei.add(valueWei);
      break;
    case `repay`:
      loanWei = loanWei.sub(valueWei);
      break;
    case `deposit`:
      collateralWei = collateralWei.add(valueWei);
      activeToken = TokenList[collateral.asset];
      break;
    case `withdraw`:
      collateralWei = collateralWei.sub(valueWei);
      activeToken = TokenList[collateral.asset];
      break;
    default:
      loanWei = wei(0);
      break;
  }

  return {
    loan: {
      asset: loan.asset,
      amount: loanWei,
    },
    collateral: {
      asset: collateral.asset,
      amount: collateralWei,
    },
    activeToken,
  };
}

export default useAction;
