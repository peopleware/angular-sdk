import { ComponentRef, InputSignal, Type } from '@angular/core'
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing'
import { TranslationObject } from '@ngx-translate/core'
import { provideStaticTranslations } from '../translations/provide-static-translations'

/**
 * Maps a component's signal input properties to the values required by those inputs.
 *
 * Every detected `InputSignal` is required in the resulting bindings object. This makes missing required setup visible
 * at compile time when a fixture is instantiated.
 */
export type InputBindings<TComponent> = {
    [TKey in keyof TComponent as TComponent[TKey] extends InputSignal<unknown>
        ? TKey
        : never]: TComponent[TKey] extends InputSignal<infer TValue> ? TValue : never
}

/**
 * Configures the static translations provided while preparing a component test.
 */
export interface TestTranslationsSettings {
    /** Translation values returned by the test translation loader. */
    translations: TranslationObject

    /** Active and fallback language used by the translation service. */
    language: string
}

const defaultTestTranslationsSettings: TestTranslationsSettings = {
    translations: {},
    language: 'nl'
}

/**
 * Configures and compiles Angular's testing module with deterministic static translations.
 *
 * Existing metadata, including custom imports and providers, is preserved. Translation settings default to an empty
 * Dutch dictionary.
 *
 * @param testModuleMetadata Angular testing-module metadata to configure.
 * @param translationSettings Static translations and language used by the test.
 */
export const prepareTestingModule = async (
    testModuleMetadata: TestModuleMetadata,
    { translations, language }: TestTranslationsSettings = defaultTestTranslationsSettings
): Promise<void> => {
    await TestBed.configureTestingModule({
        ...testModuleMetadata,
        providers: [...(testModuleMetadata.providers ?? []), ...provideStaticTranslations(translations, language)]
    }).compileComponents()
}

/**
 * Creates a component fixture from an already configured TestBed and assigns all supplied signal inputs.
 *
 * This helper does not wait for fixture stability. Use `prepareAndInstantiateTestComponent` when setup, creation, and
 * stabilization should happen as one operation.
 *
 * @param component Component type to instantiate.
 * @param inputBindings Values assigned through `ComponentRef.setInput`.
 * @returns The newly created component fixture.
 */
export const instantiateTestComponent = <TComponent>(
    component: Type<TComponent>,
    inputBindings: InputBindings<TComponent>
): ComponentFixture<TComponent> => {
    const fixture = TestBed.createComponent(component)

    setInputBindings(fixture.componentRef, inputBindings)

    return fixture
}

/**
 * Assigns typed signal-input values to an existing component reference.
 *
 * @param componentRef Component reference that receives the input values.
 * @param inputBindings Input property names and their values.
 */
export function setInputBindings<TComponent>(
    componentRef: ComponentRef<TComponent>,
    inputBindings: InputBindings<TComponent>
): void
export function setInputBindings<TComponent>(
    componentRef: ComponentRef<TComponent>,
    inputBindings: Partial<InputBindings<TComponent>>
): void
export function setInputBindings<TComponent>(componentRef: ComponentRef<TComponent>, inputBindings: object): void {
    Object.entries(inputBindings).forEach(([binding, value]) => {
        componentRef.setInput(binding, value)
    })
}

/**
 * Configures TestBed, creates a component with its signal inputs, and waits until the fixture is stable.
 *
 * Use this variant when the test requires custom imports or providers in addition to the component under test.
 *
 * @param testModuleMetadata Angular testing-module metadata to configure.
 * @param component Component type to instantiate.
 * @param inputBindings Values assigned to the component's signal inputs.
 * @param translationSettings Static translations and language used by the test.
 * @returns A stable component fixture ready to query or interact with.
 */
export const prepareAndInstantiateTestComponent = async <TComponent>(
    testModuleMetadata: TestModuleMetadata,
    component: Type<TComponent>,
    inputBindings: InputBindings<TComponent>,
    translationSettings: TestTranslationsSettings = defaultTestTranslationsSettings
): Promise<ComponentFixture<TComponent>> => {
    await prepareTestingModule(testModuleMetadata, translationSettings)
    const fixture = instantiateTestComponent(component, inputBindings)
    fixture.detectChanges()
    await fixture.whenStable()
    return fixture
}

/**
 * Configures and creates a standalone component using only the component import and its signal inputs.
 *
 * Use `prepareAndInstantiateTestComponent` instead when additional TestBed imports or providers are required.
 *
 * @param component Standalone component type to import and instantiate.
 * @param inputBindings Values assigned to the component's signal inputs.
 * @param translationSettings Static translations and language used by the test.
 * @returns A stable component fixture ready to query or interact with.
 */
export const prepareAndInstantiateDefaultTestComponent = async <TComponent>(
    component: Type<TComponent>,
    inputBindings: InputBindings<TComponent>,
    translationSettings: TestTranslationsSettings = defaultTestTranslationsSettings
): Promise<ComponentFixture<TComponent>> =>
    prepareAndInstantiateTestComponent({ imports: [component] }, component, inputBindings, translationSettings)
