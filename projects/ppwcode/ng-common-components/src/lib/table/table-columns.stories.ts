import { Meta, StoryObj } from '@storybook/angular-vite'
import { PlayerTableStoryComponent, playerStoryArgTypes, playerStoryDecorators } from './player-table-story'

const meta: Meta<PlayerTableStoryComponent> = {
    title: 'ng-common-components/Table/Columns',
    component: PlayerTableStoryComponent,
    decorators: playerStoryDecorators,
    argTypes: playerStoryArgTypes,
    tags: ['autodocs']
}
export default meta
type Story = StoryObj<PlayerTableStoryComponent>

export const StickyStart: Story = { args: { stickyStart: true } }
export const StickyEnd: Story = { args: { stickyEnd: true } }
export const FormattedColumns: Story = {
    args: { showFooter: true },
    parameters: {
        docs: {
            description: {
                story: 'Luxon dates, EUR income, percentage bonuses, row-index templates, active-status icons, and the total income footer. Formatting uses a fixed English locale.'
            }
        }
    }
}
