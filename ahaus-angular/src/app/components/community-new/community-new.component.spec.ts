import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityNewComponent } from './community-new.component';

describe('CommunityNewComponent', () => {
  let component: CommunityNewComponent;
  let fixture: ComponentFixture<CommunityNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
