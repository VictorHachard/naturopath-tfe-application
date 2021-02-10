import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../../service/Page.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VoteService} from '../../../../service/Vote.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {InnerParagraphService} from '../../../../service/InnerParagraph.service';
import {InnerPageService} from '../../../../service/InnerPage.service';
import {TagTypeService} from '../../../../service/TagType.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {AbstractEdit} from '../../../commons/AbstractEdit';

@Component({
  selector: 'app-addpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent extends AbstractEdit implements OnInit {
  allTagTypeList = [];
  tagTypeListSend = [];
  editInnerPageForm: FormGroup;
  editInnerParagraphForm: FormGroup[];
  editInnerParatagForm: FormGroup[];

  page: any;
  paraTag: any;

  constructor(route: ActivatedRoute,
              router: Router,
              private pageService: PageService,
              private voteService: VoteService,
              private tagTypeService: TagTypeService,
              private innerParagraphService: InnerParagraphService,
              private innerPageService: InnerPageService) {
    super(route, router);
  }

  canVote(inner: any): boolean {
    super.canVote(inner);
    /*for (const paragraph of this.page.paragraphList) {
      if (paragraph.innerParagraphList[paragraph.innerParagraphList.length - 1].id === id) {
        for (const vote of paragraph.innerParagraphList[0].voteList) {
          if (vote.user.username === JSON.parse(localStorage.getItem('currentUser')).username) {
            return false;
          }
        }
      }
    }*/
    return true;
  }

  ngOnInit(): void {
    this.pageService.getEditPageDto(this.id).subscribe(data => {
      console.log(data);
      this.page = data;
      this.init();
    });
    this.tagTypeService.getAllTagType().subscribe(data => {
      this.paraTag = data;
      this.paraTag.forEach( p => { this.allTagTypeList.push(p.name); });
      console.log(this.paraTag);
    });
  }

  init(): void {
    this.editInnerParagraphForm = [];
    this.editInnerParatagForm = [];
    this.editInnerPageForm = new FormGroup({
      titlePage: new FormControl(this.page.innerPageList[0].title,
        [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      descriptionPage: new FormControl(this.page.innerPageList[0].description,
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
      this.editInnerParatagForm.push(new FormGroup({
        titleParaTag: new FormControl(p.paratagType.name,
          [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
        descriptionParaTag: new FormControl(p.paratagType.description,
          [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
      }));
    });
  }

  /*
    InnerPage
   */

  addInnerPage(pageId: number): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    this.innerPageService.addInnerPage(pageId.toString(), {
      description: editInnerPageValue.descriptionPage,
      title: editInnerPageValue.titlePage}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  updateInnerPage(): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    const innerPageId: string = this.page.innerPageList[0].id;
    this.innerPageService.updateInnerPage(innerPageId.toString(), {
      description: editInnerPageValue.descriptionPage,
      title: editInnerPageValue.titlePage}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
  }

  validationInnerPage(): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    const innerPageId: string = this.page.innerPageList[0].id;
    this.innerPageService.validationInnerPage(innerPageId, {
      description: editInnerPageValue.descriptionPage,
      title: editInnerPageValue.titlePage}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  voteInnerPage(id: number, choice: number): void {
    this.voteService.addVote({choice: choice.toString(),
      type: 'InnerPage',
      typeId: id.toString()}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
  }

  addInnerPageMessage(id: number): void {
    const messageInnerValue = this.messageInnerForm.value;
    this.innerPageService.addMessage(id.toString(), {
      content: messageInnerValue.content
    }).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  /*
    InnerParagraph
   */

  addInnerParagraph(index: number, paragraphId: number): void {
    const editInnerParagraphValue = this.editInnerParagraphForm[index].value;
    this.innerParagraphService.addInnerParagraph(paragraphId.toString(), {
      content: editInnerParagraphValue.contentParagraph,
      title: editInnerParagraphValue.titleParagraph}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  updateInnerParagraph(index: number, id: number): void {
    const editInnerParagraphValue = this.editInnerParagraphForm[index].value;
    this.innerParagraphService.updateInnerParagraph(id.toString(), {
      content: editInnerParagraphValue.contentParagraph,
      title: editInnerParagraphValue.titleParagraph}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  validationInnerParagraph(index: number, id: number): void {
    const editInnerParagraphValue = this.editInnerParagraphForm[index].value;

    this.innerParagraphService.validationInnerParagraph(id.toString(), {
      content: editInnerParagraphValue.contentParagraph,
      title: editInnerParagraphValue.titleParagraph}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  voteInnerParagraph(index: number, id: number, choice: number): void {
    this.voteService.addVote({choice: choice.toString(),
      type: 'InnerParagraph',
      typeId: id.toString()}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
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
