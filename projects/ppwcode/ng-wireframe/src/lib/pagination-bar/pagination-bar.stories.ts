import { Meta, StoryObj } from '@storybook/angular'
import { createPagedEntitiesMock } from '@ppwcode/ng-async'
import { PaginationBarComponent } from './pagination-bar.component'

const meta: Meta<PaginationBarComponent> = {
    title: 'ng-wireframe/PaginationBar',
    component: PaginationBarComponent,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
### When to use
Use the Pagination Bar to navigate through large datasets that are divided into pages. It is ideal for:
- Standardizing the pagination interface for tables or lists.
- Providing users with control over page size and navigation (first, previous, next, last).
- Integrating seamlessly with \`PagedAsyncResult\` or \`PagedEntities\` from the \`ng-async\` library.
                `
            }
        }
    },
    argTypes: {
        pagedAsyncResult: {
            description: 'The paged data object containing items and pagination metadata.',
            control: 'object',
            table: { category: 'Inputs' }
        },
        hidePageSize: {
            description: 'Whether to hide the page size selection dropdown.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        showFirstLastButtons: {
            description: 'Whether to show buttons to jump to the first and last pages.',
            control: 'boolean',
            table: { category: 'Inputs' }
        },
        pageSizeOptions: {
            description: 'The options for the number of items per page.',
            control: 'object',
            table: { category: 'Inputs' }
        },
        page: {
            description: 'Emitted when the page index or page size changes.',
            action: 'page',
            table: { category: 'Outputs' }
        }
    },
    render: (args) => ({
        props: args
    })
}

export default meta
type Story = StoryObj<PaginationBarComponent>

const createMockPagedData = (total: number, page: number, size: number) => {
    const mock = createPagedEntitiesMock(new Array(total).fill({}))
    mock.totalCount = total
    mock.page = page
    mock.pageIndex = page - 1
    mock.pageSize = size
    return mock
}

export const Default: Story = {
    args: {
        pagedAsyncResult: createMockPagedData(100, 1, 10),
        hidePageSize: false,
        showFirstLastButtons: true,
        pageSizeOptions: [5, 10, 25, 50]
    }
}

export const MiddlePage: Story = {
    args: {
        pagedAsyncResult: createMockPagedData(100, 5, 10),
        hidePageSize: false,
        showFirstLastButtons: true
    }
}

export const LastPage: Story = {
    args: {
        pagedAsyncResult: createMockPagedData(100, 10, 10),
        hidePageSize: false,
        showFirstLastButtons: true
    }
}

export const HidePageSize: Story = {
    args: {
        pagedAsyncResult: createMockPagedData(100, 1, 10),
        hidePageSize: true
    }
}

export const CustomPageSizes: Story = {
    args: {
        pagedAsyncResult: createMockPagedData(1000, 1, 20),
        hidePageSize: false,
        pageSizeOptions: [20, 50, 100, 500]
    }
}
