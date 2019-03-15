import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparesAddComponent } from './spares-add.component';

describe('SparesAddComponent', () => {
  let component: SparesAddComponent;
  let fixture: ComponentFixture<SparesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
