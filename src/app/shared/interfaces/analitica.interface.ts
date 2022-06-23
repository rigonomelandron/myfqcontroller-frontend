export interface Analitica {
  id:       number;
  fecha:    Date;
  paciente: Paciente;
  tipo:     string;
  archivo:  string;
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
  id_usuario: string;
}

