export interface Antecedente {
  id?: number;
  paciente: Paciente;
  fecha: Date;
  diagnostico: string;
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
