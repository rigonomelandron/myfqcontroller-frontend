export interface Deporte {
  id: number;
  fecha: Date;
  paciente: Paciente;
  tipo: string;
  calorias: number;
  ppmMaxima: number;
  tiempo: number;
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
