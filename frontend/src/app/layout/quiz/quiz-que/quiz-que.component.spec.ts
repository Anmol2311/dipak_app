import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQueComponent } from './quiz-que.component';

describe('QuizQueComponent', () => {
  let component: QuizQueComponent;
  let fixture: ComponentFixture<QuizQueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizQueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
