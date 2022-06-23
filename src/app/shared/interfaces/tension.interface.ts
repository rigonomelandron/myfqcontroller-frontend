export interface Tension {
  id:         number;
  fecha:      Date;
  paciente:   Paciente;
  maxTension: number;
  minTension: number;
}

export interface Paciente {
  dni:        string;
  nombre:     string;
  email:      string;
  genero:     string;
  peso:       number;
  altura:     number;
  mutacion1:  string;
  mutacion2:  string;
  idUsuario: string;
}
