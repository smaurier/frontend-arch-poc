import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Layout from './Layout.vue';

describe('Layout', () => {
  it('renders header slot', () => {
    const wrapper = mount(Layout, {
      slots: { header: '<h1>My header</h1>' },
    });
    expect(wrapper.find('header').text()).toContain('My header');
  });

  it('renders nav slot', () => {
    const wrapper = mount(Layout, {
      slots: { nav: '<a>Home</a>' },
    });
    expect(wrapper.find('nav').text()).toBe('Home');
  });

  it('renders main slot (default)', () => {
    const wrapper = mount(Layout, {
      slots: { default: '<p>Content</p>' },
    });
    expect(wrapper.find('main').text()).toBe('Content');
  });

  it('has landmark roles for a11y', () => {
    const wrapper = mount(Layout, {
      slots: {
        header: '<h1>H</h1>',
        nav: '<a>N</a>',
        default: '<p>M</p>',
      },
    });
    expect(wrapper.find('header').exists()).toBe(true);
    expect(wrapper.find('nav').exists()).toBe(true);
    expect(wrapper.find('main').exists()).toBe(true);
  });

  it('exposes a burger button with a11y attributes', () => {
    const wrapper = mount(Layout);
    const burger = wrapper.find('[data-testid="burger-button"]');
    expect(burger.exists()).toBe(true);
    expect(burger.attributes('aria-label')).toContain('navigation');
    expect(burger.attributes('aria-expanded')).toBe('false');
    expect(burger.attributes('aria-controls')).toBe('app-sidebar');
  });

  it('toggles aria-expanded when burger is clicked', async () => {
    const wrapper = mount(Layout);
    const burger = wrapper.find('[data-testid="burger-button"]');
    await burger.trigger('click');
    expect(burger.attributes('aria-expanded')).toBe('true');
    await burger.trigger('click');
    expect(burger.attributes('aria-expanded')).toBe('false');
  });

  it('renders backdrop when sidebar is open', async () => {
    const wrapper = mount(Layout);
    expect(wrapper.find('[data-testid="sidebar-backdrop"]').exists()).toBe(false);
    await wrapper.find('[data-testid="burger-button"]').trigger('click');
    expect(wrapper.find('[data-testid="sidebar-backdrop"]').exists()).toBe(true);
  });

  it('closes sidebar when backdrop is clicked', async () => {
    const wrapper = mount(Layout);
    await wrapper.find('[data-testid="burger-button"]').trigger('click');
    await wrapper.find('[data-testid="sidebar-backdrop"]').trigger('click');
    expect(wrapper.find('[data-testid="sidebar-backdrop"]').exists()).toBe(false);
  });
});
