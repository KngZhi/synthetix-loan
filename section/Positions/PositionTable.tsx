import styled from 'styled-components';
import { Text12, Text, SubText } from '@/components/Base/Text';
import { FlexRowCentered, FlexCol } from '@/components/Base/Div';
import Table from '@/components/Table/ReactTable';
import { makeData } from '@/components/Table/makeData';
import { useState } from 'react';

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
  const [data, setData] = useState(() => makeData(5));
  const columns = [
    {
      accessor: `loan`,
      Cell: (props) => <Text size={14}>{`#${props.row.original.loan}`}</Text>,
      Header: <HeaderText>Loan</HeaderText>,
      width: 126,
      sortable: true,
    },
    {
      accessor: `amount`,
      Cell: ({ row }) => (
        <AmountCell
          title={`${row.original.amount}`}
          subtitle={row.original.collateral}
        />
      ),
      Header: <HeaderText>Amount</HeaderText>,
      width: 145,
      sortable: true,
    },
    {
      accessor: `cRatio`,
      Cell: (props) => <Text size={14}>234%</Text>,
      Header: <HeaderText>C-Ratio</HeaderText>,
      width: 102,
      sortable: true,
    },
    {
      accessor: `liquidationPrice`,
      Cell: ({ row }) => (
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
      Cell: (props) => (
        <InterestRate>
          0.25%
          <ManageButton>Manage</ManageButton>
        </InterestRate>
      ),
      accessor: `interestRate`,
      Header: <HeaderText>Interest Rate</HeaderText>,
      sortable: true,
      width: 245,
    },
    ,
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
