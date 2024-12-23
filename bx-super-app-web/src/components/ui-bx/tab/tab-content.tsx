import { FC, useRef } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

type TabContentPropsTypes = {
  activeTabId: number;
  tabId: number;
  willMount?: boolean;
};

const duration = 150;

const TabContent: FC<TabContentPropsTypes> = ({
  children,
  activeTabId,
  tabId,
  // willMount,
}) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  return (
    <Transition
      nodeRef={nodeRef}
      timeout={duration}
      in={activeTabId === tabId}
      mountOnEnter
      unmountOnExit
    >
      {(status) => {
        return (
          <TabPanel status={status} role='tabpanel'>
            {children}
          </TabPanel>
        );
      }}
    </Transition>
  );
};

type TabPanelProps = {
  status?: string;
};

const TabPanel = styled.div<TabPanelProps>`
  transition: opacity 0.15s linear;
  display: ${(props) => {
    switch (props.status) {
      case 'entering':
        return 'block';
      case 'entered':
        return 'block';
      case 'exiting':
        return 'none';
      case 'exited':
        return 'none';
    }
  }};
  opacity: ${(props) => {
    switch (props.status) {
      case 'entering':
        return '0';
      case 'entered':
        return '1';
      case 'exiting':
        return '0';
      case 'exited':
        return '0';
    }
  }};
`;

export default TabContent;
