import {Paragraph} from './Paragraph';
import {Category} from './Category';
import {Tag} from './Tag';
import {Paratag} from './Paratag';
import {Parapage} from './Parapage';

export class Page {
  createdAt: Date;
  title: string;
  description: string;
  paragraphList: Paragraph[];
  paratagList: Paratag[];
  parapareList: Parapage[];
  tagList: Tag[];
  category: Category;
}
