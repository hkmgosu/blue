import { FC } from 'react';
import styled from 'styled-components';

type TabNavItemProps = {
  handleChangeTabId: () => void;
  disabled?: boolean;
};

const TabNavItem: FC<TabNavItemProps> = ({
  children,
  handleChangeTabId,
  disabled,
}) => {
  return (
    <Item role='tablist' disabled={disabled}>
      <Button onClick={handleChangeTabId} disabled={disabled}>
        {children}
      </Button>
    </Item>
  );
};

type ItemProps = {
  disabled?: boolean;
};

const Item = styled.div<ItemProps>`
  display: flex;
  flex: 1;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  ${(props) => (props.disabled ? 'opacity: 0.6;' : '')}
`;

const Button = styled.button`
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  border: none;
  background-color: var(--bx-fg);
  color: var(--bx-bg);
  width: 100%;
`;

export default TabNavItem;
