import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/shared/interfaces/doctor.interface';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { Rol, Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { DoctoresService } from 'src/app/shared/services/doctores.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  public medico: boolean;
  public paciente: boolean;
  public roles: Rol[];
  public pacienteNuevo?: Paciente;
  public usuarioNuevo?: Usuario;
  public medicoNuevo?: Doctor;
  miFormulario = this._fb.group({
    usuario: ['', [Validators.required, Validators.minLength(3)]],
    pass: ['', [Validators.required, Validators.minLength(3)]],
    rol: ['', [Validators.required, Validators.minLength(1)]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    id: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _pacientesService: PacientesService,
    private _usuariosService: UsuariosService,
    private _doctoresService: DoctoresService
  ) {
    this.medico = false;
    this.paciente = true;
    this.roles = [
      { id: 1, rol: 'paciente' },
      { id: 2, rol: 'medico' },
    ];
  }

  ngOnInit(): void {}
  registro() {

      this.usuarioNuevo = {
        usuario: this.miFormulario.value.usuario,
        pass: this.miFormulario.value.pass,
        rol: this.miFormulario.value.rol
      };
      console.log(this.usuarioNuevo);

      this._usuariosService.registroUsuarios(this.usuarioNuevo).subscribe({
        next: (usuario) => {
          console.log(usuario);



          if (this.paciente) {
            this.pacienteNuevo = {
              dni: this.miFormulario.value.id,
              nombre: this.miFormulario.value.nombre,
              email: this.miFormulario.value.email,
              id_usuario: this.miFormulario.value.usuario,
            };
            this._pacientesService
              .registroPacientes(this.pacienteNuevo)
              .subscribe({
                next: (data) => {},
                error: (err:HttpErrorResponse) => {
                  console.log(err);
                },
              });
          }
          if (this.medico) {
            this.medicoNuevo = {
              numColegiado: this.miFormulario.value.id,
              nombre: this.miFormulario.value.nombre,
              email: this.miFormulario.value.email,
              id_usuario: this.miFormulario.value.usuario
            }
            this._doctoresService.registroDoctores(this.medicoNuevo).subscribe({
              next: (data) => {
                console.log(data);
              },
              error: (err:HttpErrorResponse) => {
                console.log(err);
              }
            });

          }
        },
        error: (err:HttpErrorResponse) => {

          console.log(err);
        },
      });


    //this._router.navigateByUrl('/auth/login');
  }
  obtenerRol() {
    console.log(this.miFormulario.value.rol.rol);

    if (this.miFormulario.value.rol.rol == 'medico') {
      this.medico = true;
      this.paciente = false;
    } else {
      this.medico = false;
      this.paciente = true;
    }
  }
}
