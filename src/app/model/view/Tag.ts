import {TagType} from './TagType';

export class Tag {
  constructor( public id: number,
               public tagType: TagType,
               public name: string,
               public content: string) {
  }
}
