

export interface Mensaje{

  id?: number;
  idMedico:string;
  idPaciente:string;
  fecha: Date;
  mensaje: string;
  isVisto?: boolean;

}