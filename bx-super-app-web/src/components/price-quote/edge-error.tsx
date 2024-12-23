import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { toast, ToastProps } from 'react-toastify';

import successEmoji from 'components/ui-bx/alert/images/success.png';
import dangerEmoji from 'components/ui-bx/alert/images/danger.png';
import infoEmoji from 'components/ui-bx/alert/images/info.png';
import warningEmoji from 'components/ui-bx/alert/images/warning.png';
import styled from 'styled-components';
import { showEdgeErrorToastAtom } from 'atoms/price-quote';

type MsgPropsType = {
  closeToast?: (e?: React.MouseEvent<HTMLElement>) => void;
  toastProps?: ToastProps;
};

const emojis = {
  success: successEmoji,
  danger: dangerEmoji,
  info: infoEmoji,
  warning: warningEmoji,
};
function Msg({ toastProps, closeToast }: MsgPropsType): JSX.Element {
  const [isError] = useAtom(showEdgeErrorToastAtom);
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
        ¡Tu pedido excede la medida máxima de 60 cm por arista, por favor
        modificarlo para avanzar!
      </Text>
    </Container>
  );
}

function PriceQuoteEdgeError(): JSX.Element {
  const [isError] = useAtom(showEdgeErrorToastAtom);
  useEffect(() => {
    if (isError) {
      toast.warning(<Msg />, {
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
export default PriceQuoteEdgeError;
