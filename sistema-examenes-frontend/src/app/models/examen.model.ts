export class Categoria {
  constructor(
    public id: number = 0,
    public titulo: string = '',
    public descripcion: string = ''
  ) {}
}

export class Examen {
  constructor(
    public activo: boolean = false,
    public descripcion: string = '',
    public id: number = 0,
    public categoria: Categoria = new Categoria(),
    public numeroDePreguntas: number = 0,
    public puntosMaximo: number = 0,
    public titulo: string = ''
  ) {}
}

export class Pregunta {
  constructor(
    public id: number = 0,
    public contenido: string = '',
    public opcion1: string = '',
    public opcion2: string = '',
    public opcion3: string = '',
    public opcion4: string = '',
    public respuesta: string = '',
    public respuestaDada: String = '',
    public examen: Examen = new Examen()
  ) {}
}
