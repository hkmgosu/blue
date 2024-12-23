import NewShippingLayoutSummaryMultiItemWrapperLeft from 'components/new-shipping/layout/summary/multi-item-wrapper-left';
import NewShippingLayoutSummaryMultiItemContentDetailLeft from 'components/new-shipping/layout/summary/multi-item-content-detail-left';

type Props = {
  position: number;
  totals: number;
};

function NewShippingLayoutSummaryMultiItemLeft({
  position,
  totals,
}: Props): JSX.Element {
  return (
    <div>
      <NewShippingLayoutSummaryMultiItemWrapperLeft
        position={position}
        totals={totals}
      >
        <NewShippingLayoutSummaryMultiItemContentDetailLeft />
      </NewShippingLayoutSummaryMultiItemWrapperLeft>
    </div>
  );
}

export default NewShippingLayoutSummaryMultiItemLeft;
