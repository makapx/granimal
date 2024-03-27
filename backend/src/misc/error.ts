export class WebError {
  constructor( public code: number, public scope: string, public data?: any ) {}
}