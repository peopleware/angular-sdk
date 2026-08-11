import '@angular/compiler'
import { signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { PpwResource } from '@ppwcode/ng-resource'
import { FacadeMockFactory } from './facade-mock-factory'

interface TestBody {
    id: number
}

interface TestResult {
    name: string
}

class TestFacade {
    public readonly title = signal('original')

    public load(): PpwResource<TestResult | undefined, TestBody> {
        throw new Error('Not implemented')
    }

    public count(): number {
        throw new Error('Not implemented')
    }

    public reset(): void {
        throw new Error('Not implemented')
    }

    public hasPermission(permission: string): boolean {
        throw new Error(`Not implemented: ${permission}`)
    }
}

class ProviderTestFacade {
    public readonly title = signal('original')

    public count(): number {
        throw new Error('Not implemented')
    }
}

describe('FacadeMockFactory', () => {
    afterEach(() => {
        TestBed.resetTestingModule()
    })

    it('should mock facade properties and method return values', () => {
        const factory = FacadeMockFactory.create(TestFacade, () => ({
            title: ['signal', 'mocked'],
            load: ['resource', { name: 'Jane' }],
            count: ['method', 42],
            reset: ['method', undefined],
            hasPermission: ['method', true]
        }))()

        TestBed.configureTestingModule({
            providers: [factory.getProvider()]
        })

        const facade = TestBed.inject(TestFacade)

        expect(facade.title()).toBe('mocked')
        expect(facade.count()).toBe(42)
        expect(facade.reset()).toBeUndefined()
        expect(facade.hasPermission('admin')).toBe(true)
        expect(facade.load()).toBeInstanceOf(PpwResource)
    })

    it('should create spy methods', () => {
        const factory = FacadeMockFactory.create(TestFacade, () => ({
            title: ['signal', 'mocked'],
            load: ['resource', { name: 'Jane' }],
            count: ['method', 42],
            reset: ['method', undefined],
            hasPermission: ['method', true]
        }))()

        TestBed.configureTestingModule({
            providers: [factory.getProvider()]
        })

        const facade = TestBed.inject(TestFacade)

        facade.count()
        facade.reset()
        facade.load()
        facade.hasPermission('admin')

        expect(facade.count).toHaveBeenCalledOnce()
        expect(facade.reset).toHaveBeenCalledOnce()
        expect(facade.load).toHaveBeenCalledOnce()
        expect(facade.hasPermission).toHaveBeenCalledOnce()
    })

    it('should provide the created facade through Angular dependency injection', () => {
        const factory = FacadeMockFactory.create(ProviderTestFacade, () => ({
            title: ['signal', 'mocked'],
            count: ['method', 42]
        }))()

        TestBed.configureTestingModule({
            providers: [factory.getProvider()]
        })

        const facade = TestBed.inject(ProviderTestFacade)

        expect(facade.title()).toBe('mocked')
        expect(facade.count()).toBe(42)
    })
})
