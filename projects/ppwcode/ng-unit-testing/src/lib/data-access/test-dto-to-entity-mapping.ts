export interface DtoToEntityMappingTest<TDto, TEntity> {
    // Lambda that will create the dto.
    createDto: () => TDto
    // Mapping function that will map the dto to entity.
    map: (dto: TDto) => TEntity
    // The expected entity value.
    expected: TEntity
}

/**
 * Defines the standardized happy-path test for a complete DTO-to-entity mapping.
 *
 * This helper registers an `it` test. Keep exceptional mapping scenarios, such as null handling or default values,
 * in explicit, descriptively named tests in the owning spec.
 */
export const testDtoToEntityMapping = <TDto, TEntity>({
    createDto,
    map,
    expected
}: DtoToEntityMappingTest<TDto, TEntity>): void => {
    it('should map from dto to entity', () => {
        const dto = createDto()
        const entity = map(dto)

        expect(entity).toEqual(expected)
    })
}
