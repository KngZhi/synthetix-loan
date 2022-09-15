import styled from 'styled-components';

export const Text = styled.span`
  font-family: ${({ theme }) => theme.fonts.inter};
`;

export const Text12 = styled(Text)`
  font-weight: 400;
  font-size: 12px;
`;

export const Text16 = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;

export const Text24 = styled(Text)`
  font-size: 24px;
  font-weight: 700;
`;

export const Text30 = styled(Text)`
  font-size: 30px;
  font-weight: 700;
`;

export const SideText = styled(Text12)`
  color: ${({ theme }) => theme.colors.whiteAlpha700};
`;
