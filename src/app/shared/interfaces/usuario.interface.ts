export interface Usuario {
  usuario: string;
  pass: string;
  rol: Rol;
}

export interface Rol {
  id: number;
  rol: string;
}

