import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { provideRouter, Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { BreadcrumbService, provideBreadcrumbOptions } from './breadcrumb.service'

@Component({ template: '' })
class BreadcrumbPage {}

describe('BreadcrumbService', () => {
    let service: BreadcrumbService
    let router: Router

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [
                provideBreadcrumbOptions(),
                provideRouter([
                    {
                        path: 'section',
                        title: 'Section',
                        children: [
                            { path: '', component: BreadcrumbPage },
                            { path: 'duplicate', title: 'Section', component: BreadcrumbPage },
                            {
                                path: 'detail',
                                title: 'Section',
                                data: { detailTitle: 'Detail' },
                                component: BreadcrumbPage
                            }
                        ]
                    }
                ])
            ]
        })
        service = TestBed.inject(BreadcrumbService)
        router = TestBed.inject(Router)
    })

    it('adds the first labelled route to an empty breadcrumb list', async () => {
        expect(service.breadcrumbs()).toEqual([])

        await router.navigateByUrl('/section')

        expect(service.breadcrumbs()).toEqual([{ label: 'Section', url: '/section' }])
    })

    it('omits a child with the same label as the preceding breadcrumb', async () => {
        await router.navigateByUrl('/section/duplicate')

        expect(service.breadcrumbs()).toEqual([{ label: 'Section', url: '/section' }])
    })

    it('prefers detailTitle even when the route title repeats the preceding label', async () => {
        await router.navigateByUrl('/section/detail')

        expect(service.breadcrumbs()).toEqual([
            { label: 'Section', url: '/section' },
            { label: 'Detail', url: '/section/detail' }
        ])
    })
})
