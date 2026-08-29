import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
  it('renders slot content as label', () => {
    const wrapper = mount(Button, { slots: { default: 'Click me' } });
    expect(wrapper.text()).toBe('Click me');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('renders as a <button> element (accessibility)', () => {
    const wrapper = mount(Button);
    expect(wrapper.element.tagName).toBe('BUTTON');
  });

  it('exposes accessible name from slot text', () => {
    const wrapper = mount(Button, { slots: { default: 'Save file' } });
    expect(wrapper.text()).toContain('Save file');
  });

  it('accepts ariaLabel prop for icon-only variants', () => {
    const wrapper = mount(Button, { props: { ariaLabel: 'Close dialog' } });
    expect(wrapper.attributes('aria-label')).toBe('Close dialog');
  });

  it('supports primary variant by default', () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain('bg-status-ok');
  });

  it('supports secondary variant', () => {
    const wrapper = mount(Button, { props: { variant: 'secondary' } });
    expect(wrapper.classes()).toContain('bg-bg-surface');
  });
});
