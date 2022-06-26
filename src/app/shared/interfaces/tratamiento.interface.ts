export interface Tratamiento {
  id?: number;
  paciente: Paciente;
  descripcion: string;
  fecha: Date;
  archivo: string;
  oral: boolean;
  inhalado: boolean;
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
