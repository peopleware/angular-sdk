import { Meta, StoryObj } from '@storybook/angular-vite'
import { PlayerTableStoryComponent, playerStoryArgTypes, playerStoryDecorators } from './player-table-story'

const meta: Meta<PlayerTableStoryComponent> = {
    title: 'ng-common-components/Table/Interactions',
    component: PlayerTableStoryComponent,
    decorators: playerStoryDecorators,
    argTypes: playerStoryArgTypes,
    tags: ['autodocs']
}
export default meta
type Story = StoryObj<PlayerTableStoryComponent>

export const HeaderAction: Story = { args: { headerAction: true } }
export const SelectionAndReordering: Story = { args: { selectionAndDrag: true } }
export const RowActions: Story = { args: { rowActions: true } }
