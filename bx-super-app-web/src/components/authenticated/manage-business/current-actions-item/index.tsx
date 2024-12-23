import { ReactNode } from 'react';
import { BxAddPeople, BxPersonCircle } from '@bx-design/react-icons';

import { Button } from 'components/ui-bx/button';
import styles from './styles.module.scss';

type Props = {
  icon: 'INVITE' | 'ASSIGN';
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

const iconList: Record<'INVITE' | 'ASSIGN', ReactNode> = {
  INVITE: <BxAddPeople />,
  ASSIGN: <BxPersonCircle />,
};

export default function ManageBusinessCurrentActionsItem({
  icon,
  title,
  description,
  buttonText,
  onClick,
}: Props): JSX.Element {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.IconBox}>{iconList[icon]}</div>
      <div className={styles.Content}>
        <div className={styles.Title}>{title}</div>
        <div className={styles.Description}>{description}</div>
        <div className={styles.ButtonBox}>
          <Button onClick={onClick}>{buttonText}</Button>
        </div>
      </div>
    </div>
  );
}
