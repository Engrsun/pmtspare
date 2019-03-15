import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryAddComponent } from './dictionary-add.component';

describe('DictionaryAddComponent', () => {
  let component: DictionaryAddComponent;
  let fixture: ComponentFixture<DictionaryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
