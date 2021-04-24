import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPoolComponent } from './posts-pool.component';

describe('PostsPoolComponent', () => {
  let component: PostsPoolComponent;
  let fixture: ComponentFixture<PostsPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsPoolComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
