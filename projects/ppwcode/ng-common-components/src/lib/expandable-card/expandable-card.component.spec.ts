import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { InputSignal, Type } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExpandableCardComponent } from '@ppwcode/ng-common-components'

type InputSignalValues<T> = {
    [K in keyof T]: T[K] extends InputSignal<infer U> ? U : never
}

describe('Expandable card', () => {
    it('should support an open card that cannot be collapsed', async () => {
        const { loader } = createComponent(ExpandableCardComponent, {
            canBeCollapsed: false,
            openAsExpanded: true
        })

        const expansionPanel = await loader.getHarness(MatExpansionPanelHarness)
        expect(await expansionPanel.isExpanded()).toBe(true)

        await expansionPanel.collapse()
        expect(await expansionPanel.isExpanded()).toBe(true)
    })

    it('should support an open card that can be collapsed', async () => {
        const { loader } = createComponent(ExpandableCardComponent, {
            canBeCollapsed: true,
            openAsExpanded: true
        })

        const expansionPanel = await loader.getHarness(MatExpansionPanelHarness)
        expect(await expansionPanel.isExpanded()).toBe(true)

        await expansionPanel.collapse()
        expect(await expansionPanel.isExpanded()).toBe(false)

        await expansionPanel.expand()
        expect(await expansionPanel.isExpanded()).toBe(true)
    })

    it('should support a closed card that cannot be expanded', async () => {
        const { loader } = createComponent(ExpandableCardComponent, {
            canBeCollapsed: false,
            openAsExpanded: false
        })

        const expansionPanel = await loader.getHarness(MatExpansionPanelHarness)
        expect(await expansionPanel.isExpanded()).toBe(false)

        await expansionPanel.expand()
        expect(await expansionPanel.isExpanded()).toBe(false)
    })

    it('should support a closed card that can be expanded', async () => {
        const { loader } = createComponent(ExpandableCardComponent, {
            canBeCollapsed: true,
            openAsExpanded: false
        })

        const expansionPanel = await loader.getHarness(MatExpansionPanelHarness)
        expect(await expansionPanel.isExpanded()).toBe(false)

        await expansionPanel.expand()
        expect(await expansionPanel.isExpanded()).toBe(true)

        await expansionPanel.collapse()
        expect(await expansionPanel.isExpanded()).toBe(false)
    })
})

const createComponent = <T>(
    componentType: Type<T>,
    inputs: Partial<InputSignalValues<T>>
): {
    fixture: ComponentFixture<T>
    component: T
    loader: HarnessLoader
} => {
    TestBed.configureTestingModule({
        imports: [componentType, NoopAnimationsModule]
    })

    const fixture = TestBed.createComponent(componentType)

    Object.keys(inputs).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fixture.componentRef.setInput(key, inputs[key])
    })

    return {
        fixture,
        component: fixture.componentInstance,
        loader: TestbedHarnessEnvironment.loader(fixture)
    }
}
