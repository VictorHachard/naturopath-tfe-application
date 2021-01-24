import {TagType} from './TagType';

export class ParatagType {
  constructor( public size: string,
               public name: string,
               public  description: string,
               public tagType: TagType) {
  }
}
