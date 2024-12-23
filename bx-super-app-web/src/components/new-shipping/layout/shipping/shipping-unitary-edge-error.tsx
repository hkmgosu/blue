import { useEffect } from 'react';
import { toast, ToastProps } from 'react-toastify';

import successEmoji from 'components/ui-bx/alert/images/success.png';
import dangerEmoji from 'components/ui-bx/alert/images/danger.png';
import infoEmoji from 'components/ui-bx/alert/images/info.png';
import warningEmoji from 'components/ui-bx/alert/images/warning.png';
import styled from 'styled-components';
import { useShippingPackageSizesEdgeError } from 'emission-lib/hooks/shipping-package';

type MsgPropsType = {
  closeToast?: (e?: React.MouseEvent<HTMLElement>) => void;
  toastProps?: ToastProps;
  edgeError: boolean;
};

const emojis = {
  success: successEmoji,
  danger: dangerEmoji,
  info: infoEmoji,
  warning: warningEmoji,
};

function Msg({ toastProps, closeToast, edgeError }: MsgPropsType): JSX.Element {
  useEffect(() => {
    if (!edgeError && closeToast) {
      closeToast();
    }
  }, [closeToast, edgeError]);
  return (
    <Container>
      <img
        src={emojis['warning']}
        alt={toastProps && toastProps.type}
        width='21'
        height='21'
      />
      <Text>
        ¡Tu pedido excede la medida máxima de 60 cm por arista, por favor
        modificarlo para avanzar!
      </Text>
    </Container>
  );
}

function NewShippingLayoutEdgeError(): JSX.Element {
  const edgeError = useShippingPackageSizesEdgeError();

  useEffect(() => {
    if (edgeError) {
      toast.warning(<Msg edgeError={edgeError} />, {
        position: 'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
      });
    }
  }, [edgeError]);

  return <></>;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.p`
  margin: 0;
  margin-left: 8px;
`;

export default NewShippingLayoutEdgeError;
