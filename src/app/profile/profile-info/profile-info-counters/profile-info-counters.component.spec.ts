import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoCountersComponent } from './profile-info-counters.component';

describe('ProfileInfoCountersComponent', () => {
  let component: ProfileInfoCountersComponent;
  let fixture: ComponentFixture<ProfileInfoCountersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileInfoCountersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInfoCountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
