import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

const authority =
  import.meta.env.VITE_OIDC_AUTHORITY ?? 'http://localhost:8085/realms/frontend-arch-poc';

const clientId = import.meta.env.VITE_OIDC_CLIENT_ID ?? 'shell-client';

export const userManager = new UserManager({
  authority,
  client_id: clientId,
  redirect_uri: `${window.location.origin}/callback`,
  post_logout_redirect_uri: window.location.origin,
  response_type: 'code',
  scope: 'openid profile email',
  automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
});
