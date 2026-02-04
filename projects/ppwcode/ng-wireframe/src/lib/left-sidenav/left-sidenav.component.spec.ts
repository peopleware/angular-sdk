import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router, RouterModule } from '@angular/router'
import { provideTranslateService } from '@ngx-translate/core'
import { NavigationItem } from '../navigation-item/navigation-item.model'
import { LeftSidenavComponent } from './left-sidenav.component'

describe('Left sidenav component', () => {
    let router: Router
    let component: LeftSidenavComponent
    let fixture: ComponentFixture<LeftSidenavComponent>
    const disabledNavigationItem: NavigationItem = {
        label: 'Navigation item 1',
        isEnabled: false,
        icon: 'fa-solid fa-cogs',
        fullRouterPath: '/item-1'
    }
    const enabledNavigationItem: NavigationItem = {
        label: 'Navigation item 2',
        isEnabled: true,
        icon: 'fa-solid fa-cogs',
        fullRouterPath: '/item-2'
    }
    const implicitEnabledNavigationItem: NavigationItem = {
        label: 'Navigation item 3',
        icon: 'fa-solid fa-cogs',
        fullRouterPath: '/item-3'
    }
    const invalidNavigationItem: NavigationItem = { label: 'Navigation item 4', icon: 'fa-solid fa-cogs' }
    const emptyChildrenNavigationItem = { label: 'Navigation item 5', icon: 'fa-solid fa-cogs', children: [] }
    const childrenNavigationItem = {
        label: 'Navigation item 6',
        icon: 'fa-solid fa-cogs',
        children: [{ label: 'Navigation item 2', isEnabled: true, icon: 'fa-solid fa-cogs', fullRouterPath: '/item-2' }]
    }
    const navigationItems: Array<NavigationItem> = [
        disabledNavigationItem,
        enabledNavigationItem,
        implicitEnabledNavigationItem,
        invalidNavigationItem,
        emptyChildrenNavigationItem,
        childrenNavigationItem
    ]

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LeftSidenavComponent, RouterModule],
            providers: [provideTranslateService({})]
        })

        router = TestBed.inject(Router)

        fixture = TestBed.createComponent(LeftSidenavComponent)
        component = fixture.componentInstance
        fixture.componentRef.setInput('navigationItems', navigationItems)
        fixture.detectChanges()
    })

    it('should do nothing when clicking disabled navigation items', () => {
        expect(component.navigationItemIsOpened(disabledNavigationItem)).toBe(false)

        component.onClickNavigationItem(disabledNavigationItem)

        expect(component.navigationItemIsOpened(disabledNavigationItem)).toBe(false)
    })

    it('should navigate to explicitly enabled routes with a router path', () => {
        vi.spyOn(router, 'navigateByUrl')

        component.onClickNavigationItem(enabledNavigationItem)

        expect(router.navigateByUrl).toHaveBeenCalledTimes(1)

        expect(router.navigateByUrl).toHaveBeenCalledWith('/item-2')
        expect(component.navigationItemIsOpened(enabledNavigationItem)).toBe(false)
    })

    it('should navigate to implicitly enabled routes with a router path', () => {
        vi.spyOn(router, 'navigateByUrl')

        component.onClickNavigationItem(implicitEnabledNavigationItem)

        expect(router.navigateByUrl).toHaveBeenCalledTimes(1)

        expect(router.navigateByUrl).toHaveBeenCalledWith('/item-3')
        expect(component.navigationItemIsOpened(implicitEnabledNavigationItem)).toBe(false)
    })

    it('should error when the navigation item has no children or router path', () => {
        const expectedError = new Error('Could not handle navigation item with no children or router path.')

        expect(() => component.onClickNavigationItem(invalidNavigationItem)).toThrow(expectedError)
        expect(component.navigationItemIsOpened(invalidNavigationItem)).toBe(false)

        expect(() => component.onClickNavigationItem(emptyChildrenNavigationItem)).toThrow(expectedError)
        expect(component.navigationItemIsOpened(emptyChildrenNavigationItem)).toBe(false)
    })

    it('should toggle the state of collapsible navigation items', () => {
        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBe(false)

        component.onClickNavigationItem(childrenNavigationItem)
        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBe(true)

        component.onClickNavigationItem(childrenNavigationItem)
        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBe(false)
    })

    it('should throw when an external link navigation item contains children', () => {
        const navigationItemsWithExternalLink: Array<NavigationItem> = [
            ...navigationItems,
            {
                icon: 'fa-solid fa-globe',
                label: 'external',
                fullRouterPath: 'https://peopleware.be',
                isExternalLink: true,
                children: [...navigationItems]
            }
        ]

        expect(() => {
            fixture.componentRef.setInput('navigationItems', navigationItemsWithExternalLink)
            fixture.detectChanges()
        }).toThrowError('External link navigation items cannot have children.')
    })

    it('should throw when an external link navigation item as a child contains children on itself', () => {
        const navigationItemsWithExternalLink: Array<NavigationItem> = [...navigationItems].map((item, index) =>
            index === 0
                ? {
                      ...item,
                      children: [
                          {
                              icon: 'fa-solid fa-globe',
                              label: 'external',
                              fullRouterPath: 'https://peopleware.be',
                              isExternalLink: true,
                              children: [...navigationItems]
                          }
                      ]
                  }
                : { ...item }
        )

        expect(() => {
            fixture.componentRef.setInput('navigationItems', navigationItemsWithExternalLink)
            fixture.detectChanges()
        }).toThrowError('External link navigation items cannot have children.')
    })
})
