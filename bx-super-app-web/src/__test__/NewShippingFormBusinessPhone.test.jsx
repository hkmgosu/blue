import { render, screen } from '@testing-library/react';
import NewShippingFormBusinessPhone from 'components/new-shipping/form/business/phone';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

test('should ', async () => {
  render(<NewShippingFormBusinessPhone />);
  //  act(async () => render(<NewShippingFormBusinessPhone />));
  const input = screen.getByTestId('business-phone');

  await act(async () => {
    userEvent.type(input, '963911679');
  });

  const content = screen.queryByTestId('business-phone-error');
  let errorMessage =
    'Formato de número incorrecto ej: +56981234567 o 981234567';
  // expect(content.textContent).toContain(errorMessage);
  expect(content).toBeInTheDocument();
  // expect(JSON.stringify(error)).toEqual('asd');
});
