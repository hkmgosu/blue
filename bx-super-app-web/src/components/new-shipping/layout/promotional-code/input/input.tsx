import { Input } from 'components/ui-bx/forms';
import { usePaymentMethod } from 'emission-lib/hooks/emission-state';
import { usePromotionCode } from 'emission-lib/hooks/promotion';

export default function NewShippingLayoutPromotionalCodeInputText(): JSX.Element {
  const [promotionCode, setPromotionCode] = usePromotionCode();
  const [payment, setPayment] = usePaymentMethod();

  const handleHideDestinataryPay = (): void => {
    if (payment === 'receiver') {
      setPayment('webpay');
    }
  };
  return (
    <Input
      type='text'
      fullWidth
      value={promotionCode}
      onChange={(e) => {
        setPromotionCode(e.target.value.toLocaleUpperCase());
        handleHideDestinataryPay();
      }}
      placeholder='Ingresa el código de descuento'
    />
  );
}
