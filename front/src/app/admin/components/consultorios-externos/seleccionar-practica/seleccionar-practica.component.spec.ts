import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarPracticaComponent } from './seleccionar-practica.component';

describe('SeleccionarPracticaComponent', () => {
  let component: SeleccionarPracticaComponent;
  let fixture: ComponentFixture<SeleccionarPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarPracticaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeleccionarPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
