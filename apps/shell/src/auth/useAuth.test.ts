import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

type Listener = (u?: unknown) => void;

const listeners: {
  addUserLoaded: Listener[];
  addUserUnloaded: Listener[];
  addSilentRenewError: Listener[];
} = {
  addUserLoaded: [],
  addUserUnloaded: [],
  addSilentRenewError: [],
};

vi.mock('./oidc-manager', () => {
  return {
    userManager: {
      getUser: vi.fn().mockResolvedValue(null),
      signinRedirect: vi.fn().mockResolvedValue(undefined),
      signoutRedirect: vi.fn().mockResolvedValue(undefined),
      signinRedirectCallback: vi.fn().mockResolvedValue({
        access_token: 'x',
        expired: false,
        profile: { sub: 'demo', name: 'Demo User' },
      }),
      events: {
        addUserLoaded: (cb: Listener) => listeners.addUserLoaded.push(cb),
        addUserUnloaded: (cb: Listener) => listeners.addUserUnloaded.push(cb),
        addSilentRenewError: (cb: Listener) => listeners.addSilentRenewError.push(cb),
      },
    },
  };
});

// Reset module cache between tests so module-level ref does not leak
beforeEach(async () => {
  vi.resetModules();
});

describe('useAuth', () => {
  it('exposes signIn signOut and isAuthenticated', async () => {
    const { useAuth } = await import('./useAuth');
    const Host = defineComponent({
      setup() {
        return useAuth();
      },
      template: '<div>{{ isAuthenticated }}</div>',
    });
    const wrapper = mount(Host);
    // waiting a tick for onMounted -> loadUser
    await new Promise((r) => setTimeout(r, 0));
    expect(wrapper.vm.isAuthenticated).toBe(false);
    expect(typeof wrapper.vm.signIn).toBe('function');
    expect(typeof wrapper.vm.signOut).toBe('function');
  });
});
