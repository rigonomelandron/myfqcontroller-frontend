export interface V02Max {
  id: number;
  fecha: Date;
  paciente: Paciente;
  v02max: number;
  ppmReposo: number;
}

export interface Paciente {
  dni: string;
  nombre: string;
  email: string;
  genero: string;
  peso: number;
  altura: number;
  mutacion1: string;
  mutacion2: string;
  idUsuario: string;
}
