import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../service/page.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-addpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent implements OnInit {

  editInnerPageForm: FormGroup;
  editInnerParagraphForm: FormGroup;

  private id: string;

  page: any;

  test: string;


  constructor(private route: ActivatedRoute, private pageService: PageService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageService.getEditPageDto(this.id).subscribe(data => {
      console.log(data);
      this.page = data;
      this.init();
    });
  }

  init(): void {
    this.editInnerPageForm = new FormGroup({
      titlePage: new FormControl(this.page.innerPageList[this.page.innerPageList.length - 1].title, [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      descriptionPage: new FormControl(this.page.innerPageList[this.page.innerPageList.length - 1].description, [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
    });

    this.editInnerParagraphForm = new FormGroup({});

    this.page.paragraphList.forEach(p => {
      this.editInnerParagraphForm.addControl('titleParagraph' + p.innerParagraphList[p.innerParagraphList.length - 1].id, new FormControl(p.innerParagraphList[p.innerParagraphList.length - 1].title, [Validators.required, Validators.minLength(1), Validators.maxLength(1024)]));
      this.editInnerParagraphForm.addControl('contentParagraph' + p.innerParagraphList[p.innerParagraphList.length - 1].id, new FormControl(p.innerParagraphList[p.innerParagraphList.length - 1].content, [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]));
    });
  }

  updateInnerParagraph(id: number): void {

    this.pageService.updateInnerParagraph(id.toString(),
      {content: this.editInnerParagraphForm.get('contentParagraph' + id.toString()).value,
        title: this.editInnerParagraphForm.get('titleParagraph' + id.toString()).value});


  }

  updateInnerPage(): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    const innerPageId: string = this.page.innerPageList[this.page.innerPageList.length - 1].id;

    console.log({description: editInnerPageValue.descriptionPage,
      title: editInnerPageValue.titlePage});

    this.pageService.updateInnerPage(innerPageId.toString(),
      {description: editInnerPageValue.descriptionPage,
        title: editInnerPageValue.titlePage});
  }

  validationInnerPage(): void {
    const editInnerPageForm = this.editInnerPageForm.value;
    const innerPageId: string = this.page.innerPageList[this.page.innerPageList.length - 1].id;
    console.log(innerPageId);

    this.pageService.validationInnerPage(innerPageId);
  }

  voteInnerPage(id: number, choice: number): void {
    this.pageService.addVote({choice: choice.toString(),
      type: 'InnerPage',
      typeId: id.toString(),
      userId: 1});
  }

  addInnerPage(id: number, pageId: number): void {
    const editInnerPageValue = this.editInnerPageForm.value;
    console.log(pageId);
    this.pageService.addInnerPage({description: editInnerPageValue.descriptionPage,
      paragraphId: pageId.toString(),
      title: editInnerPageValue.titlePage,
      userId: 1});
  }

  validationInnerParagraph(id: number): void {
    console.log(id.toString());
    this.pageService.validationInnerParagraph(id.toString());
  }

  voteInnerParagraph(id: number, choice: number): void {
    this.pageService.addVote({choice: choice.toString(),
      type: 'InnerParagraph',
      typeId: id.toString(),
      userId: 1});
  }

  addInnerParagraph(id: number, paragraphId: number): void {
    console.log(paragraphId);
    this.pageService.addInnerParagraph({content: this.editInnerParagraphForm.get('contentParagraph' + id.toString()).value,
      paragraphId: paragraphId.toString(),
      title: this.editInnerParagraphForm.get('titleParagraph' + id.toString()).value,
      userId: 1});
  }
}
