import {ParagraphType} from './ParagraphType';

export class Paragraph {
 constructor( public id: number,
              public paragraphType: ParagraphType,
              public title: string,
              public content: string) {
 }
}
