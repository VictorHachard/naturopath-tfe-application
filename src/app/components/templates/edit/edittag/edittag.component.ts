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

  editInnerTagForm: FormGroup;

  private id: string;

  tag: any;

  constructor(private route: ActivatedRoute, private tagService: TagService, private voteService: VoteService, private router: Router,
              private innerTag: InnerTagService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tagService.getEditTagDto(this.id).subscribe(data => {
      console.log(data);
      this.tag = data;
      this.init();
    });
  }

  canVote(id: string): boolean {
    if (JSON.parse(localStorage.getItem('currentUser')).roleList.includes('ROLE_OWNER')) {
      return true;
    }
    if (!JSON.parse(localStorage.getItem('currentUser')).roleList.includes('ROLE_ADMINISTRATOR') ||
      this.tag.user.username === JSON.parse(localStorage.getItem('currentUser')).username) {
      return false;
    }
    if (this.tag.innerTagList[this.tag.innerTagList.length - 1].id === id) {
      for (const vote of this.tag.innerTagList[this.tag.innerTagList.length - 1].voteList) {
        if (vote.user.username === JSON.parse(localStorage.getItem('currentUser')).username) {
          return false;
        }
      }
    }
    return true;
  }

  init(): void {
    this.editInnerTagForm = new FormGroup({
      nameTag: new FormControl(this.tag.innerTagList[this.tag.innerTagList.length - 1].name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      contentTag: new FormControl(this.tag.innerTagList[this.tag.innerTagList.length - 1].content,
        [Validators.required, Validators.minLength(32), Validators.maxLength(1024)]),
    });
  }

  updateInnerTag(): void {
    const editInnerTagValue = this.editInnerTagForm.value;
    const innerTagId: string = this.tag.innerTagList[this.tag.innerTagList.length - 1].id;
    this.innerTag.updateInnerTag(innerTagId.toString(), {
      content: editInnerTagValue.contentTag,
      name: editInnerTagValue.nameTag}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
  }

  validationInnerTag(): void {
    const editInnerTagValue = this.editInnerTagForm.value;
    const innerTagId: string = this.tag.innerTagList[this.tag.innerTagList.length - 1].id;
    this.innerTag.validationInnerTag(innerTagId, {
      content: editInnerTagValue.contentTag,
      name: editInnerTagValue.nameTag}).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  voteInnerTag(id: number, choice: number): void {
    this.voteService.addVote({choice: choice.toString(),
      type: 'InnerTag',
      typeId: id.toString()}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
  }

  addInnerTag(id: number, tagId: number): void {
    const editInnerTagValue = this.editInnerTagForm.value;
    this.innerTag.addInnerTag(tagId.toString(), {
      content: editInnerTagValue.contentTag,
      name: editInnerTagValue.nameTag}).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
  }
}
