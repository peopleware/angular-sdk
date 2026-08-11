import { Resource, ResourceRef } from '@angular/core'

/**
 * Represents a type alias `PpwResourceSource` that combines the properties
 * and behavior of a `Resource` with the `reload` method from `ResourceRef`.
 *
 * This is primarily used for defining resources that can be reloaded in
 * addition to the main functionalities provided by the `Resource`.
 *
 * @template TResult The type of the resource content managed by this source.
 */
export type PpwResourceSource<TResult> = Resource<TResult> & Pick<ResourceRef<TResult>, 'reload'>
