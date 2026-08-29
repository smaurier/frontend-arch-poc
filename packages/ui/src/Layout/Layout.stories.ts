import type { Meta, StoryObj } from '@storybook/vue3';
import Layout from './Layout.vue';

const meta: Meta<typeof Layout> = {
  component: Layout,
  title: 'DS/Layout',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  render: () => ({
    components: { Layout },
    template: `
      <Layout>
        <template #header>
          <h1 class="text-lg font-bold">Fleet Tracker</h1>
          <div>[theme toggle]</div>
        </template>
        <template #nav>
          <ul class="space-y-sm">
            <li>▸ Fleet</li>
            <li>▸ Trips</li>
            <li>▸ Alerts</li>
          </ul>
        </template>
        <p>Main content goes here.</p>
      </Layout>
    `,
  }),
};
