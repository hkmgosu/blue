/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { BxChevronRight, BxPackage } from '@bx-design/react-icons';
import cx from 'clsx';
import s from './styles.module.scss';
import { useAuth } from 'contexts/auth-context';
import { withProblems } from 'atoms/macrostate-filter';
import { useAtom } from 'jotai';

export default function MonitoringPanelIssueBox(): JSX.Element {
  const [problems] = useAtom(withProblems);
  const { user } = useAuth();

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <a className={cx(s.flex, s.a)}>
          <div
            className={cx(s.headerIcon, {
              [s.headerIconWithIssues]: problems && problems > 0,
            })}
          >
            <BxPackage />
          </div>
          <div
            className={cx(s.headerText, {
              [s.headerTextWithIssues]: problems && problems > 0,
            })}
          >
            Problemas con envío
          </div>
        </a>
      </header>
      <div className={s.body}>
        <div
          className={cx(s.bodyText, {
            [s.bodyWithIssues]: problems && problems > 0,
          })}
        >
          {problems}
        </div>
      </div>
      <footer
        className={cx(s.footer, {
          [s.footerWithIssues]: problems && problems > 0,
        })}
      >
        <div className={s.footerText}>
          <a
            href={
              'https://solution-problem.blue.cl/?currentAccount=' +
              user?.pymes[0]?.billing_information.current_account
            }
            rel='noreferrer'
            target='_blank'
            className={s.textLink}
          >
            Ver Detalle <BxChevronRight />
          </a>
        </div>
      </footer>
    </div>
  );
}
