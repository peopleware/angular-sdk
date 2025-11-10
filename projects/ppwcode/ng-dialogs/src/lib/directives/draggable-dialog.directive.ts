import { CdkDrag } from '@angular/cdk/drag-drop'
import { Directive, ElementRef, inject, OnInit, Renderer2 } from '@angular/core'

@Directive({
    selector: '[ppwDraggableDialog]',
    hostDirectives: [CdkDrag]
})
export class DraggableDialogDirective implements OnInit {
    #el: ElementRef = inject(ElementRef)
    #renderer: Renderer2 = inject(Renderer2)
    #cdkDrag: CdkDrag = inject(CdkDrag)

    ngOnInit(): void {
        this.#renderer.addClass(this.#el.nativeElement, 'ppw-draggable-dialog')
        this.#cdkDrag.rootElementSelector = '.cdk-overlay-pane'
    }
}
