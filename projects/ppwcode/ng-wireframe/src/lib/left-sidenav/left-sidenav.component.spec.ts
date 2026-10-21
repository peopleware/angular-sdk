import { ComponentFixture, TestBed } from '@angular/core/testing'
import { APP_BASE_HREF } from '@angular/common'
import { ErrorHandler } from '@angular/core'
import { By } from '@angular/platform-browser'
import { Router, provideRouter } from '@angular/router'
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
            imports: [LeftSidenavComponent],
            providers: [
                provideTranslateService({}),
                provideRouter([{ path: '**', children: [] }]),
                { provide: APP_BASE_HREF, useValue: '/sdk/' }
            ]
        })

        router = TestBed.inject(Router)

        fixture = TestBed.createComponent(LeftSidenavComponent)
        component = fixture.componentInstance
        fixture.componentRef.setInput('navigationItems', navigationItems)
        fixture.detectChanges()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    function getNavigationItemButton(label: string): HTMLButtonElement | HTMLAnchorElement {
        const navigationItemButtons: Array<HTMLButtonElement | HTMLAnchorElement> = Array.from(
            fixture.nativeElement.querySelectorAll('.ppw-sidenav-navigation-item')
        )
        const navigationItemButton = navigationItemButtons.find((button) => button.textContent?.includes(label))

        if (!navigationItemButton) {
            throw new Error(`Could not find navigation item button with label "${label}".`)
        }

        return navigationItemButton
    }

    function getNavigationWrapper(): HTMLElement {
        return fixture.nativeElement.querySelector('.ppw-sidenav-navigation-wrapper')
    }

    it('should not scroll only the navigation wrapper by default', () => {
        expect(getNavigationWrapper().classList).not.toContain('ppw-sidenav-navigation-wrapper--scroll-only')
    })

    it('should scroll only the navigation wrapper when enabled', () => {
        fixture.componentRef.setInput('scrollNavigationWrapperOnly', true)
        fixture.detectChanges()

        expect(getNavigationWrapper().classList).toContain('ppw-sidenav-navigation-wrapper--scroll-only')
    })

    it('should do nothing when clicking disabled navigation items', () => {
        const navigate = vi.spyOn(router, 'navigateByUrl')
        const open = vi.spyOn(window, 'open')
        const navigated = vi.fn()
        component.navigated.subscribe(navigated)
        expect(component.navigationItemIsOpened(disabledNavigationItem)).toBe(false)

        component.onClickNavigationItem(disabledNavigationItem)
        component.onClickNavigationItem({ ...disabledNavigationItem, isExternalLink: true })
        component.onClickNavigationItem({ ...childrenNavigationItem, isEnabled: false })

        expect(component.navigationItemIsOpened(disabledNavigationItem)).toBe(false)
        expect(component.navigationItemIsOpened({ ...childrenNavigationItem, isEnabled: false })).toBe(false)
        expect(navigate).not.toHaveBeenCalled()
        expect(open).not.toHaveBeenCalled()
        expect(navigated).not.toHaveBeenCalled()
    })

    it.each([enabledNavigationItem, implicitEnabledNavigationItem])(
        'should preserve imperative internal navigation for direct calls: $label',
        (item) => {
            const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true)
            const navigated = vi.fn()
            component.navigated.subscribe(navigated)

            component.onClickNavigationItem(item)

            expect(navigate).toHaveBeenCalledExactlyOnceWith(item.fullRouterPath)
            expect(navigated).toHaveBeenCalledExactlyOnceWith(item)
        }
    )

    it.each([false, true])(
        'should prioritize external navigation over children in direct calls with useNativeLinks=%s',
        (useNativeLinks) => {
            fixture.componentRef.setInput('useNativeLinks', useNativeLinks)
            const item = { ...childrenNavigationItem, fullRouterPath: 'https://peopleware.be', isExternalLink: true }
            const open = vi.spyOn(window, 'open').mockReturnValue(null)
            const navigate = vi.spyOn(router, 'navigateByUrl')
            const navigated = vi.fn()
            component.navigated.subscribe(navigated)

            component.onClickNavigationItem(item)

            expect(open).toHaveBeenCalledExactlyOnceWith(item.fullRouterPath, '_blank')
            expect(navigate).not.toHaveBeenCalled()
            expect(navigated).toHaveBeenCalledExactlyOnceWith(item)
            expect(component.navigationItemIsOpened(item)).toBe(false)
        }
    )

    it('should render legacy buttons by default', () => {
        expect(component.useNativeLinks()).toBe(false)
        for (const item of navigationItems) {
            const button = getNavigationItemButton(item.label)
            expect(button.tagName).toBe('BUTTON')
            expect(button.hasAttribute('href')).toBe(false)
        }
    })

    it.each([enabledNavigationItem, implicitEnabledNavigationItem])(
        'should navigate legacy internal buttons imperatively: $label',
        (item) => {
            const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true)
            const navigated = vi.fn()
            component.navigated.subscribe(navigated)

            getNavigationItemButton(item.label).click()

            expect(navigate).toHaveBeenCalledExactlyOnceWith(item.fullRouterPath)
            expect(navigated).toHaveBeenCalledExactlyOnceWith(expect.objectContaining(item))
        }
    )

    it('should open legacy external buttons imperatively and emit navigated', () => {
        const item = { ...enabledNavigationItem, fullRouterPath: 'https://peopleware.be', isExternalLink: true }
        fixture.componentRef.setInput('navigationItems', [item])
        fixture.detectChanges()
        const open = vi.spyOn(window, 'open').mockReturnValue(null)
        const navigate = vi.spyOn(router, 'navigateByUrl')
        const navigated = vi.fn()
        component.navigated.subscribe(navigated)

        const button = getNavigationItemButton(item.label)
        expect(button.tagName).toBe('BUTTON')
        expect(button.hasAttribute('href')).toBe(false)
        button.click()

        expect(open).toHaveBeenCalledExactlyOnceWith(item.fullRouterPath, '_blank')
        expect(navigate).not.toHaveBeenCalled()
        expect(navigated).toHaveBeenCalledExactlyOnceWith(expect.objectContaining(item))
    })

    it('should switch back to legacy buttons when native links are disabled', () => {
        fixture.componentRef.setInput('useNativeLinks', true)
        fixture.detectChanges()
        expect(getNavigationItemButton(enabledNavigationItem.label).tagName).toBe('A')
        fixture.componentRef.setInput('useNativeLinks', false)
        fixture.detectChanges()
        expect(getNavigationItemButton(enabledNavigationItem.label).tagName).toBe('BUTTON')
        expect(getNavigationItemButton(enabledNavigationItem.label).hasAttribute('href')).toBe(false)
    })

    describe('with native links enabled', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('useNativeLinks', true)
            fixture.detectChanges()
        })

        it('should navigate to explicitly enabled routes with a router path', () => {
            vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true)
            const navigated = vi.fn()
            component.navigated.subscribe(navigated)

            const link = getNavigationItemButton(enabledNavigationItem.label)
            expect(link.tagName).toBe('A')
            expect(link.getAttribute('href')).toBe('/sdk/item-2')
            link.click()

            expect(router.navigateByUrl).toHaveBeenCalledTimes(1)

            expect(router.navigateByUrl).toHaveBeenCalledWith(router.parseUrl('/item-2'), expect.any(Object))
            expect(navigated).toHaveBeenCalledTimes(1)
            expect(navigated).toHaveBeenCalledWith(expect.objectContaining(enabledNavigationItem))
            expect(component.navigationItemIsOpened(enabledNavigationItem)).toBe(false)
        })

        it('should navigate to implicitly enabled routes with a router path', () => {
            vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true)

            getNavigationItemButton(implicitEnabledNavigationItem.label).click()

            expect(router.navigateByUrl).toHaveBeenCalledTimes(1)

            expect(router.navigateByUrl).toHaveBeenCalledWith(router.parseUrl('/item-3'), expect.any(Object))
            expect(component.navigationItemIsOpened(implicitEnabledNavigationItem)).toBe(false)
        })

        it('should expose parsed root-relative hrefs with query, matrix parameters and fragments', () => {
            fixture.componentRef.setInput('navigationItems', [
                { label: 'Root', icon: 'fa-solid fa-house', fullRouterPath: '/' },
                {
                    label: 'Details',
                    icon: 'fa-solid fa-file',
                    fullRouterPath: 'item-2;mode=edit?search=hello%20world#section'
                }
            ])
            fixture.detectChanges()

            expect(getNavigationItemButton('Root').getAttribute('href')).toBe('/sdk/')
            expect(getNavigationItemButton('Details').getAttribute('href')).toBe(
                '/sdk/item-2;mode=edit?search=hello%20world#section'
            )
        })

        it.each([{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }])(
            'should leave modified internal clicks to the browser without emitting navigated: %o',
            (modifiers) => {
                const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true)
                const navigated = vi.fn()
                component.navigated.subscribe(navigated)
                const event = new MouseEvent('click', { bubbles: true, cancelable: true, ...modifiers })

                getNavigationItemButton(enabledNavigationItem.label).dispatchEvent(event)

                expect(event.defaultPrevented).toBe(false)
                expect(navigate).not.toHaveBeenCalled()
                expect(navigated).not.toHaveBeenCalled()
            }
        )

        it.each([{ children: undefined }, { children: childrenNavigationItem.children }])(
            'should use native external links with secure new-tab attributes with children=$children',
            ({ children }) => {
                const item: NavigationItem = {
                    label: 'External',
                    icon: 'fa-solid fa-globe',
                    fullRouterPath: 'https://peopleware.be',
                    isExternalLink: true,
                    children
                }
                fixture.componentRef.setInput('navigationItems', [item])
                fixture.detectChanges()
                const link = getNavigationItemButton('External')
                const navigate = vi.spyOn(router, 'navigateByUrl')
                const open = vi.spyOn(window, 'open')
                const navigated = vi.fn()
                component.navigated.subscribe(navigated)

                expect(link.tagName).toBe('A')
                expect(link.getAttribute('href')).toBe(item.fullRouterPath)
                expect(link.getAttribute('target')).toBe('_blank')
                expect(link.getAttribute('rel')).toBe('noopener noreferrer')
                for (const modifiers of [
                    { ctrlKey: true },
                    { metaKey: true },
                    { shiftKey: true },
                    { altKey: true },
                    { button: 1 },
                    { button: 2 }
                ]) {
                    const modified = new MouseEvent('click', { bubbles: true, cancelable: true, ...modifiers })
                    link.dispatchEvent(modified)
                    expect(modified.defaultPrevented).toBe(false)
                }
                expect(navigated).not.toHaveBeenCalled()

                const ordinary = new MouseEvent('click', { bubbles: true, cancelable: true })
                link.dispatchEvent(ordinary)
                expect(ordinary.defaultPrevented).toBe(false)
                expect(navigated).toHaveBeenCalledTimes(1)
                expect(navigate).not.toHaveBeenCalled()
                expect(open).not.toHaveBeenCalled()
                expect(component.navigationItemIsOpened(item)).toBe(false)
            }
        )

        it.each([false, true])('should keep disabled entries inert with useNativeLinks=%s', (useNativeLinks) => {
            fixture.componentRef.setInput('useNativeLinks', useNativeLinks)
            fixture.componentRef.setInput('navigationItems', [
                disabledNavigationItem,
                {
                    label: 'Disabled external',
                    icon: 'fa-solid fa-globe',
                    fullRouterPath: 'https://peopleware.be',
                    isExternalLink: true,
                    isEnabled: false,
                    children: childrenNavigationItem.children
                },
                { ...childrenNavigationItem, label: 'Disabled parent', isEnabled: false }
            ])
            fixture.detectChanges()
            const navigated = vi.fn()
            const navigate = vi.spyOn(router, 'navigateByUrl')
            const open = vi.spyOn(window, 'open')
            component.navigated.subscribe(navigated)

            for (const label of [disabledNavigationItem.label, 'Disabled external', 'Disabled parent']) {
                const button = getNavigationItemButton(label) as HTMLButtonElement
                expect(button.tagName).toBe('BUTTON')
                expect(button.disabled).toBe(false)
                expect(button.getAttribute('aria-disabled')).toBe('true')
                expect(button.hasAttribute('href')).toBe(false)
                expect(button.tabIndex).toBe(0)
                button.focus()
                expect(document.activeElement).toBe(button)
                button.click()
            }
            fixture.detectChanges()
            expect(getNavigationItemButton('Disabled parent').getAttribute('aria-expanded')).toBe('false')
            expect(navigate).not.toHaveBeenCalled()
            expect(open).not.toHaveBeenCalled()
            expect(navigated).not.toHaveBeenCalled()
        })

        it.each([false, true])(
            'should toggle parent buttons rather than navigate with useNativeLinks=%s',
            (useNativeLinks) => {
                fixture.componentRef.setInput('useNativeLinks', useNativeLinks)
                fixture.componentRef.setInput('navigationItems', [
                    { ...childrenNavigationItem, fullRouterPath: '/parent' }
                ])
                fixture.detectChanges()
                const button = getNavigationItemButton(childrenNavigationItem.label)
                const navigate = vi.spyOn(router, 'navigateByUrl')
                const navigated = vi.fn()
                component.navigated.subscribe(navigated)

                expect(button.tagName).toBe('BUTTON')
                expect(button.hasAttribute('href')).toBe(false)
                button.click()
                fixture.detectChanges()
                expect(button.getAttribute('aria-expanded')).toBe('true')
                expect(getNavigationItemButton(enabledNavigationItem.label).tagName).toBe(
                    useNativeLinks ? 'A' : 'BUTTON'
                )
                expect(navigate).not.toHaveBeenCalled()
                expect(navigated).not.toHaveBeenCalled()
            }
        )

        it('should preserve imperative direct calls even with native links enabled', () => {
            const external = { ...enabledNavigationItem, fullRouterPath: 'https://peopleware.be', isExternalLink: true }
            const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true)
            const open = vi.spyOn(window, 'open').mockReturnValue(null)
            const navigated = vi.fn()
            component.navigated.subscribe(navigated)

            component.onClickNavigationItem(enabledNavigationItem)
            component.onClickNavigationItem(external)
            component.onClickNavigationItem(childrenNavigationItem)
            component.onClickNavigationItem(disabledNavigationItem)

            expect(navigate).toHaveBeenCalledExactlyOnceWith(enabledNavigationItem.fullRouterPath)
            expect(open).toHaveBeenCalledExactlyOnceWith(external.fullRouterPath, '_blank')
            expect(component.navigationItemIsOpened(childrenNavigationItem)).toBe(true)
            expect(navigated.mock.calls).toEqual([[enabledNavigationItem], [external]])
        })
    })

    it('should retain exact-path active matching while ignoring query, matrix parameters and fragments', async () => {
        await router.navigateByUrl('/item-2;mode=edit?search=value#section')
        fixture.detectChanges()

        expect(getNavigationItemButton(enabledNavigationItem.label).classList).toContain(
            'ppw-sidenav-navigation-item-active'
        )
        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBe(true)
        await router.navigateByUrl('/item-2/child')
        fixture.detectChanges()
        expect(getNavigationItemButton(enabledNavigationItem.label).classList).not.toContain(
            'ppw-sidenav-navigation-item-active'
        )
    })

    it.each([false, true])(
        'should preserve errors for direct calls to pathless internal leaves with useNativeLinks=%s',
        (useNativeLinks) => {
            fixture.componentRef.setInput('useNativeLinks', useNativeLinks)
            const navigate = vi.spyOn(router, 'navigateByUrl')
            const open = vi.spyOn(window, 'open')
            const navigated = vi.fn()
            component.navigated.subscribe(navigated)

            for (const item of [invalidNavigationItem, emptyChildrenNavigationItem]) {
                expect(() => component.onClickNavigationItem(item)).toThrowError(
                    'Could not handle navigation item with no children or router path.'
                )
            }
            expect(navigate).not.toHaveBeenCalled()
            expect(open).not.toHaveBeenCalled()
            expect(navigated).not.toHaveBeenCalled()
        }
    )

    it('should report errors when legacy pathless internal buttons are activated', () => {
        const handleError = vi.spyOn(TestBed.inject(ErrorHandler), 'handleError').mockImplementation(() => {})
        const navigated = vi.fn()
        component.navigated.subscribe(navigated)

        for (const item of [invalidNavigationItem, emptyChildrenNavigationItem]) {
            const button = fixture.debugElement
                .queryAll(By.css('.ppw-sidenav-navigation-item'))
                .find((element) => element.nativeElement.textContent.includes(item.label))!
            expect(() => button.triggerEventHandler('click')).toThrowError(
                'Could not handle navigation item with no children or router path.'
            )
        }

        expect(handleError).toHaveBeenCalledTimes(2)
        expect(handleError).toHaveBeenNthCalledWith(
            1,
            new Error('Could not handle navigation item with no children or router path.')
        )
        expect(handleError).toHaveBeenNthCalledWith(
            2,
            new Error('Could not handle navigation item with no children or router path.')
        )
        expect(navigated).not.toHaveBeenCalled()
    })

    it('should preserve legacy external activation without a path', async () => {
        const item = { ...invalidNavigationItem, isExternalLink: true }
        fixture.componentRef.setInput('navigationItems', [item])
        await fixture.whenStable()
        const open = vi.spyOn(window, 'open').mockReturnValue(null)
        const navigate = vi.spyOn(router, 'navigateByUrl')
        const navigated = vi.fn()
        component.navigated.subscribe(navigated)

        const button = getNavigationItemButton(item.label)
        expect(button.tagName).toBe('BUTTON')
        expect(button.hasAttribute('href')).toBe(false)
        button.click()

        expect(open).toHaveBeenCalledExactlyOnceWith(undefined, '_blank')
        expect(navigated).toHaveBeenCalledExactlyOnceWith(expect.objectContaining(item))
        expect(navigate).not.toHaveBeenCalled()
    })

    it('should keep native pathless internal and external leaves inert without hrefs', async () => {
        const navigate = vi.spyOn(router, 'navigateByUrl')
        const open = vi.spyOn(window, 'open')
        const navigated = vi.fn()
        component.navigated.subscribe(navigated)
        const items = [
            invalidNavigationItem,
            emptyChildrenNavigationItem,
            { ...invalidNavigationItem, label: 'Pathless external', isExternalLink: true }
        ]
        fixture.componentRef.setInput('useNativeLinks', true)
        fixture.componentRef.setInput('navigationItems', items)
        await fixture.whenStable()

        for (const item of items) {
            const button = getNavigationItemButton(item.label)
            expect(button.tagName).toBe('BUTTON')
            expect(button.hasAttribute('href')).toBe(false)
            button.click()
            expect(component.navigationItemIsOpened(item)).toBe(false)
        }
        expect(navigate).not.toHaveBeenCalled()
        expect(open).not.toHaveBeenCalled()
        expect(navigated).not.toHaveBeenCalled()
    })

    it('should toggle the state of collapsible navigation items', () => {
        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBe(false)

        component.onClickNavigationItem(childrenNavigationItem)
        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBe(true)

        component.onClickNavigationItem(childrenNavigationItem)
        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBe(false)
    })

    it('should mark the active navigation item', () => {
        vi.spyOn(router, 'isActive').mockImplementation((url) => url === '/item-2')

        fixture.componentRef.setInput('navigationItems', [...navigationItems])
        fixture.detectChanges()

        expect(getNavigationItemButton('Navigation item 2').classList).toContain('ppw-sidenav-navigation-item-active')
        expect(getNavigationItemButton('Navigation item 3').classList).not.toContain(
            'ppw-sidenav-navigation-item-active'
        )
    })

    it('should keep parents with an active child opened', () => {
        vi.spyOn(router, 'isActive').mockImplementation((url) => url === '/item-2')

        fixture.componentRef.setInput('navigationItems', [...navigationItems])
        fixture.detectChanges()

        expect(getNavigationItemButton('Navigation item 2')).toBeTruthy()
    })

    it('should collapse parents with an active child when explicitly closed', () => {
        vi.spyOn(router, 'isActive').mockImplementation((url) => url === '/item-2')

        fixture.componentRef.setInput('navigationItems', [...navigationItems])
        fixture.detectChanges()

        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBe(true)

        component.onClickNavigationItem(childrenNavigationItem)

        expect(component.navigationItemIsOpened(childrenNavigationItem)).toBe(false)
    })

    it('should not call the active route helper when unrelated template state changes', () => {
        const navigationItemIsActiveSpy = vi.spyOn(component, 'navigationItemIsActive')

        fixture.componentRef.setInput('showMenuCloseButton', false)
        fixture.detectChanges()

        expect(navigationItemIsActiveSpy).not.toHaveBeenCalled()
    })

    it.each([
        { useNativeLinks: false, nested: false },
        { useNativeLinks: false, nested: true },
        { useNativeLinks: true, nested: false },
        { useNativeLinks: true, nested: true }
    ])('should navigate external parents without toggling children: %o', ({ useNativeLinks, nested }) => {
        const item: NavigationItem = {
            label: 'External parent',
            icon: 'fa-solid fa-globe',
            fullRouterPath: 'https://peopleware.be',
            isExternalLink: true,
            children: childrenNavigationItem.children
        }
        fixture.componentRef.setInput('useNativeLinks', useNativeLinks)
        fixture.componentRef.setInput(
            'navigationItems',
            nested ? [{ label: 'Parent', icon: 'fa-solid fa-folder', children: [item] }] : [item]
        )
        fixture.detectChanges()
        if (nested) {
            getNavigationItemButton('Parent').click()
            fixture.detectChanges()
        }
        const open = vi.spyOn(window, 'open').mockReturnValue(null)
        const navigate = vi.spyOn(router, 'navigateByUrl')
        const navigated = vi.fn()
        component.navigated.subscribe(navigated)
        const element = getNavigationItemButton(item.label)

        expect(element.tagName).toBe(useNativeLinks ? 'A' : 'BUTTON')
        expect(element.hasAttribute('aria-expanded')).toBe(false)
        element.click()
        fixture.detectChanges()

        expect(component.navigationItemIsOpened(item)).toBe(false)
        expect(fixture.nativeElement.querySelectorAll('.ppw-sidenav-navigation-item').length).toBe(nested ? 2 : 1)
        expect(navigate).not.toHaveBeenCalled()
        expect(navigated).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining({
                ...item,
                children: item.children!.map((child) => expect.objectContaining(child))
            })
        )
        if (useNativeLinks) {
            expect(element.getAttribute('href')).toBe(item.fullRouterPath)
            expect(open).not.toHaveBeenCalled()
        } else {
            expect(open).toHaveBeenCalledExactlyOnceWith(item.fullRouterPath, '_blank')
        }
    })
})
