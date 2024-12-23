import './checkout-detail.css';

interface Detail {
  icon?: any;
  label: any;
  description?: any;
}

interface Details {
  label: any;
  items?: Detail[];
  description?: any;
  descriptionAlignRight?: boolean;
}

interface Props {
  data: Details[];
}

export function CheckoutDetail({ data }: Props): JSX.Element {
  return (
    <div className='bx-checkout-details'>
      {data.map(({ items, label, descriptionAlignRight, description }) => (
        <div className='bx-checkout-detail'>
          <div className='bx-checkout-detail_header'>
            <div className='bx-checkout-detail_label'>{label}</div>
            <div className='bx-checkout-detail_description'>{description}</div>
          </div>
          <div className='bx-checkout-detail_items'>
            {items &&
              items.map(({ icon, label, description }) => (
                <div
                  className={`bx-checkout-detail_row ${
                    icon ? 'bx-checkout-detail_row--with-icon' : ''
                  }`}
                >
                  {icon && (
                    <div className='bx-checkout-detail_row_icon'>{icon}</div>
                  )}
                  <div className='bx-checkout-detail_row_label'>{label}</div>
                  <div
                    className={`bx-checkout-detail_row_description ${
                      descriptionAlignRight
                        ? 'bx-checkout-detail_description--align-right'
                        : ''
                    }`}
                  >
                    {Array.isArray(description)
                      ? description.map((child) => [child, <br />])
                      : description}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
