import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopGovcoComponent } from './top-govco.component';

describe('TopGovcoComponent', () => {
  let component: TopGovcoComponent;
  let fixture: ComponentFixture<TopGovcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopGovcoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopGovcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
