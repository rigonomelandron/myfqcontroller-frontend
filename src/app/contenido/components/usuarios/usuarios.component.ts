import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public selectedFile!: File ;
  constructor(private _usuariosServices: UsuariosService) { }

  ngOnInit(): void {
  }

  public onFileSelected(event: any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }
  public onUpload() {
    let usuario= localStorage.getItem('usuario');
    if(usuario){
     this._usuariosServices.uploadFoto(usuario, this.selectedFile).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
     });
    }
  }

}
