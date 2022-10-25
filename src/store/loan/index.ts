import { Loan } from '@/containers/Loans/types';
import { atom } from 'recoil';

export const loanState = atom<Loan>({
  key: `loan`,
  default: {},
});
