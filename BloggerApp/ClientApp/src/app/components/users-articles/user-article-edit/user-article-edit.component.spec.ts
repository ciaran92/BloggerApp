import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserArticleEditComponent } from './user-article-edit.component';

describe('UserArticleEditComponent', () => {
  let component: UserArticleEditComponent;
  let fixture: ComponentFixture<UserArticleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserArticleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserArticleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
