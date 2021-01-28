import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VoteService} from '../../../service/vote.service';
import {TagService} from '../../../service/tag.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edittag',
  templateUrl: './edittag.component.html',
  styleUrls: ['./edittag.component.css']
})
export class EdittagComponent implements OnInit {

  editInnerTagForm: FormGroup;

  private id: string;

  tag: any;

  constructor(private route: ActivatedRoute, private tagService: TagService, private voteService: VoteService, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tagService.getEditTagDto(this.id).subscribe(data => {
      console.log(data);
      this.tag = data;
      this.init();
    });
  }

  init(): void {
    this.editInnerTagForm = new FormGroup({
      nameTag: new FormControl(this.tag.innerTagList[this.tag.innerTagList.length - 1].name,
        [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      contentTag: new FormControl(this.tag.innerTagList[this.tag.innerTagList.length - 1].content,
        [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
    });
  }

  updateInnerTag(): void {
    const editInnerTagValue = this.editInnerTagForm.value;
    const innerTagId: string = this.tag.innerTagList[this.tag.innerTagList.length - 1].id;
    this.tagService.updateInnerTag(innerTagId.toString(),
      {content: editInnerTagValue.contentTag,
        name: editInnerTagValue.nameTag});
  }

  validationInnerTag(): void {
    const innerTagId: string = this.tag.innerTagList[this.tag.innerTagList.length - 1].id;
    this.tagService.validationInnerTag(innerTagId);
  }

  voteInnerTag(id: number, choice: number): void {
    this.voteService.addVote({choice: choice.toString(),
      type: 'InnerTag',
      typeId: id.toString(),
      userId: 1});
  }

  addInnerTag(id: number,  tagId: number): void {
    const editInnerTagValue = this.editInnerTagForm.value;
    this.tagService.addInnerPage({content: editInnerTagValue.contentTag,
      tagId: tagId.toString(),
      name: editInnerTagValue.nameTag,
      userId: 1});
  }
}
