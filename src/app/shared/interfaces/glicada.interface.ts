export interface Glicada {
  id: number;
  fecha: Date;
  paciente: Paciente;
  glicada: number;
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
  id_usuario: string;
}
