import {ParagraphType} from './ParagraphType';
import {ParapageType} from './ParapageType';
import {ParatagType} from './ParatagType';

export class Category {
  constructor( public id: number,
               public name: string,
               public description: string,
               public childCategory: Category[],
               public paragraphType: ParagraphType[],
               public parapageType: ParapageType[],
               public paratagType: ParatagType[]) {
  }
}
