import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparesEditComponent } from './spares-edit.component';

describe('SparesEditComponent', () => {
  let component: SparesEditComponent;
  let fixture: ComponentFixture<SparesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
