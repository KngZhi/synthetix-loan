import styled from 'styled-components';
import { BaseCard } from '@/components/Base/Card';
import { Text } from '@/components/Base/Text';
import { DefaultDropdownMenu } from '@/components/Dropdown';
import { ChevronDown } from 'react-feather';
import { FlexRowCentered, FlexCenter } from '@/components/Base/Div';
import { InfoTooltip } from '@/components/Tooltip';
import ActionPanel from '@/components/ActionPanel';

const ActionCard = () => {
  const actions = [`borrow`, `repay`, `deposit`, `withdraw`, `close`];
  return (
    <Container>
      <Text size={20} fontWeight={700}>
        What do you want to do
      </Text>
      <DefaultDropdownMenu
        className="dropdown"
        trigger={
          <Select>
            <span>Select an action</span>
            <ChevronDown size={14} />
          </Select>
        }
        offset={55}
        dropdownCls="dropdownContainer"
        dropList={
          <DropdownList>
            {actions.map((action) => (
              <Option>
                <Text size={18}>{action}</Text>
              </Option>
            ))}
          </DropdownList>
        }
      />
      <SubHeader gap={5}>
        <Text fontWeight={700}>Borrow</Text>
        <InfoTooltip content="hello world" />
      </SubHeader>
      <ActionPanel />
    </Container>
  );
};

const Select = styled(FlexRowCentered)`
  border: 1px solid #424251;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: normal;
  cursor: pointer;
`;

const Option = styled.div`
  padding: 10px 16px;
  text-transform: capitalize;

  &:hover {
    background: ${({ theme }) => theme.colors.bgWhiteAlpha};
  }
  cursor: pointer;
  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }
`;

const Container = styled(BaseCard)`
  padding: 10px;
  min-width: 553px;
  height: 100%;
  .dropdown {
    margin-top: 10px;
  }
  .dropdownContainer {
    width: 100%;
  }
`;

const DropdownList = styled(BaseCard)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubHeader = styled(FlexCenter)`
  margin-top: 21px;
`;

export default ActionCard;
