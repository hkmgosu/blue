import { useCallback, useState, MouseEvent, useEffect } from 'react';
import {
  acceptInvitationPyme,
  resendInvitation,
  cancelInvitation,
} from 'api/pyme/roles';
import cs from 'classnames';
import { toast, ToastProps, ToastContainer } from 'react-toastify';

import { Button } from 'components/ui-bx/button';
import styles from './styles.module.scss';
import { ShowAlert } from 'components/ui-bx/alert';
import './toastify.scss';
import { useQueryClient } from 'react-query';
import { GetRequestsReceivedResType } from 'api/my-requests';

type AlertMsgPropTypes = {
  closeToast?: (e: MouseEvent<HTMLElement>) => void;
  toastProps?: ToastProps;
  message: string;
  messageType: 'success' | 'danger' | 'warning' | 'info';
};

function AlertMsg({
  closeToast,
  message,
  messageType,
}: AlertMsgPropTypes): JSX.Element {
  const handleClose = (e: MouseEvent<HTMLElement>): void => {
    if (!closeToast) return;
    closeToast(e);
  };
  return (
    <div className={styles.AlertMsg}>
      <ShowAlert
        isOpen
        variant={messageType}
        handleCloseEvent={handleClose}
        fullWidth
        margin
      >
        {message}
      </ShowAlert>
    </div>
  );
}

type ItemType =
  | 'RECEIVED_MEMBER'
  | 'RECEIVED_ADMIN'
  | 'SENT_MEMBER'
  | 'SENT_ADMIN';

type Props = {
  lastItem?: boolean;
  businessName?: string;
  invitationId: string;
  type: ItemType;
  buttonText1: string;
  buttonText2: string;
  toEmail?: string;
};

const typeMessages = (
  businessName?: string,
  toEmail?: string
): Record<ItemType, JSX.Element> => ({
  RECEIVED_MEMBER: (
    <p>
      Quiere que formes parte como <strong>integrante</strong> de su negocio.{' '}
      <br />
      ¡Trabaja en simultáneo con el resto de su equipo!
    </p>
  ),
  RECEIVED_ADMIN: (
    <p>
      Te asignó como <strong>administrador</strong> de su negocio. <br />
      ¡Puedes invitar a otros usuarios a colaborar con el negocio!
    </p>
  ),
  SENT_MEMBER: (
    <p>
      Enviaste una solicitud para unirse como <strong>integrante</strong> a{' '}
      <strong>{toEmail}</strong> a tu equipo de trabajo.
    </p>
  ),
  SENT_ADMIN: (
    <p>
      Enviaste una solicitud de asignación como <strong>administrador</strong>
      de tu negocio <strong>{businessName}</strong>.
    </p>
  ),
});

type MessageSuccessType = 'cancel' | 'resend' | 'decline';

const typeMessagesSuccess: Record<
  ItemType,
  Record<MessageSuccessType, string>
> = {
  RECEIVED_MEMBER: {
    decline: 'Invitación rechazada con éxito',
    cancel: '',
    resend: '',
  },
  RECEIVED_ADMIN: {
    decline: 'Invitación rechazada con éxito',
    cancel: '',
    resend: '',
  },
  SENT_MEMBER: {
    cancel: 'Invitación cancelada con éxito',
    resend: 'Invitación reenviada con éxito',
    decline: '',
  },
  SENT_ADMIN: {
    cancel: 'Invitación cancelada con éxito',
    resend: 'Invitación reenviada con éxito',
    decline: '',
  },
};

export default function MyRequestsItem({
  lastItem = false,
  businessName,
  invitationId,
  type,
  buttonText1,
  buttonText2,
  toEmail,
}: Props): JSX.Element {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSuccessType, setIsSuccessType] = useState<
    'cancel' | 'resend' | 'decline' | null
  >(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleClickAccept = useCallback(async () => {
    try {
      setIsLoading1(true);
      setIsError(false);
      setError(null);
      setIsSuccessType(null);
      const res = await acceptInvitationPyme(invitationId, 'OK');
      if (res) {
        window.location.assign(window.location.href);
      }
    } catch (err) {
      setIsError(true);
      setError('Hemos encontrado un error inesperado');
      setIsLoading1(false);
    }
  }, [invitationId]);

  const handleClickDecline = useCallback(async () => {
    try {
      setIsLoading2(true);
      setIsError(false);
      setError(null);
      setIsSuccessType(null);
      const res = await acceptInvitationPyme(invitationId, 'NOK');
      if (res) {
        window.location.assign(window.location.href);
      }
    } catch (err) {
      setIsError(true);
      setError('Hemos encontrado un error inesperado');
      setIsLoading2(false);
    }
  }, [invitationId]);

  const handleClickResend = useCallback(
    async (_type: 'SENT_MEMBER' | 'SENT_ADMIN') => {
      try {
        setIsLoading1(true);
        setIsError(false);
        setError(null);
        setIsSuccess(false);
        setIsSuccessType(null);
        const res = await resendInvitation(
          invitationId,
          _type === 'SENT_ADMIN' ? 'ADMIN' : 'MEMBER'
        );
        if (res.message) {
          setIsSuccessType('resend');
          setIsSuccess(true);
          setIsLoading1(false);
        }
      } catch (err) {
        setIsError(true);
        setError('Hemos encontrado un error inesperado');
        setIsLoading1(false);
      }
    },
    [invitationId]
  );

  const handleClickCancel = useCallback(async () => {
    try {
      setIsLoading2(true);
      setIsError(false);
      setError(null);
      setIsSuccess(false);
      setIsSuccessType(null);
      const res = await cancelInvitation(invitationId);
      if (res.message) {
        setIsSuccessType('cancel');
        setIsSuccess(true);
        setIsLoading2(false);
        const oldData =
          queryClient.getQueryData<GetRequestsReceivedResType>('requests-sent');
        if (oldData) {
          const filtered = oldData?.invitations?.filter(
            (i) => i._id !== invitationId
          );
          queryClient.setQueryData<GetRequestsReceivedResType>(
            'requests-sent',
            { ...oldData, invitations: filtered }
          );
        }
      }
    } catch (err) {
      setIsError(true);
      setError('Hemos encontrado un error inesperado');
      setIsLoading2(false);
    }
  }, [invitationId, queryClient]);

  const handleClick1 = useCallback(() => {
    if (type === 'RECEIVED_ADMIN' || type === 'RECEIVED_MEMBER') {
      handleClickAccept();
    }
    if (type === 'SENT_ADMIN' || type === 'SENT_MEMBER') {
      handleClickResend(type);
    }
  }, [handleClickAccept, handleClickResend, type]);

  const handleClick2 = useCallback((): void => {
    if (type === 'RECEIVED_ADMIN' || type === 'RECEIVED_MEMBER') {
      handleClickDecline();
    }
    if (type === 'SENT_ADMIN' || type === 'SENT_MEMBER') {
      handleClickCancel();
    }
  }, [handleClickDecline, handleClickCancel, type]);

  useEffect(() => {
    if (isError && error) {
      toast(
        (data) => <AlertMsg {...data} message={error} messageType='danger' />,
        {
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
        }
      );
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && isSuccessType !== null) {
      toast(
        (data) => (
          <AlertMsg
            {...data}
            message={typeMessagesSuccess[type][isSuccessType]}
            messageType='success'
          />
        ),
        {
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
        }
      );
    }
  }, [isSuccess, type, isSuccessType]);

  return (
    <div
      className={cs(styles.item, {
        [styles.lastItem]: lastItem,
      })}
    >
      {businessName && <div className={styles.name}>{businessName}</div>}
      <div className={styles.text}>
        {typeMessages(businessName, toEmail)[type]}
      </div>
      <div className={styles.actions}>
        <div className={styles.actionsOne}>
          <Button
            size='sm'
            isLoading={isLoading1}
            disabled={isLoading1 || isLoading2}
            onClick={handleClick1}
          >
            {buttonText1}
          </Button>
        </div>
        <div>
          <Button
            size='sm'
            isLoading={isLoading2}
            disabled={isLoading2 || isLoading1}
            variant='outline'
            onClick={handleClick2}
          >
            {buttonText2}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
