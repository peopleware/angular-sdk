import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop'
import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { DraggableDialogDirective, provideDraggableDialogRootElementSelector } from './draggable-dialog.directive'

@Component({
    template: `
        <div ppwDraggableDialog>
            <h2 cdkDragHandle mat-dialog-title>Draggable dialog</h2>
        </div>
    `,
    imports: [CdkDragHandle, DraggableDialogDirective, MatDialogModule]
})
class TestDraggableDialogComponent {}

@Component({
    template: `
        <div ppwDraggableDialog [ppwDraggableDialogRootElementSelector]="rootElementSelector">
            <h2 cdkDragHandle>Draggable dialog</h2>
        </div>
    `,
    imports: [CdkDragHandle, DraggableDialogDirective]
})
class TestConfiguredDraggableDialogComponent {
    rootElementSelector = '.custom-dialog-root'
}

describe('DraggableDialogDirective', () => {
    afterEach(() => {
        TestBed.inject(MatDialog, null)?.closeAll()
        document.querySelectorAll('.cdk-overlay-container').forEach((element) => element.remove())
    })

    it('should use the CDK overlay pane as drag root by default', () => {
        const fixture = createComponent(TestDraggableDialogComponent)
        const cdkDrag = fixture.debugElement.query(By.directive(CdkDrag)).injector.get(CdkDrag)

        expect(cdkDrag.rootElementSelector).toBe('.cdk-overlay-pane')
    })

    it('should allow configuring the drag root selector', () => {
        const fixture = createComponent(TestConfiguredDraggableDialogComponent)
        const cdkDrag = fixture.debugElement.query(By.directive(CdkDrag)).injector.get(CdkDrag)

        expect(cdkDrag.rootElementSelector).toBe('.custom-dialog-root')
    })

    it('should allow configuring the application default drag root selector', () => {
        TestBed.configureTestingModule({
            imports: [TestDraggableDialogComponent],
            providers: [provideNoopAnimations(), provideDraggableDialogRootElementSelector('.application-dialog-root')]
        })

        const fixture = TestBed.createComponent(TestDraggableDialogComponent)
        fixture.detectChanges()
        const cdkDrag = fixture.debugElement.query(By.directive(CdkDrag)).injector.get(CdkDrag)

        expect(cdkDrag.rootElementSelector).toBe('.application-dialog-root')
    })

    it('should start dragging an opened Material dialog without crashing', () => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule, TestDraggableDialogComponent],
            providers: [provideNoopAnimations()]
        })

        const dialog = TestBed.inject(MatDialog)
        dialog.open(TestDraggableDialogComponent)

        const handle = document.querySelector('h2') as HTMLElement
        expect(handle).toBeTruthy()

        expect(() => {
            dispatchDragEvent(handle, 'mousedown', 10, 10)
            dispatchDragEvent(document, 'mousemove', 40, 40)
            dispatchDragEvent(document, 'mouseup', 40, 40)
        }).not.toThrow()
    })
})

function createComponent<T>(component: new () => T): ComponentFixture<T> {
    TestBed.configureTestingModule({
        imports: [component],
        providers: [provideNoopAnimations()]
    })

    const fixture = TestBed.createComponent(component)
    fixture.detectChanges()

    return fixture
}

function dispatchDragEvent(target: EventTarget, type: string, clientX: number, clientY: number): void {
    target.dispatchEvent(
        new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            clientX,
            clientY,
            button: 0,
            buttons: type === 'mouseup' ? 0 : 1
        })
    )
}
