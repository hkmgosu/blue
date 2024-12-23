import {
  keycloakAuthUrl,
  keycloakUrl,
  keycloakClient,
  redirectUri,
} from 'config';

export function getAuthUrl(kc_idp_hint: 'google' | 'facebook'): string {
  const client_id = keycloakClient;
  const response_type = 'code';
  const scope = 'openid profile';
  const redirect_uri = redirectUri + '/login/social';
  const prompt = 'login';
  const queryParams = new URLSearchParams({
    client_id,
    response_type,
    kc_idp_hint,
    scope,
    redirect_uri,
    prompt,
  }).toString();

  return `${keycloakUrl}/${keycloakAuthUrl}?${queryParams}`;
}
