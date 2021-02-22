import {Component, OnInit} from '@angular/core';
import {VoteService} from '../../../../service/Vote.service';
import {TagService} from '../../../../service/Tag.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InnerTagService} from '../../../../service/InnerTag.service';
import {AbstractEdit} from '../../../commons/AbstractEdit';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edittag',
  templateUrl: './edittag.component.html',
  styleUrls: ['./edittag.component.css']
})
export class EdittagComponent extends AbstractEdit implements OnInit {
  editInnerTagForm: FormGroup;
  tag: any;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private tagService: TagService,
              private voteService: VoteService,
              private innerTagService: InnerTagService) {
    super();
  }

  ngOnInit(): void {
    this.tagService.getEditTagDto(this.id).subscribe(data => {
      console.log(data);
      this.tag = data;
      this.init();
    });
  }

  init(): void {
    super.init();
    this.editInnerTagForm = new FormGroup({
      name: new FormControl(this.tag.innerTagList[0].name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      content: new FormControl(this.tag.innerTagList[0].content,
        [Validators.required, Validators.minLength(32), Validators.maxLength(1024)]),
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
    const messageInnerValue = this.messageInnerForm.value;
    this.innerTagService.addMessage(id.toString(), {
      content: messageInnerValue.content
    }).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }
}
