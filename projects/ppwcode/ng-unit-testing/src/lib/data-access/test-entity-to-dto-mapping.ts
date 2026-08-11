export interface EntityToDtoMappingTest<TEntity, TDto> {
    // Lambda that will create the entity.
    createEntity: () => TEntity
    // Mapping function that will map the entity to dto.
    map: (entity: TEntity) => TDto
    // The expected dto value.
    expected: TDto
}

/**
 * Defines the standardized happy-path test for a complete entity-to-DTO mapping.
 *
 * This helper registers an `it` test. Keep exceptional mapping scenarios, such as null handling or derived values,
 * in explicit, descriptively named tests in the owning spec.
 */
export const testEntityToDtoMapping = <TEntity, TDto>({
    createEntity,
    map,
    expected
}: EntityToDtoMappingTest<TEntity, TDto>): void => {
    it('should map from entity to dto', () => {
        const entity = createEntity()
        const dto = map(entity)

        expect(dto).toEqual(expected)
    })
}
