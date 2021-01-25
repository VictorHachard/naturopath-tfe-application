import {Tag} from './Tag';
import {ParatagType} from './ParatagType';

export class Paratag {
  constructor( public paratagType: ParatagType,
               public title: string,
               public content: string,
               public tagList: Tag[]) {
  }
}
