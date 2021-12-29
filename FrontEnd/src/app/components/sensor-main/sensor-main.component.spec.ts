import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SensorMainComponent} from './sensor-main.component';

describe('SensorsListComponent', () => {
  let component: SensorMainComponent;
  let fixture: ComponentFixture<SensorMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorMainComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
