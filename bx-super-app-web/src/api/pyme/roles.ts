import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { ErrorResponseType } from 'types/error-response';

export type InviteCollaboratorResponseType = {
  email: string;
  isSuccess: boolean;
  message?: string;
}[];

export async function inviteCollaboratorToPyme(
  pymeId: string,
  email: string[]
): Promise<InviteCollaboratorResponseType> {
  const { status, data } = await axiosInstance.post<
    InviteCollaboratorResponseType | ErrorResponseType
  >(`/${APIConstants.identity}/pyme/invite`, {
    pyme_id: pymeId,
    email,
  });

  if (status === 400) {
    return Promise.reject({
      status,
      data,
      message: 'Error 400',
    });
  }

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }

  return data as InviteCollaboratorResponseType;
}

export type InviteAdminResponseType = {
  email: string;
  isSuccess: boolean;
  message?: string;
};

export async function inviteAdminToPyme(
  pymeId: string,
  email: string
): Promise<InviteAdminResponseType> {
  const { status, data } = await axiosInstance.post<
    InviteAdminResponseType | ErrorResponseType
  >(`/${APIConstants.identity}/pyme/admin-invite`, {
    pyme_id: pymeId,
    email,
  });

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }

  return data as InviteAdminResponseType;
}

export type ResendInvitationResType = {
  message: string;
};

export async function resendInvitation(
  invitationId: string,
  type: 'MEMBER' | 'ADMIN'
): Promise<ResendInvitationResType> {
  const { status, data } = await axiosInstance.post<
    ResendInvitationResType | ErrorResponseType
  >(`/${APIConstants.identity}/pyme/resend-invitation`, {
    invitation_id: invitationId,
    invitationType: type,
  });

  if (status === 200) {
    return data as ResendInvitationResType;
  }
  return Promise.reject(new Error((data as ErrorResponseType).payload.error));
}

export async function cancelInvitation(
  invitationId: string
): Promise<ResendInvitationResType> {
  const { status, data } = await axiosInstance.delete<
    ResendInvitationResType | ErrorResponseType
  >(`/${APIConstants.identity}/pyme/cancel-invitation/${invitationId}`);

  if (status === 200) {
    return data as ResendInvitationResType;
  }
  return Promise.reject(new Error((data as ErrorResponseType).payload.error));
}

export async function acceptInvitationPyme(
  invitationId: string,
  answer: 'OK' | 'NOK'
): Promise<boolean> {
  const { status, data } = await axiosInstance.post(
    `/${APIConstants.identity}/pyme/answer-pyme-invitation`,
    {
      invitation_id: invitationId,
      answer,
    }
  );

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }

  return true;
}

export async function deletePymeCollaborator(
  pymeId: string,
  userId: string
): Promise<boolean> {
  const { status, data } = await axiosInstance.delete(
    `/${APIConstants.identity}/pyme/${pymeId}/${userId}`
  );

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }

  return true;
}
