import {ParagraphType} from './ParagraphType';
import {ParapageType} from './ParapageType';
import {ParatagType} from './ParatagType';

export class Category {
  id: number;
  name: string;
  description: string;
  childCategory: Category[];
  paragraphType: ParagraphType[];
  parapageType: ParapageType[];
  paratagType: ParatagType[];
}
