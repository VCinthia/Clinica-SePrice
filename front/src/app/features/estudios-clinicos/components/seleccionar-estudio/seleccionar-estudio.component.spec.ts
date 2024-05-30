import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarEstudioComponent } from './seleccionar-estudio.component';

describe('SeleccionarEstudioComponent', () => {
  let component: SeleccionarEstudioComponent;
  let fixture: ComponentFixture<SeleccionarEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarEstudioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeleccionarEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
