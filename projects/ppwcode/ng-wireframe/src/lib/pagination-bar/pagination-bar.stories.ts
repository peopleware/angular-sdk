import { Meta, StoryObj } from '@storybook/angular'
import { createPagedEntitiesMock } from '@ppwcode/ng-async'
import { PaginationBarComponent } from './pagination-bar.component'

const meta: Meta<PaginationBarComponent> = {
    title: 'Components/PaginationBar',
    component: PaginationBarComponent,
    tags: ['autodocs'],
    render: (args) => ({
        props: args
    })
}

export default meta
type Story = StoryObj<PaginationBarComponent>

const mockEntities = createPagedEntitiesMock(new Array(100).fill({}))
mockEntities.pageSize = 10
mockEntities.pageIndex = 1
mockEntities.page = 1
mockEntities.totalCount = 100

export const Default: Story = {
    args: {
        pagedAsyncResult: mockEntities,
        hidePageSize: false,
        showFirstLastButtons: true,
        pageSizeOptions: [5, 10, 25, 50]
    }
}

export const HidePageSize: Story = {
    args: {
        pagedAsyncResult: mockEntities,
        hidePageSize: true
    }
}
