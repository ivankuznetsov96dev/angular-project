import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesCommentsComponent } from './likes-comments.component';

describe('LikesCommentsComponent', () => {
  let component: LikesCommentsComponent;
  let fixture: ComponentFixture<LikesCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikesCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
