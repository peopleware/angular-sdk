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
        expect(component.navigationItemIsOpened(disabledNavigationItem)).toBeFalse()

        component.onClickNavigationItem(disabledNavigationItem)

        expect(component.navigationItemIsOpened(disabledNavigationItem)).toBeFalse()
    })

    it('should navigate to explicitly enabled routes with a router path', () => {
        spyOn(router, 'navigateByUrl')

        component.onClickNavigationItem(enabledNavigationItem)

        expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/item-2')
        expect(component.navigationItemIsOpened(enabledNavigationItem)).toBeFalse()
    })

    it('should navigate to implicitly enabled routes with a router path', () => {
        spyOn(router, 'navigateByUrl')

        component.onClickNavigationItem(implicitEnabledNavigationItem)

        expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/item-3')
        expect(component.navigationItemIsOpened(implicitEnabledNavigationItem)).toBeFalse()
    })

    it('should error when the navigation item has no children or router path', () => {
        const expectedError = new Error('Could not handle navigation item with no children or router path.')

        expect(() => component.onClickNavigationItem(invalidNavigationItem)).toThrow(expectedError)
        expect(component.navigationItemIsOpened(invalidNavigationItem)).toBeFalse()

        expect(() => component.onClickNavigationItem(emptyChildrenNavigationItem)).toThrow(expectedError)
        expect(component.navigationItemIsOpened(emptyChildrenNavigationItem)).toBeFalse()
    })

    it('should toggle the state of collapsible navigation items', () => {
        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBeFalse()

        component.onClickNavigationItem(childrenNavigationItem)
        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBeTrue()

        component.onClickNavigationItem(childrenNavigationItem)
        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBeFalse()
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
