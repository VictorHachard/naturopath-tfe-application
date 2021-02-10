import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VoteService} from '../../../../service/Vote.service';
import {TagService} from '../../../../service/Tag.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InnerTagService} from '../../../../service/InnerTag.service';

@Component({
  selector: 'app-edittag',
  templateUrl: './edittag.component.html',
  styleUrls: ['./edittag.component.css']
})
export class EdittagComponent implements OnInit {
  messageInnerTagForm: FormGroup;
  editInnerTagForm: FormGroup;
  private id: string;
  tag: any;

  constructor(private route: ActivatedRoute, private tagService: TagService, private voteService: VoteService, private router: Router,
              private innerTagService: InnerTagService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tagService.getEditTagDto(this.id).subscribe(data => {
      console.log(data);
      this.tag = data;
      this.init();
    });
  }

  canVote(inner: any): boolean {
    if (JSON.parse(localStorage.getItem('currentUser')).roleList.includes('ROLE_OWNER')) {
      return true;
    }
    if (!JSON.parse(localStorage.getItem('currentUser')).roleList.includes('ROLE_ADMINISTRATOR') ||
      inner.user.username === JSON.parse(localStorage.getItem('currentUser')).username) { //TODO error c'est du tag en question
      return false;
    }
    for (const vote of inner.voteList) {
      if (vote.user.username === JSON.parse(localStorage.getItem('currentUser')).username) {
        return false;
      }
    }
    return true;
  }

  userColor(UserId: number, Inner: any): string {
    if (Inner.user.id === UserId) {
      return 'primary';
    }
    for (const vote of Inner.voteList) {
      if (vote.user.id === UserId) {
        return vote.choice === 1 ? 'success' : 'danger';
      }
    }
    return 'info';
  }

  init(): void {
    this.editInnerTagForm = new FormGroup({
      name: new FormControl(this.tag.innerTagList[0].name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      content: new FormControl(this.tag.innerTagList[0].content,
        [Validators.required, Validators.minLength(32), Validators.maxLength(1024)]),
    });
    this.messageInnerTagForm = new FormGroup({
      content: new FormControl('',
        [Validators.required, Validators.minLength(8), Validators.maxLength(2048)])
    });
  }

  updateInnerTag(): void {
    const editInnerTagValue = this.editInnerTagForm.value;
    const innerTagId: string = this.tag.innerTagList[0].id;
    this.innerTagService.updateInnerTag(innerTagId.toString(), {
      content: editInnerTagValue.content,
      name: editInnerTagValue.name}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
  }

  validationInnerTag(): void {
    const editInnerTagValue = this.editInnerTagForm.value;
    const innerTagId: string = this.tag.innerTagList[0].id;
    this.innerTagService.validationInnerTag(innerTagId, {
      content: editInnerTagValue.content,
      name: editInnerTagValue.name}).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  voteInnerTag(id: number, choice: number): void {
    if (choice === 0) {
      this.addInnerTagMessage(id);
    }
    this.voteService.addVote({
      choice: choice.toString(),
      type: 'InnerTag',
      typeId: id.toString()}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
  }

  addInnerTag(id: number, tagId: number): void {
    const editInnerTagValue = this.editInnerTagForm.value;
    this.innerTagService.addInnerTag(tagId.toString(), {
      content: editInnerTagValue.content,
      name: editInnerTagValue.name}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
  }

  addInnerTagMessage(id: number): void {
    const messageInnerValue = this.messageInnerTagForm.value;
    this.innerTagService.addMessage(id.toString(), {
      content: messageInnerValue.content
    }).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }
}
