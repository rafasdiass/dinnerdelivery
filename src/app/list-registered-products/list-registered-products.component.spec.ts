import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegisteredProductsComponent } from './list-registered-products.component';

describe('ListRegisteredProductsComponent', () => {
  let component: ListRegisteredProductsComponent;
  let fixture: ComponentFixture<ListRegisteredProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRegisteredProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRegisteredProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
