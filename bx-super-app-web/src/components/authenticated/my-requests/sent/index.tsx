import { useQuery } from 'react-query';

import { getRequestsSent, GetRequestsReceivedResType } from 'api/my-requests';
import MyRequestsItem from 'components/authenticated/my-requests/item';

export default function MyRequestsSent(): JSX.Element {
  const { isLoading, data } = useQuery<GetRequestsReceivedResType, Error>(
    'requests-sent',
    getRequestsSent
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
                  ? 'SENT_ADMIN'
                  : 'SENT_MEMBER'
              }
              lastItem={data.invitations.length === index + 1}
              invitationId={request._id}
              buttonText1='Reenviar'
              buttonText2='Cancelar'
              toEmail={request.email}
            />
          );
        })}
    </div>
  );
}
