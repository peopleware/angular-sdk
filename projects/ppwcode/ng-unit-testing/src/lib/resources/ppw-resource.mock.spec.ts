import '@angular/compiler'
import { HttpErrorResponse } from '@angular/common/http'
import { signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { PpwResource } from '@ppwcode/ng-resource'
import { PpwResourceMock } from './ppw-resource.mock'

interface TestBody {
    id: number
}

interface TestResult {
    name: string
}

describe('PpwResourceMock', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({})
    })

    afterEach(() => {
        TestBed.resetTestingModule()
    })

    it('should expose a PpwResource instance', () => {
        const mock = PpwResourceMock.create<TestBody, TestResult>({ name: 'Jane' })

        expect(mock.resource).toBeInstanceOf(PpwResource)
    })

    it('should capture stable execute body values', () => {
        const mock = PpwResourceMock.create<TestBody, TestResult>({ name: 'Jane' })
        let body = { id: 1 }

        mock.resource.execute(body)
        body = { id: 2 }

        expect(mock.executions).toHaveLength(1)
        expect(mock.executions[0].isTrackingBody).toBe(false)
        expect(mock.executions[0].body()).toEqual({ id: 1 })
        expect(mock.executions[0].body()).not.toBe(body)
    })

    it('should capture tracking body functions', () => {
        const mock = PpwResourceMock.create<TestBody, TestResult>({ name: 'Jane' })
        const body = signal({ id: 1 })

        mock.resource.track(() => body(), {})

        expect(mock.executions).toHaveLength(1)
        expect(mock.executions[0].isTrackingBody).toBe(true)
        expect(mock.executions[0].body()).toEqual({ id: 1 })

        body.set({ id: 2 })

        expect(mock.executions[0].body()).toEqual({ id: 2 })
    })

    it('should create independent executions for every execute call', () => {
        const mock = PpwResourceMock.create<TestBody, TestResult>({ name: 'Jane' })

        const firstExecution = mock.resource.execute({ id: 1 })
        const secondExecution = mock.resource.execute({ id: 2 })

        expect(mock.executions).toHaveLength(2)
        expect(mock.executions[0].resourceRef).not.toBe(mock.executions[1].resourceRef)
        expect(firstExecution).not.toBe(secondExecution)
    })

    it('should count reloads on the fake ResourceRef backing an execution', () => {
        const mock = PpwResourceMock.create<TestBody, TestResult>({ name: 'Jane' })
        const execution = mock.resource.track(() => ({ id: 1 }), {})

        expect(mock.executions[0].reloadCount).toBe(0)

        execution.reload()

        expect(mock.executions[0].reloadCount).toBe(1)
    })

    it('should toggle isAnyLoading when loading starts and finishes', async () => {
        const mock = PpwResourceMock.create<TestBody, TestResult>({ name: 'Jane' })

        mock.resource.execute({ id: 1 })

        expect(mock.resource.isAnyLoading()).toBe(false)

        mock.startLoading()

        expect(mock.resource.isAnyLoading()).toBe(true)

        await mock.flushSuccess()

        expect(mock.resource.isAnyLoading()).toBe(false)
    })

    it('should flush success and run execution handlers', async () => {
        const mock = PpwResourceMock.create<TestBody, TestResult>({ name: 'Jane' })
        const calls: Array<string> = []
        const execution = mock.resource.execute(
            { id: 1 },
            {
                onSuccess: (value) => calls.push(`success ${value.name}`),
                onFinally: () => calls.push('finally')
            }
        )

        await mock.flushSuccess()

        expect(execution.value()).toEqual({ name: 'Jane' })
        expect(calls).toEqual(['success Jane', 'finally'])
    })

    it('should flush error and run execution handlers', async () => {
        const error = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' })
        const mock = PpwResourceMock.create<TestBody, TestResult>(error)
        const calls: Array<string> = []
        const execution = mock.resource.execute(
            { id: 1 },
            {
                onError: (value) => calls.push(`error ${value.message}`),
                onFinally: () => calls.push('finally')
            }
        )

        await mock.flush()

        expect(execution.error()).toBe(error)
        expect(calls).toEqual([`error ${error.message}`, 'finally'])
    })

    it('should flush parallel executions by index', async () => {
        const mock = PpwResourceMock.create<TestBody, TestResult>()

        mock.resource.execute({ id: 1 })
        mock.resource.execute({ id: 2 })
        mock.startLoading(0)
        mock.startLoading(1)

        expect(mock.resource.isAnyLoading()).toBe(true)

        await mock.flushSuccess({ name: 'First' }, 0)

        expect(mock.resource.isAnyLoading()).toBe(true)

        await mock.flushSuccess({ name: 'Second' }, 1)

        expect(mock.resource.isAnyLoading()).toBe(false)
    })

    it('should not expose test-runner-specific APIs on the helper implementation', () => {
        const source = PpwResourceMock.toString()

        expect(source).not.toContain('vi.')
        expect(source).not.toContain('jasmine')
        expect(source).not.toContain('spyOn')
        expect(source).not.toContain('karma')
    })
})
