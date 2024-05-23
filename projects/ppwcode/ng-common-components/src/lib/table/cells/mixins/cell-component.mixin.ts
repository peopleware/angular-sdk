import { Constructor } from '@angular/cdk/table'
import { Column } from '../../columns/column'

/**
 * Defines that the implementation has the API of a cell component.
 *
 * Generic type TColumn is the corresponding configuration of the related column.
 * Generic type TValue is the type of value that is expected and defaults to any.
 *      This allows for type safety in the implementation where the component needs to
 *      manipulate the value it was given.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IsCellComponent<TColumn extends Column<any, unknown>, TValue = any> {
    /** The row index of the record in the ngFor loop */
    rowIndex: number
    /** The configuration of the column the cell is related to. */
    column: TColumn
    /** The original record data the cell is rendered for. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    record: { [key: string]: any }
    /** The value for the cell component to continue with. */
    value: TValue
}

/** Defines that it is a constructable component implementing the IsCellComponent interface. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IsCellComponentCtor<TValue> = Constructor<IsCellComponent<Column<any, unknown>, TValue>>

/**
 * Mixin that applies a default cell component implementation on the given class.
 *
 * Generic type TColumn is the corresponding configuration of the related column.
 * Generic type TBase is the type of the class that the implementation will be done for.
 * Generic type TValue is the type of value that is expected and defaults to any.
 *      This allows for type safety in the actual implementation where the component needs to
 *      manipulate the value it was given.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types
export function mixinCellComponent<TColumn extends Column<any, unknown>, TBase extends Constructor<{}>, TValue = any>(
    base?: TBase
): IsCellComponentCtor<TValue> & TBase {
    base ??= class {} as TBase

    return class extends base implements IsCellComponent<TColumn, TValue> {
        public rowIndex!: number
        public column!: TColumn
        public record!: Record<string, unknown>
        public value!: TValue
    }
}
