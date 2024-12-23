import { useEffect } from 'react';
import { toast, ToastProps } from 'react-toastify';
import styled from 'styled-components';

import successEmoji from 'components/ui-bx/alert/images/success.png';
import dangerEmoji from 'components/ui-bx/alert/images/danger.png';
import infoEmoji from 'components/ui-bx/alert/images/info.png';
import warningEmoji from 'components/ui-bx/alert/images/warning.png';
import { useShippingPackageSizesWeightError } from 'emission-lib/hooks/shipping-package';

type MsgPropsType = {
  closeToast?: (e?: React.MouseEvent<HTMLElement>) => void;
  toastProps?: ToastProps;
  weightError: boolean;
};

const emojis = {
  success: successEmoji,
  danger: dangerEmoji,
  info: infoEmoji,
  warning: warningEmoji,
};

function NewShippingLayoutWeightError(): JSX.Element {
  const weightError = useShippingPackageSizesWeightError();
  useEffect(() => {
    if (weightError) {
      toast.warning(<Msg weightError={weightError} />, {
        position: 'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        autoClose: false,
        progress: 1,
      });
    }
  }, [weightError]);

  return <></>;
}

function Msg({
  toastProps,
  closeToast,
  weightError,
}: MsgPropsType): JSX.Element {
  useEffect(() => {
    if (!weightError && closeToast) {
      closeToast();
    }
  }, [closeToast, weightError]);
  return (
    <Container>
      <img
        src={emojis['warning']}
        alt={toastProps && toastProps.type}
        width='21'
        height='21'
      />
      <Text>
        ¡Tu pedido excede el peso máximo de 16 Kg, por favor modificarlo para
        avanzar!
      </Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.p`
  margin: 0;
  margin-left: 8px;
`;

export default NewShippingLayoutWeightError;
