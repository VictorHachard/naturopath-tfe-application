import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../../service/Page.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VoteService} from '../../../../service/Vote.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {InnerParagraphService} from '../../../../service/InnerParagraph.service';
import {InnerPageService} from '../../../../service/InnerPage.service';
import {TagTypeService} from '../../../../service/TagType.service';
import {AbstractEdit} from '../../../commons/AbstractEdit';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageService} from '../../../../service/Image.service';
import {TagService} from '../../../../service/Tag.service';
import {InnerParatagService} from '../../../../service/InnerParatag.service';
import {DomSanitizer} from '@angular/platform-browser';
import {InnerParapageService} from '../../../../service/inner-parapage.service';

@Component({
  selector: 'app-addpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent extends AbstractEdit implements OnInit {

  private id: string;
  allTagTypeList = new Map(); // {before : any[], after : any[]}
  allParaTypeList = new Map(); // {before : any[], after : any[]}

  editInnerPageForm: FormGroup;
  editInnerParagraphForm: FormGroup[];
  messageInnerFormParatag: FormGroup[];
  messageInnerFormParagraph: FormGroup[];
  messageInnerFormParapage: FormGroup[];
  editInnerParatagForm: FormGroup[];
  editInnerParapageForm: FormGroup[];
  imageList = [];

  page: any;
  pages;
  pagesMap = new Map();
  imageId: any;
  paraTag: any;

  constructor(private sanitizer: DomSanitizer,
              private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private pageService: PageService,
              private voteService: VoteService,
              private tagService: TagService,
              private tagTypeService: TagTypeService,
              private innerParagraphService: InnerParagraphService,
              private innerPageService: InnerPageService,
              private innerParatagService: InnerParatagService,
              private imageService: ImageService,
              private innerParapageService: InnerParapageService) {
    super();
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageService.getEditPageDto(this.id).subscribe(data => {
      console.log('*********** PAGE LIST ***********');
      console.log(data);
      this.page = data;
      for (const paratag of this.page.paratagList) {
        this.tagService.getAllTagByTagType(paratag.paratagType.tagType.id).subscribe(data1 => {
          const beforeNamesTmp = [];
          const afterNamesTmp = [];
          for (const tag of data1) {
            beforeNamesTmp.push(tag.name);
            for (const tag2 of paratag.innerParatagList[paratag.innerParatagList.length - 1].tagList) {
              if (tag2.name === tag.name) {
                beforeNamesTmp.pop();
                afterNamesTmp.push(tag.name);
              }
            }
          }
          this.allTagTypeList.set(paratag.paratagType.tagType.name, { after : [], before : data1, afterNames : afterNamesTmp, beforeNames : beforeNamesTmp});
          if (paratag.id === this.page.paratagList[this.page.paratagList.length - 1].id) {
            console.log('*********** TAGS BY TAGTYPE LIST ***********');
            console.log(this.allTagTypeList);
          }
        });
      }

      this.pageService.getAllSimplifiedDto().subscribe(value => {
        this.pagesMap = new Map();
        console.log(value);
        for (const page of value) {
          if (page !== null) { //car pas edit
            this.pagesMap.set(page.id , page);
          }
        }
        console.log(this.pagesMap);

        for (const parapage of this.page.parapageList) {
          const beforeNIdTmp2 = [];
          const afterIdTmp2 = [];
          for (const page of value) {
            if (page !== null) { //car pas edit
              beforeNIdTmp2.push(page.id);
              for (const page2 of parapage.innerParapageList[parapage.innerParapageList.length - 1].pageList) {
                if (page2.id === page.id) {
                  beforeNIdTmp2.pop();
                  afterIdTmp2.push(page.id);
                }
              }
            }
          }
          this.allParaTypeList.set(parapage.parapageType.name, { afterId : afterIdTmp2, beforeId : beforeNIdTmp2});
        }
        console.log('*********** allParaTypeList LIST ***********');
        console.log(this.allParaTypeList);
        this.pages = value;
      });

      this.imageService.getAllImageDto().subscribe(value => {
        this.imageList = value;
        this.imageId = this.page.innerPageList[0].image == null ? undefined : this.page.innerPageList[0].image.parentId;
        console.log('*********** IMAGE LIST ***********');
        console.log(value);
        this.init();
      }, error => {
        this.init();
      });
    });
  }

  init(): void {
    super.init();
    this.messageInnerFormParatag = [];
    this.messageInnerFormParagraph = [];
    this.messageInnerFormParapage = [];
    this.editInnerParagraphForm = [];
    this.editInnerParatagForm = [];
    this.editInnerParapageForm = [];
    this.page.paratagList.forEach(p => {
      this.messageInnerFormParatag.push(new FormGroup({
        content: new FormControl('',
          [Validators.required, Validators.minLength(8), Validators.maxLength(2048)])
      }));
    });
    this.page.paragraphList.forEach(p => {
      this.messageInnerFormParagraph.push(new FormGroup({
        content: new FormControl('',
          [Validators.required, Validators.minLength(8), Validators.maxLength(2048)])
      }));
    });
    this.page.parapageList.forEach(p => {
      this.messageInnerFormParapage.push(new FormGroup({
        content: new FormControl('',
          [Validators.required, Validators.minLength(8), Validators.maxLength(2048)])
      }));
    });
    this.editInnerPageForm = new FormGroup({
      titlePage: new FormControl(this.page.innerPageList[0].title,
        [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      descriptionPage: new FormControl(this.page.innerPageList[0].description,
        [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
      imagePage: new FormControl(this.page.innerPageList[0].image == null ? '' : this.page.innerPageList[0].image.parentId,
        [Validators.required]),
    });
    this.page.paragraphList.forEach(p => {
      this.editInnerParagraphForm.push(new FormGroup({
        titleParagraph : new FormControl(p.innerParagraphList[0].title,
          [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
        contentParagraph : new FormControl(p.innerParagraphList[0].content,
          [Validators.required, Validators.minLength(128), Validators.maxLength(8182)]),
      }));
    });
    this.page.paratagList.forEach(p => {
      this.editInnerParatagForm.push(new FormGroup({
        titleParatag: new FormControl(p.innerParatagList[0].title,
          [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
        contentParatag: new FormControl(p.innerParatagList[0].content,
          [Validators.required, Validators.minLength(64), Validators.maxLength(8182)]),
      }));
    });
    this.page.parapageList.forEach(p => {
      this.editInnerParapageForm.push(new FormGroup({
        titleParapage: new FormControl(p.innerParapageList[0].title,
          [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
        contentParapage: new FormControl(p.innerParapageList[0].content,
          [Validators.required, Validators.minLength(64), Validators.maxLength(8182)]),
      }));
    });
  }

  /*
    InnerPage
   */

  addInnerPage(pageId: number): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    this.innerPageService.addInner(pageId.toString(), {
      description: editInnerPageValue.descriptionPage,
      title: editInnerPageValue.titlePage,
      imageId: editInnerPageValue.imagePage}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  updateInnerPage(): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    const innerPageId: string = this.page.innerPageList[0].id;
    this.innerPageService.updateInner(innerPageId.toString(), {
      description: editInnerPageValue.descriptionPage,
      title: editInnerPageValue.titlePage,
      imageId: editInnerPageValue.imagePage}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
  }

  validationInnerPage(): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    const innerPageId: string = this.page.innerPageList[0].id;
    this.innerPageService.validationInner(innerPageId, {
      description: editInnerPageValue.descriptionPage,
      title: editInnerPageValue.titlePage,
      imageId: editInnerPageValue.imagePage}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  voteInnerPage(id: number, choice: number): void {
    if (choice === 0) {
      this.addInnerPageMessage(id);
    }
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
    this.innerParagraphService.addInner(paragraphId.toString(), {
      content: editInnerParagraphValue.contentParagraph,
      title: editInnerParagraphValue.titleParagraph}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  updateInnerParagraph(index: number, id: number): void {
    const editInnerParagraphValue = this.editInnerParagraphForm[index].value;
    this.innerParagraphService.updateInner(id.toString(), {
      content: editInnerParagraphValue.contentParagraph,
      title: editInnerParagraphValue.titleParagraph}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  validationInnerParagraph(index: number, id: number): void {
    const editInnerParagraphValue = this.editInnerParagraphForm[index].value;

    this.innerParagraphService.validationInner(id.toString(), {
      content: editInnerParagraphValue.contentParagraph,
      title: editInnerParagraphValue.titleParagraph}).subscribe(value => {
        this.ngOnInit();
    }, error => {

    });
  }

  voteInnerParagraph(index: number, id: number, choice: number): void {
    if (choice === 0) {
      this.addInnerParagraphMessage(index, id);
    }
    this.voteService.addVote({choice: choice.toString(),
      type: 'InnerParagraph',
      typeId: id.toString()}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
  }

  addInnerParagraphMessage(index: number, id: number): void {
    const messageInnerValue = this.messageInnerFormParagraph[index].value;
    this.innerParagraphService.addMessage(id.toString(), {
      content: messageInnerValue.content
    }).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  /* images */

  imageClick(id): void {
    if (this.imageId !== undefined) {
      document.getElementById('modalImage' + this.imageId).classList.remove('border', 'border-primary');
    }
    this.imageId = id;
    this.editInnerPageForm.get('imagePage').setValue(id);
    document.getElementById('modalImage' + id).classList.add('border', 'border-primary');
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

  updateInnerParatag(index: number, id: number, name: string): void {
    const editInnerParatagValue = this.editInnerParatagForm[index].value;

    const tagIdListTmp = [];
    for (const afterName of this.allTagTypeList.get(name).afterNames) {
      for (const after of this.allTagTypeList.get(name).after) {
        if (afterName === after.name) {
          tagIdListTmp.push(after.id);
        }
      }
      for (const before of this.allTagTypeList.get(name).before) {
        if (afterName === before.name) {
          tagIdListTmp.push(before.id);
        }
      }
    }

    this.innerParatagService.updateInner(id.toString(), {
      content: editInnerParatagValue.contentParatag,
      title: editInnerParatagValue.titleParatag,
      tagIdList: tagIdListTmp}).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  validationInnerParatag(index: number, id: number, name: string): void {
    const editInnerParatagValue = this.editInnerParatagForm[index].value;

    const tagIdListTmp = [];
    for (const afterName of this.allTagTypeList.get(name).afterNames) {
      for (const after of this.allTagTypeList.get(name).after) {
        if (afterName === after.name) {
          tagIdListTmp.push(after.id);
        }
      }
      for (const before of this.allTagTypeList.get(name).before) {
        if (afterName === before.name) {
          tagIdListTmp.push(before.id);
        }
      }
    }

    this.innerParatagService.validationInner(id.toString(), {
      content: editInnerParatagValue.contentParatag,
      title: editInnerParatagValue.titleParatag,
      tagIdList: tagIdListTmp}).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  addInnerTagMessage(index: number, id: number): void {
    const messageInnerValue = this.messageInnerFormParatag[index].value;
    this.innerParatagService.addMessage(id.toString(), {
      content: messageInnerValue.content
    }).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  voteInnerTag(index: number, id: number, choice: number): void {
    if (choice === 0) {
      this.addInnerTagMessage(index, id);
    }
    console.log(id.toString());
    this.voteService.addVote({choice: choice.toString(),
      type: 'InnerParatag',
      typeId: id.toString()}).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  addInnerTag(index: number, paratagId: number, name: string): void {
    const editInnerParatagValue = this.editInnerParatagForm[index].value;

    const tagIdListTmp = [];
    for (const t of this.page.paratagList[index].innerParatagList[0].tagList) {
      tagIdListTmp.push(t.id);
      console.log(t.name);
    }

    this.innerParatagService.addInner(paratagId.toString(), {
      content: editInnerParatagValue.contentParatag,
      title: editInnerParatagValue.titleParatag,
      tagIdList: tagIdListTmp}).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  publish(): void {
    this.pageService.publish(this.page.id).subscribe(value => {
      this.router.navigate(['/page/' + this.page.id]);
    });
  }

  updateInnerParapage(index: number, id, name) {

  }

  validationInnerParapage(index: number, id, name) {

  }

  addInnerParapageMessage(index: number, id): void {
    const messageInnerValue = this.messageInnerFormParapage[index].value;
    this.innerParapageService.addMessage(id.toString(), {
      content: messageInnerValue.content
    }).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  voteInnerParapage(index: number, id, number: number) {

  }
}
