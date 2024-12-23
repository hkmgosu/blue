import { useEffect } from 'react';
import { toast, ToastProps } from 'react-toastify';
import styled from 'styled-components';

import successEmoji from 'components/ui-bx/alert/images/success.png';
import dangerEmoji from 'components/ui-bx/alert/images/danger.png';
import infoEmoji from 'components/ui-bx/alert/images/info.png';
import warningEmoji from 'components/ui-bx/alert/images/warning.png';
import { useShippingPackageSizesVolumetricError } from 'emission-lib/hooks/shipping-package';

type MsgPropsType = {
  closeToast?: (e?: React.MouseEvent<HTMLElement>) => void;
  toastProps?: ToastProps;
  isError: boolean;
};

const emojis = {
  success: successEmoji,
  danger: dangerEmoji,
  info: infoEmoji,
  warning: warningEmoji,
};
function Msg({ toastProps, closeToast, isError }: MsgPropsType): JSX.Element {
  useEffect(() => {
    if (!isError && closeToast) {
      closeToast();
    }
  }, [closeToast, isError]);
  return (
    <Container>
      <img
        src={emojis['warning']}
        alt={toastProps && toastProps.type}
        width='21'
        height='21'
      />
      <Text>
        ¡Tu pedido excede el peso máximo volumétrico de 16 Kg, por favor
        modificarlo para avanzar!
      </Text>
    </Container>
  );
}

function NewShippingLayoutVolumetricError(): JSX.Element {
  const isError = useShippingPackageSizesVolumetricError();
  useEffect(() => {
    if (isError) {
      toast.warning(<Msg isError={isError} />, {
        position: 'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
      });
    }
  }, [isError]);

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

export default NewShippingLayoutVolumetricError;
