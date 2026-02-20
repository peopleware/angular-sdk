import { KeyValuePipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { natural, noDuplicates, notNull, notUndefined } from '@ppwcode/ng-utils'

@Component({
    selector: 'ppw-utils-demo',
    standalone: true,
    imports: [MatButtonModule, KeyValuePipe],
    templateUrl: './utils-demo.component.html',
    styleUrl: './utils-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilsDemoComponent {
    readonly naturalResults = signal<Record<string, boolean>>({})
    readonly noDuplicatesResults = signal<Record<string, boolean>>({})
    readonly notUndefinedResult = signal<string>('')
    readonly notNullResult = signal<string>('')

    runNatural(): void {
        this.naturalResults.set({
            'natural(0)': natural(0),
            'natural(5)': natural(5),
            'natural(-1)': natural(-1),
            'natural(1.5)': natural(1.5),
            'natural(undefined)': natural(undefined)
        })
    }

    runNoDuplicates(): void {
        this.noDuplicatesResults.set({
            'noDuplicates([1,2,3])': noDuplicates([1, 2, 3]),
            'noDuplicates([1,2,2,3])': noDuplicates([1, 2, 2, 3]),
            "noDuplicates(['a','b'])": noDuplicates(['a', 'b'])
        })
    }

    runNotUndefined(): void {
        const val: string | undefined = 'hello'
        try {
            const result = notUndefined(val)
            this.notUndefinedResult.set(`notUndefined('hello') = ${result}`)
        } catch (e) {
            this.notUndefinedResult.set(`Threw: ${(e as Error).message}`)
        }
    }

    runNotNull(): void {
        const val: string | null = 'world'
        try {
            const result = notNull(val)
            this.notNullResult.set(`notNull('world') = ${result}`)
        } catch (e) {
            this.notNullResult.set(`Threw: ${(e as Error).message}`)
        }
    }
}
