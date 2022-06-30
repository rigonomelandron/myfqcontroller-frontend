export interface Usuario {
  usuario: string;
  pass: string;
  rol: Rol;
  foto?: String;
}

export interface Rol {
  id: number;
  rol: string;
}

