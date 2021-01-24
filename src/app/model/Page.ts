import {Paragraph} from './Paragraph';
import {Category} from './Category';
import {Tag} from './Tag';
import {Paratag} from './Paratag';
import {Parapage} from './Parapage';
import {User} from './User';

export class Page {
 constructor(public id: number,
             public user: User,
             public createdAt: Date,
             public title: string,
             public  description: string,
             public paragraphList: Paragraph[],
             public paratagList: Paratag[],
             public parapageList: Parapage[],
             public tagList: Tag[],
             public category: Category) {
 }
}
