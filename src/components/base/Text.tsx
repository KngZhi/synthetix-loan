import styled from 'styled-components';

export const Text = styled.span<{ color?: string }>`
  font-family: ${({ theme }) => theme.fonts.inter};
  color: ${({ color, theme }) => color || theme.colors.white};
`;

export const Text12 = styled(Text)<{ color?: string }>`
  font-weight: 700;
  font-size: 12px;
  color: ${(props) => props.color || props.theme.colors.white};
`;

export const Text16 = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;

export const Text18 = styled(Text)`
  font-size: 18px;
  font-weight: 700;
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
