import { TestBed } from '@angular/core/testing'
import { FieldTree } from '@angular/forms/signals'

/**
 * Creates a signal form inside Angular's TestBed injection context.
 *
 * Pass a parameterless form factory directly, or pass a single-parameter form factory together with its argument.
 * Wrap the factory in a parameterless callback only when it needs multiple arguments or other dependencies.
 *
 * @param formCreator Form factory to invoke in the injection context.
 * @param args Optional single argument forwarded to the form factory.
 * @returns The initialized signal form tree.
 */
export const initialiseTestForm = <TFormModel, TArguments extends [] | [unknown]>(
    formCreator: (...args: TArguments) => FieldTree<TFormModel>,
    ...args: TArguments
): FieldTree<TFormModel> => TestBed.runInInjectionContext(() => formCreator(...args))
