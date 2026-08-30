import { ref, onMounted, computed, readonly } from 'vue';
import type { User } from 'oidc-client-ts';
import { userManager } from './oidc-manager';

const currentUser = ref<User | null>(null);
const loading = ref(false);
const error = ref<Error | null>(null);

async function loadUser() {
  loading.value = true;
  error.value = null;
  try {
    const user = await userManager.getUser();
    currentUser.value = user && !user.expired ? user : null;
  } catch (e) {
    error.value = e as Error;
  } finally {
    loading.value = false;
  }
}

userManager.events.addUserLoaded((user) => {
  currentUser.value = user;
});
userManager.events.addUserUnloaded(() => {
  currentUser.value = null;
});
userManager.events.addSilentRenewError((e) => {
  error.value = e;
});

export function useAuth() {
  onMounted(loadUser);

  async function signIn() {
    await userManager.signinRedirect();
  }

  async function signOut() {
    await userManager.signoutRedirect();
  }

  async function handleCallback() {
    try {
      const user = await userManager.signinRedirectCallback();
      currentUser.value = user;
      window.history.replaceState({}, document.title, '/');
    } catch (e) {
      error.value = e as Error;
    }
  }

  return {
    user: readonly(currentUser),
    isAuthenticated: computed(() => currentUser.value !== null),
    loading: readonly(loading),
    error: readonly(error),
    signIn,
    signOut,
    handleCallback,
  };
}
