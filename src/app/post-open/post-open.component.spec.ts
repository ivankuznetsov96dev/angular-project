import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOpenComponent } from './post-open.component';

describe('PostOpenComponent', () => {
  let component: PostOpenComponent;
  let fixture: ComponentFixture<PostOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
