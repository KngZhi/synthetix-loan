import styled, { css } from 'styled-components';
import { Text12, Text, SubText, Text18 } from '@/components/Base/Text';
import { FlexRowCentered, FlexCol, FlexRow, Flex } from '@/components/Base/Div';
import Table from '@/components/Table/ReactTable';
import { makeData } from '@/components/Table/makeData';
import { useState } from 'react';
import { useBoolean } from 'usehooks-ts';
import { ChevronDown } from 'react-feather';

const TogglePanel = () => {
  const { value: isActive, toggle } = useBoolean(true);
  return (
    <Container active={isActive} onClick={() => toggle(!isActive)}>
      <TitlePanel>
        <FlexRowCentered>
          <Text size={20}>Loan History</Text>
          <Number>9</Number>
        </FlexRowCentered>
        <ChevronDown size={16} color={`#00D1FF`} className="down-arrow" />
      </TitlePanel>
      <ContentPanel active={isActive}>
        <PositionTable />
      </ContentPanel>
    </Container>
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

export default TogglePanel;

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

const ManageButton = styled.button`
  background: ${({ theme }) => theme.colors.greenCyan};
  width: 80px;
  height: 36px;
  color: ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  border: 1px solid #000000;
  cursor: pointer;
`;

const Container = styled(FlexCol)<{ active: boolean }>`
  border: 1px solid #2d2d38;
  background: #0b0b22;
  padding: 0 12px;

  .react-table {
    border: unset;
  }
`;

const TitlePanel = styled(FlexRowCentered)<{ active: boolean }>`
  height: 64px;
  cursor: pointer;
  padding-right: 26.7px;
  .down-arrow {
    ${({ active }) =>
      active
        ? css`
            transform: rotate(180deg);
            transition: transform 0.5s linear;
          `
        : css`
            transform: rotate(0deg);
            transition: transform 0.5s linear;
          `}
  }
`;

const Number = styled.div`
  background: #31d8a4;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  color: #000;
  text-align: center;
`;

const ContentPanel = styled.div<{ active: boolean }>`
  ${({ active }) => !active && `display: none;`}
`;
