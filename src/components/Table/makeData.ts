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

const action = () => {
  return {
    type: `deposit`,
    amount: faker.datatype.float(1),
    date: faker.datatype.datetime().toDateString(),
  };
};

export function makeData(func, number = 5) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = number;
    return range(len).map((d): Person => {
      return {
        ...func(),
      };
    });
  };
  console.log(makeDataLevel());

  return makeDataLevel();
}

export function makePerson() {
  return makeData(newPerson, 5);
}

export function makeActions(number = 5) {
  return makeData(action, number);
}
