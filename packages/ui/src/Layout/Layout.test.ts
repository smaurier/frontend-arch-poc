import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Layout from './Layout.vue';

describe('Layout', () => {
  it('renders header slot', () => {
    const wrapper = mount(Layout, {
      slots: { header: '<h1>My header</h1>' },
    });
    expect(wrapper.find('header').text()).toBe('My header');
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
});
