import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BakeriesPage } from './bakeries.page';

describe('BakeriesPage', () => {
  let component: BakeriesPage;
  let fixture: ComponentFixture<BakeriesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BakeriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
