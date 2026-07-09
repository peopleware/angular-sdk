import { CdkDrag } from '@angular/cdk/drag-drop'
import { Directive, ElementRef, inject, InjectionToken, input, OnInit, Renderer2, ValueProvider } from '@angular/core'

export const DRAGGABLE_DIALOG_ROOT_ELEMENT_SELECTOR = new InjectionToken<string>(
    'Draggable dialog root element selector',
    { factory: () => '.cdk-overlay-pane' }
)

export const provideDraggableDialogRootElementSelector = (rootElementSelector: string): ValueProvider => ({
    provide: DRAGGABLE_DIALOG_ROOT_ELEMENT_SELECTOR,
    useValue: rootElementSelector
})

@Directive({
    selector: '[ppwDraggableDialog]',
    hostDirectives: [CdkDrag]
})
export class DraggableDialogDirective implements OnInit {
    public readonly rootElementSelector = input(inject(DRAGGABLE_DIALOG_ROOT_ELEMENT_SELECTOR), {
        alias: 'ppwDraggableDialogRootElementSelector'
    })

    #el: ElementRef = inject(ElementRef)
    #renderer: Renderer2 = inject(Renderer2)
    #cdkDrag: CdkDrag = inject(CdkDrag)

    ngOnInit(): void {
        this.#renderer.addClass(this.#el.nativeElement, 'ppw-draggable-dialog')
        this.#cdkDrag.rootElementSelector = this.rootElementSelector()
    }
}
