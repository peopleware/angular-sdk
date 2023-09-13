import { Column } from '../../columns/column'
import { Constructor } from '@angular/cdk/table'

/**
 * Defines that the implementation has the API of a cell component.
 *
 * Generic type T is the corresponding configuration of the related column.
 * Generic type V is the type of value that is expected and defaults to any.
 *      This allows for type safety in the implementation where the component needs to
 *      manipulate the value it was given.
 */
export interface IsCellComponent<T extends Column<any, unknown>, V = any> {
    /** The configuration of the column the cell is related to. */
    column: T
    /** The original record data the cell is rendered for. */
    record: { [key: string]: any }
    /** The value for the cell component to continue with. */
    value: V
}

/** Defines that it is a constructable component implementing the IsCellComponent interface. */
export type IsCellComponentCtor<VT> = Constructor<IsCellComponent<Column<any, unknown>, VT>>

/**
 * Mixin that applies a default cell component implementation on the given class.
 *
 * Generic type T is the corresponding configuration of the related column.
 * Generic type U is the type of the class that the implementation will be done for.
 * Generic type V is the type of value that is expected and defaults to any.
 *      This allows for type safety in the actual implementation where the component needs to
 *      manipulate the value it was given.
 */
export function mixinCellComponent<T extends Column<any, unknown>, U extends Constructor<{}>, V = any>(
    base: U
): IsCellComponentCtor<V> & U {
    return class extends base implements IsCellComponent<T, V> {
        public column!: T
        public record!: Record<string, unknown>
        public value!: V
    }
}
