import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePanelComponent } from './archive-panel.component';

describe('ArchivePanelComponent', () => {
  let component: ArchivePanelComponent;
  let fixture: ComponentFixture<ArchivePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivePanelComponent]
    });
    fixture = TestBed.createComponent(ArchivePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
