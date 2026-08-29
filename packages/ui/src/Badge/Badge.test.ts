import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Badge from './Badge.vue';

describe('Badge', () => {
  it('renders the label', () => {
    const wrapper = mount(Badge, { props: { status: 'ok', label: 'Online' } });
    expect(wrapper.text()).toContain('Online');
  });

  it('applies ok status class', () => {
    const wrapper = mount(Badge, { props: { status: 'ok', label: 'OK' } });
    expect(wrapper.classes()).toContain('bg-status-ok');
  });

  it('applies warning status class', () => {
    const wrapper = mount(Badge, { props: { status: 'warning', label: 'Warn' } });
    expect(wrapper.classes()).toContain('bg-status-warning');
  });

  it('applies critical status class', () => {
    const wrapper = mount(Badge, { props: { status: 'critical', label: 'Crit' } });
    expect(wrapper.classes()).toContain('bg-status-critical');
  });

  it('applies neutral status class', () => {
    const wrapper = mount(Badge, { props: { status: 'neutral', label: 'Neu' } });
    expect(wrapper.classes()).toContain('bg-bg-surface');
  });

  it('has role="status" for screen readers', () => {
    const wrapper = mount(Badge, { props: { status: 'critical', label: 'Down' } });
    expect(wrapper.attributes('role')).toBe('status');
  });

  it('exposes accessible name via aria-label', () => {
    const wrapper = mount(Badge, { props: { status: 'critical', label: 'System down' } });
    expect(wrapper.attributes('aria-label')).toContain('critical');
    expect(wrapper.attributes('aria-label')).toContain('System down');
  });
});
