import styled, { css } from 'styled-components';

export const Flex = styled.div`
  display: flex;
`;

export const FlexCenter = styled(Flex)`
  align-items: center;
`;

export const FlexCol = styled(Flex)`
  flex-direction: column;
`;

export const FlexColCentered = styled(FlexCol)`
  align-items: center;
`;

export const FlexRow = styled(Flex)`
  justify-content: space-between;
`;

export const FlexRowCentered = styled(FlexRow)`
  align-items: center;
`;

export const FlexJustifyCenter = styled(Flex)`
  justify-content: center;
`;

export const FlexJustifyEnd = styled(Flex)`
  justify-content: flex-end;
`;

export const FlexItemsCenter = styled(Flex)`
  align-items: center;
`;
