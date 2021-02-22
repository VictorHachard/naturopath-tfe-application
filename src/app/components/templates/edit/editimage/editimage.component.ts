import {Component, OnInit} from '@angular/core';
import {AbstractEdit} from '../../../commons/AbstractEdit';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VoteService} from '../../../../service/Vote.service';
import {ImageService} from '../../../../service/Image.service';
import {InnerImageService} from '../../../../service/InnerImage.service';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editimage',
  templateUrl: './editimage.component.html',
  styleUrls: ['./editimage.component.css']
})
export class EditimageComponent extends AbstractEdit implements OnInit {
  editInnerImageForm: FormGroup;
  private id: string;
  image: any;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private imageService: ImageService,
              private voteService: VoteService,
              private innerImageService: InnerImageService) {
    super();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.imageService.getEditImageDto(this.id).subscribe(data => {
      console.log(data);
      this.image = data;
      this.init();
    });
  }

  init(): void {
    super.init();
    this.editInnerImageForm = new FormGroup({
      title: new FormControl(this.image.innerImageList[0].title,
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      description: new FormControl(this.image.innerImageList[0].description,
        [Validators.required, Validators.minLength(32), Validators.maxLength(1024)]),
    });
  }

  updateInnerTag(): void {
    const editInnerTagValue = this.editInnerImageForm.value;
    const innerImageId: string = this.image.innerImageList[0].id;
    this.innerImageService.updateInnerTag(innerImageId.toString(), {
      description: editInnerTagValue.description,
      title: editInnerTagValue.title}).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  validationInnerTag(): void {
    const editInnerTagValue = this.editInnerImageForm.value;
    const innerImageId: string = this.image.innerImageList[0].id;
    this.innerImageService.validationInnerTag(innerImageId, {
      description: editInnerTagValue.description,
      title: editInnerTagValue.title}).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  voteInnerTag(id: number, choice: number): void {
    if (choice === 0) {
      this.addInnerImageMessage(id);
    }
    this.voteService.addVote({
      choice: choice.toString(),
      type: 'InnerImage', //todo remove
      typeId: id.toString()}).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  addInnerTag(id: number, tagId: number): void {
    const editInnerTagValue = this.editInnerImageForm.value;
    this.innerImageService.addInnerTag(tagId.toString(), {
      description: editInnerTagValue.description,
      title: editInnerTagValue.title}).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  addInnerImageMessage(id: number): void {
    const messageInnerValue = this.messageInnerForm.value;
    this.innerImageService.addMessage(id.toString(), {
      content: messageInnerValue.content
    }).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }
}
