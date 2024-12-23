import { FC } from 'react';
import styles from './suggestions.module.scss';

const Suggestions: FC = () => {
  const handleClick = (): void => {
    let survey = document.createElement('script');
    survey.src =
      'https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd3DxNACUv8ZWky8jyudPAzSKDHfdRfdCNUOV8rFjfecQ.js';
    survey.setAttribute('data-id', 'smcx-sdk');
    survey.setAttribute('id', 'smcx-sdk');
    document.body.appendChild(survey);
    document.cookie =
      'smcx_0_last_shown_at=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  return (
    <div className={styles.main} onClick={handleClick}>
      Sugerencias
    </div>
  );
};

export default Suggestions;
