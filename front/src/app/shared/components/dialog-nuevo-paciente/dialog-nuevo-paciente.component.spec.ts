import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNuevoPacienteComponent } from './dialog-nuevo-paciente.component';

describe('DialogNuevoPacienteComponent', () => {
  let component: DialogNuevoPacienteComponent;
  let fixture: ComponentFixture<DialogNuevoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNuevoPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogNuevoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
