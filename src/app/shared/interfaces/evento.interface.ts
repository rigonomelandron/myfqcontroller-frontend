export interface Evento {
  id?: number;
  fecha: Date;
  paciente: Paciente;
  descripcion: string;
  importancia: number;
}

export interface Paciente {
  dni: string;
  nombre: string;
  email: string;
  genero?: string;
  peso?: number;
  altura?: number;
  mutacion1?: string;
  mutacion2?: string;
  idUsuario: string;
}
