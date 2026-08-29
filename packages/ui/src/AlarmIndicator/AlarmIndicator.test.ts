import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AlarmIndicator from './AlarmIndicator.vue';

describe('AlarmIndicator', () => {
  const FIXED_NOW = 1_700_000_000_000;

  it('renders the label', () => {
    const wrapper = mount(AlarmIndicator, {
      props: { severity: 'critical', label: 'Ping lost' },
    });
    expect(wrapper.text()).toContain('Ping lost');
  });

  it('applies critical severity styling', () => {
    const wrapper = mount(AlarmIndicator, {
      props: { severity: 'critical', label: 'X' },
    });
    expect(wrapper.attributes('data-severity')).toBe('critical');
  });

  it('applies warning severity styling', () => {
    const wrapper = mount(AlarmIndicator, {
      props: { severity: 'warning', label: 'X' },
    });
    expect(wrapper.attributes('data-severity')).toBe('warning');
  });

  it('has role="alert" for screen readers', () => {
    const wrapper = mount(AlarmIndicator, {
      props: { severity: 'critical', label: 'X' },
    });
    expect(wrapper.attributes('role')).toBe('alert');
  });

  it('renders FreshnessTimestamp when since is provided', () => {
    const wrapper = mount(AlarmIndicator, {
      props: { severity: 'critical', label: 'X', since: FIXED_NOW - 45_000, now: FIXED_NOW },
    });
    expect(wrapper.find('[role="time"]').exists()).toBe(true);
  });

  it('does not render FreshnessTimestamp when since is absent', () => {
    const wrapper = mount(AlarmIndicator, {
      props: { severity: 'critical', label: 'X' },
    });
    expect(wrapper.find('[role="time"]').exists()).toBe(false);
  });

  it('exposes accessible aria-label with severity and label', () => {
    const wrapper = mount(AlarmIndicator, {
      props: { severity: 'critical', label: 'System down' },
    });
    expect(wrapper.attributes('aria-label')).toContain('critical');
    expect(wrapper.attributes('aria-label')).toContain('System down');
  });
});
