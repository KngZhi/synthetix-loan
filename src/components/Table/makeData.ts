import { faker } from '@faker-js/faker';

export type Person = {
  loan: number;
  amount: number;
  cRatio: number;
  liquidationPrice: number;
  interestRate: string;
  collateral: number;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    loan: faker.datatype.number(3000),
    amount: faker.datatype.number(40),
    collateral: faker.datatype.number(10),
    cRatio: faker.datatype.number(1000),
    liquidationPrice: faker.datatype.number(100),
    interestRate: `0.25%`,
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}
