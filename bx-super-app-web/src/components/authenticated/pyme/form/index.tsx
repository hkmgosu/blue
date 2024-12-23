import { Suspense } from 'react';
import { BillingInfoType, PymeType } from 'types/auth';

import PymeFormSubmit from './submit';

type Props = {
  billingInfo: BillingInfoType;
  pymeInfo: PymeType;
  isEdit: boolean;
};

export default function PymeForm({
  billingInfo,
  pymeInfo,
  isEdit,
}: Props): JSX.Element {
  return (
    <Suspense fallback={<div />}>
      <PymeFormSubmit
        billingInfo={billingInfo}
        pymeInfo={pymeInfo}
        isEdit={isEdit}
      />
    </Suspense>
  );
}
