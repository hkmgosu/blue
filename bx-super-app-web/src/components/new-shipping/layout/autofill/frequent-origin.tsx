import { useEffect, MouseEvent } from 'react';
import { toast, ToastProps } from 'react-toastify';

import styles from './styles.module.scss';
import './toastify.scss';
import { ShowAlert } from 'components/ui-bx/alert';
import { useAutoFilledFrequentOrigin } from 'emission-lib/hooks/emission-state';

type AlertMsgPropTypes = {
  closeToast?: (e: MouseEvent<HTMLElement>) => void;
  toastProps?: ToastProps;
};

function AlertMsg({ closeToast }: AlertMsgPropTypes): JSX.Element {
  const handleClose = (e: MouseEvent<HTMLElement>): void => {
    if (!closeToast) return;
    closeToast(e);
  };
  return (
    <div className={styles.AlertMsg}>
      <ShowAlert
        isOpen
        variant='success'
        handleCloseEvent={handleClose}
        fullWidth
        margin
      >
        Se autollenaron los campos con los últimos datos de origen frecuente
        guardados.
      </ShowAlert>
    </div>
  );
}

export default function NewShippingLayoutAutofillFrequentOrigin(): JSX.Element {
  const [autofilled] = useAutoFilledFrequentOrigin();

  useEffect(() => {
    if (autofilled) {
      toast(AlertMsg, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          marginBottom: 0,
          width: '100%',
        },
        closeButton: false,
        className: styles.AlertMsgContainer,
      });
    }
  }, [autofilled]);
  return <></>;
}
