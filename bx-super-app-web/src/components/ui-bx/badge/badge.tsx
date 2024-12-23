import { FC } from 'react';
import styled from 'styled-components';

export type BadgeProps = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
  size?: 'small' | 'normal' | 'big';
  rounded?: boolean;
};

const Badge: FC<BadgeProps> = ({
  variant,
  rounded,
  children,
  size = 'normal',
}) => (
  <BadgeComponent variant={variant} rounded={rounded} size={size}>
    {children}
  </BadgeComponent>
);

type BadgeComponentProps = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
  size?: 'small' | 'normal' | 'big';
  rounded?: boolean;
};

const BadgeComponent = styled.span<BadgeComponentProps>`
  display: inline-block;
  padding: 0.35em 0.65em;

  ${(props) => {
    switch (props.size) {
      case 'small':
        return 'font-size: 0.5em;';
      case 'normal':
        return 'font-size: 0.75em;';
      case 'big':
        return 'font-size: 1em;';
    }
  }}
  font-weight: 700;
  line-height: 1;
  color: var(--bx-color-white);
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  ${(props) => {
    switch (props.variant) {
      case 'dark':
        return 'background-color: var(--bx-color-dark);';
      case 'secondary':
        return 'background-color: var(--bx-color-secondary);';
      case 'primary':
        return 'background-color: var(--bx-color-orange);';
      case 'success':
        return 'background-color: var(--bx-color-green-future);';
      case 'info':
        return 'background-color: var(--bx-color-lblue);';
      case 'warning':
        return 'background-color: var(--bx-color-lorange);';
      case 'danger':
        return 'background-color: var(--bx-color-red-medium);';
    }
  }}
  ${(props) => (props.rounded ? 'border-radius: 50rem' : '')}
`;

export default Badge;
