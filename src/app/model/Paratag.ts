import {Tag} from './Tag';
import {ParatagType} from './ParatagType';

export class Paratag {
  id: number;
  paratagType: ParatagType;
  title: string;
  content: string;
  tagList: Tag[];
}
