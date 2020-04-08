export class Student {
    codigo: string;
    cedula: string;
    edad: number;
    direccion: string;
    telefono: string;
  
    constructor(codigo: string, cedula: string, edad: number, direccion: string, telefono: string){
      this.codigo = codigo;
      this.cedula = cedula;
      this.edad = edad;
      this.direccion = direccion;
      this.telefono = telefono;
    }
}