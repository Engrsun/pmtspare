import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparesDetailComponent } from './spares-detail.component';

describe('SparesDetailComponent', () => {
  let component: SparesDetailComponent;
  let fixture: ComponentFixture<SparesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
