import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResulttableComponent } from './resulttable.component';

describe('ResulttableComponent', () => {
  let component: ResulttableComponent;
  let fixture: ComponentFixture<ResulttableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResulttableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResulttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
