import { CdkDrag, CdkDragHandle, CdkDragPlaceholder, CdkDropList } from '@angular/cdk/drag-drop'
import { NgForOf, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatRippleModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { DynamicCellDirective } from './cells/directives/dynamic-cell.directive'
import { PpwColumnCellDirective } from './column-directives/ppw-column-cell.directive'
import { PpwColumnHeaderDirective } from './column-directives/ppw-column-header.directive'
import { PpwColumnDirective } from './column-directives/ppw-column.directive'
import { TableComponent } from './table.component'

@NgModule({
    declarations: [TableComponent, PpwColumnDirective, PpwColumnHeaderDirective, PpwColumnCellDirective],
    imports: [
        MatTableModule,
        CdkDropList,
        MatIconModule,
        CdkDragHandle,
        MatRippleModule,
        MatCheckboxModule,
        NgStyle,
        DynamicCellDirective,
        CdkDrag,
        NgIf,
        NgForOf,
        NgTemplateOutlet,
        CdkDragPlaceholder
    ],
    exports: [TableComponent, PpwColumnDirective, PpwColumnHeaderDirective, PpwColumnCellDirective]
})
export class PpwTableModule {}
