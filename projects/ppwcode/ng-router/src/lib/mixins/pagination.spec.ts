import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { mixinPagination, CanPage } from './pagination';
import { providePaginationOptions } from '../pagination-options';
import { PageEvent } from '@angular/material/paginator';
import { RelativeNavigationCtor } from '../relative-navigation';

@Component({
  template: '',
})
class TestComponent {}

describe('PaginationMixin', () => {
  let component: CanPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TestComponent],
      providers: [
        providePaginationOptions(),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestComponent);
    const TestClass = mixinPagination(TestComponent as RelativeNavigationCtor);
    component = new TestClass();
  });

  it('should use default pagination options', async () => {
    spyOn(component, 'relativeNavigation').and.returnValue(Promise.resolve(true));
    await component.navigateToPage(2);
    expect(component.relativeNavigation).toHaveBeenCalledWith([], {
      queryParams: { page: 2 },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
      replaceUrl: true,
    });
  });

  it('should use custom pagination options', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TestComponent],
      providers: [
        providePaginationOptions({ skipLocationChange: true, replaceUrl: false }),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestComponent);
    const TestClass = mixinPagination(TestComponent as RelativeNavigationCtor);
    component = new TestClass();

    spyOn(component, 'relativeNavigation').and.returnValue(Promise.resolve(true));
    await component.navigateToPage(2);
    expect(component.relativeNavigation).toHaveBeenCalledWith([], {
      queryParams: { page: 2 },
      queryParamsHandling: 'merge',
      skipLocationChange: true,
      replaceUrl: false,
    });
  });
});
