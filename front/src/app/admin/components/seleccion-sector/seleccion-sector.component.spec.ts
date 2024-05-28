import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionSectorComponent } from './seleccion-sector.component';

describe('SeleccionSectorComponent', () => {
  let component: SeleccionSectorComponent;
  let fixture: ComponentFixture<SeleccionSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionSectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeleccionSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
