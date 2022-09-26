import styled from 'styled-components';
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layout';
import PositionTable from '@/sections/Positions/PositionTable';
import { Title } from '@/components/Base/Text';
import { FlexCol, FlexRow } from '@/components/Base/Div';

const PositionPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Position</title>
      </Head>
      <Layout>
        <Title>Position</Title>
        <Container>
          <LeftPanel>
            <PositionTable />
            <div>Loan History</div>
          </LeftPanel>
          <RightPanel>Pending WidthDraw</RightPanel>
        </Container>
      </Layout>
    </>
  );
};

export default PositionPage;

const LeftPanel = styled(FlexCol)`
  width: 784px;
  gap: 21px;
`;
const RightPanel = styled.div`
  width: 322px;
`;
const Container = styled(FlexRow)``;
