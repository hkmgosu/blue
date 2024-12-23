import { useQuery } from 'react-query';

import {
  getRequestsReceived,
  GetRequestsReceivedResType,
} from 'api/my-requests';
import MyRequestsItem from 'components/authenticated/my-requests/item';

type Props = {
  userEmail: string;
};

export default function MyRequestsReceived({ userEmail }: Props): JSX.Element {
  const { isLoading, data } = useQuery<GetRequestsReceivedResType, Error>(
    'requests-received',
    () => getRequestsReceived(userEmail)
  );

  if (isLoading && !data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {data &&
        data.invitations.map((request, index) => {
          return (
            <MyRequestsItem
              key={request._id}
              businessName={request.pyme_name}
              type={
                request.invitationType === 'ADMIN'
                  ? 'RECEIVED_ADMIN'
                  : 'RECEIVED_MEMBER'
              }
              lastItem={data.invitations.length === index + 1}
              invitationId={request._id}
              buttonText1='Sí, aceptar'
              buttonText2='Rechazar'
            />
          );
        })}
    </div>
  );
}
