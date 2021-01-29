import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../service/page.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VoteService} from '../../../service/vote.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {InnerparagraphService} from '../../../service/innerparagraph.service';
import {InnerpageService} from '../../../service/innerpage.service';
import {TagtypeService} from '../../../service/tagtype.service';
import {Paratag} from '../../../model/view/Paratag';

@Component({
  selector: 'app-addpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent implements OnInit {

  allParaTagForm: FormGroup[] = [];

  allTagTypeList =  [];
  tagTypeListSend = [];
  editInnerPageForm: FormGroup;
  editInnerParagraphForm: FormGroup[] = [];

  private id: string;

  page: any;

  paraTag: any;

  constructor(private route: ActivatedRoute, private pageService: PageService, private voteService: VoteService, private router: Router, private tagType: TagtypeService,
              private innerParagraph: InnerparagraphService, private innerPage: InnerpageService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageService.getEditPageDto(this.id).subscribe(data => {
      console.log(data);
      this.page = data;
      this.init();
    });
    this.tagType.getAllTagType().subscribe(data => {
      this.paraTag = data;
      this.paraTag.forEach( p => { this.allTagTypeList.push(p.name); });
      console.log(this.paraTag);
    });
  }

  init(): void {
    this.editInnerPageForm = new FormGroup({
      titlePage: new FormControl(this.page.innerPageList[this.page.innerPageList.length - 1].title,
        [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      descriptionPage: new FormControl(this.page.innerPageList[this.page.innerPageList.length - 1].description,
        [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
    });
    this.page.paragraphList.forEach(p => {
      this.editInnerParagraphForm.push(new FormGroup({
        titleParagraph : new FormControl(p.innerParagraphList[p.innerParagraphList.length - 1].title,
          [Validators.required, Validators.minLength(1), Validators.maxLength(1024)]),
        contentParagraph : new FormControl(p.innerParagraphList[p.innerParagraphList.length - 1].content,
          [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
      }));
    });
    this.page.paratagList.forEach(p => {
      this.allParaTagForm.push(new FormGroup({
        titleParaTag: new FormControl(p.paratagType.name,
          [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
        descriptionParaTag: new FormControl(p.paratagType.description,
          [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
      }));
    });
  }

  updateInnerParagraph(index: number, id: number): void {
    const editInnerParagraphValue = this.editInnerParagraphForm[index].value;
    this.innerParagraph.updateInnerParagraph(id.toString(),
      {content: editInnerParagraphValue.contentParagraph,
        title: editInnerParagraphValue.titleParagraph});
  }

  updateInnerPage(): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    const innerPageId: string = this.page.innerPageList[this.page.innerPageList.length - 1].id;
    this.innerPage.updateInnerPage(innerPageId.toString(),
      {content: editInnerPageValue.descriptionPage,
        title: editInnerPageValue.titlePage});
  }

  validationInnerPage(): void {
    const innerPageId: string = this.page.innerPageList[this.page.innerPageList.length - 1].id;
    this.innerPage.validationInnerPage(innerPageId);
  }

  voteInnerPage(id: number, choice: number): void {
    this.voteService.addVote({choice: choice.toString(),
      type: 'InnerPage',
      typeId: id.toString(),
      userId: 1});
  }

  addInnerPage(id: number, pageId: number): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    this.innerPage.addInnerPage({content: editInnerPageValue.descriptionPage,
      paragraphId: pageId.toString(),
      title: editInnerPageValue.titlePage,
      userId: 1});
  }

  validationInnerParagraph(index: number, id: number): void {
    this.innerParagraph.validationInnerParagraph(id.toString());
  }

  voteInnerParagraph(index: number, id: number, choice: number): void {
    this.voteService.addVote({choice: choice.toString(),
      type: 'InnerParagraph',
      typeId: id.toString(),
      userId: 1});
  }

  addInnerParagraph(index: number, id: number, paragraphId: number): void {
    const editInnerParagraphValue = this.editInnerParagraphForm[index].value;
    this.innerParagraph.addInnerParagraph({content: editInnerParagraphValue.contentParagraph,
      paragraphId: paragraphId.toString(),
      title: editInnerParagraphValue.titleParagraph,
      userId: 1});
  }

  dropItem(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
