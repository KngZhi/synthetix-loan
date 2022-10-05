import styled from 'styled-components';
import { Text12, Text, SubText } from '@/components/Base/Text';
import { FlexRowCentered, FlexCol } from '@/components/Base/Div';
import Table from '@/components/Table/ReactTable';
import { makeData, makePerson } from '@/components/Table/makeData';
import { useState } from 'react';
import Link from 'next/link';

const HeaderText = styled(Text12)`
  color: ${({ theme }) => theme.colors.gray700};
  margin-right: 10.81px;
`;

const InterestRate = styled(FlexRowCentered)`
  width: 100%;
`;

const AmountCell = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <FlexCol>
      <Text size={14}>{title}</Text>
      <SubText>{subtitle}</SubText>
    </FlexCol>
  );
};

const PositionTable = (): JSX.Element => {
  const [data, setData] = useState(() => makePerson());
  const columns = [
    {
      accessor: `loan`,
      Cell: (props: any) => (
        <Text size={14}>{`#${props.row.original.loan}`}</Text>
      ),
      Header: <HeaderText>Loan</HeaderText>,
      width: 126,
      sortable: true,
    },
    {
      accessor: `amount`,
      Cell: ({ row }: any) => (
        <AmountCell
          title={`${row.original.amount} sUSD`}
          subtitle={`Collateral: ${row.original.collateral} sMKR`}
        />
      ),
      Header: <HeaderText>Amount</HeaderText>,
      width: 145,
      sortable: true,
    },
    {
      accessor: `cRatio`,
      Cell: (props: any) => <Text size={14}>234%</Text>,
      Header: <HeaderText>C-Ratio</HeaderText>,
      width: 102,
      sortable: true,
    },
    {
      accessor: `liquidationPrice`,
      Cell: ({ row }: any) => (
        <AmountCell
          title={row.original.liquidationPrice}
          subtitle={`ETH Price: $4200`}
        />
      ),
      Header: <HeaderText>Liquidation Price</HeaderText>,
      width: 145,
      sortable: true,
    },
    {
      Cell: (props: any) => (
        <InterestRate>
          0.25%
          <ManageButton>
            <Link href={`/loan/${props.row.original.loan}`}>Manage</Link>
          </ManageButton>
        </InterestRate>
      ),
      accessor: `interestRate`,
      Header: <HeaderText>Interest Rate</HeaderText>,
      sortable: true,
      width: 245,
    },
  ];

  return <Table columns={columns} data={data} />;
};

export default PositionTable;

const ManageButton = styled.button`
  background: ${({ theme }) => theme.colors.greenCyan};
  width: 80px;
  height: 36px;
  color: ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  border: 1px solid #000000;
  cursor: pointer;
`;
