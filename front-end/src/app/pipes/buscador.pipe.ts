import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(value: any, arg:any): any {

    if (arg === '' || arg.length < 1) return value;          // filtrar por estado, descripción y rut del paciente
    const resultPosts = [];
    for (const post of value) {
      if (post.estado.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(post);
      };

      if (post.paciente_Rut.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(post);
      };

      if (post.motivo.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(post);
      };

    };
    return resultPosts;
  }
}

