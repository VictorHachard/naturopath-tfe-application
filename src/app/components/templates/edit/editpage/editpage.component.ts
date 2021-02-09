import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../../service/Page.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VoteService} from '../../../../service/Vote.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {InnerParagraphService} from '../../../../service/InnerParagraph.service';
import {InnerPageService} from '../../../../service/InnerPage.service';
import {TagTypeService} from '../../../../service/TagType.service';

@Component({
  selector: 'app-addpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent implements OnInit {

  allParaTagForm: FormGroup[] = [];

  allTagTypeList = [];
  tagTypeListSend = [];
  editInnerPageForm: FormGroup;
  editInnerParagraphForm: FormGroup[] = [];

  private id: string;

  page: any;

  paraTag: any;

  constructor(private route: ActivatedRoute,
              private pageService: PageService,
              private voteService: VoteService,
              private router: Router,
              private tagType: TagTypeService,
              private innerParagraph: InnerParagraphService,
              private innerPage: InnerPageService) { }

  canVote(id: string): boolean {
    if (JSON.parse(localStorage.getItem('currentUser')).roleList.includes('ROLE_OWNER')) {
      return true;
    }
    if (!JSON.parse(localStorage.getItem('currentUser')).roleList.includes('ROLE_ADMINISTRATOR') ||
      this.page.user.username === JSON.parse(localStorage.getItem('currentUser')).username) {
      return false;
    }
    if (this.page.innerPageList[0].id === id) {
      for (const vote of this.page.innerPageList[0].voteList) {
        if (vote.user.username === JSON.parse(localStorage.getItem('currentUser')).username) {
          return false;
        }
      }
    }
    for (const paragraph of this.page.paragraphList) {
      if (paragraph.innerParagraphList[paragraph.innerParagraphList.length - 1].id === id) {
        for (const vote of paragraph.innerParagraphList[0].voteList) {
          if (vote.user.username === JSON.parse(localStorage.getItem('currentUser')).username) {
            return false;
          }
        }
      }
    }
    return true;
  }

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

  /*
    InnerPage
   */

  addInnerPage(pageId: number): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    this.innerPage.addInnerPage(pageId.toString(), {
      description: editInnerPageValue.descriptionPage,
      title: editInnerPageValue.titlePage}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  updateInnerPage(): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    const innerPageId: string = this.page.innerPageList[this.page.innerPageList.length - 1].id;
    this.innerPage.updateInnerPage(innerPageId.toString(), {
      description: editInnerPageValue.descriptionPage,
      title: editInnerPageValue.titlePage}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
  }

  validationInnerPage(): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    const innerPageId: string = this.page.innerPageList[this.page.innerPageList.length - 1].id;
    this.innerPage.validationInnerPage(innerPageId, {
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

  /*
    InnerParagraph
   */

  addInnerParagraph(index: number, paragraphId: number): void {
    const editInnerParagraphValue = this.editInnerParagraphForm[index].value;
    this.innerParagraph.addInnerParagraph(paragraphId.toString(), {
      content: editInnerParagraphValue.contentParagraph,
      title: editInnerParagraphValue.titleParagraph}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  updateInnerParagraph(index: number, id: number): void {
    const editInnerParagraphValue = this.editInnerParagraphForm[index].value;
    this.innerParagraph.updateInnerParagraph(id.toString(), {
      content: editInnerParagraphValue.contentParagraph,
      title: editInnerParagraphValue.titleParagraph}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  validationInnerParagraph(index: number, id: number): void {
    const editInnerParagraphValue = this.editInnerParagraphForm[index].value;

    this.innerParagraph.validationInnerParagraph(id.toString(), {
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
