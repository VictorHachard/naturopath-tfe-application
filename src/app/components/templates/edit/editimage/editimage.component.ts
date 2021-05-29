import {Component, OnInit} from '@angular/core';
import {AbstractEdit} from '../../../commons/AbstractEdit';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VoteService} from '../../../../service/Vote.service';
import {ImageService} from '../../../../service/Image.service';
import {InnerImageService} from '../../../../service/InnerImage.service';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {element} from 'protractor';
import {getSortHeaderNotContainedWithinSortError} from '@angular/material/sort/sort-errors';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-editimage',
  templateUrl: './editimage.component.html',
  styleUrls: ['./editimage.component.css']
})
export class EditimageComponent extends AbstractEdit implements OnInit {
  editInnerImageForm: FormGroup;
  private id: string;
  image: any;
  imgURL: any;
  trustedUrl: any;
  tmpImage: any;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private imageService: ImageService,
              private voteService: VoteService,
              private innerImageService: InnerImageService){
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
      image: new FormControl(null, ),
      fileSource: new FormControl('', )
    });
  }

  validationInnerImage(): void {
    const editInnerImageValue = this.editInnerImageForm.value;
    const innerImageId: string = this.image.innerImageList[0].id;
    console.log(this.trustedUrl);
    if (editInnerImageValue.fileSource === '' && this.trustedUrl !== '') {
      this.innerImageService.validationInner(innerImageId, {
        description: editInnerImageValue.description,
        title: editInnerImageValue.title
      }).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
    } else {
      console.log(editInnerImageValue.fileSource);
      this.innerImageService.validationInner(innerImageId, {
        description: editInnerImageValue.description,
        title: editInnerImageValue.title,
        url: editInnerImageValue.fileSource
      }).subscribe(value => {
        this.ngOnInit();
      }, error => {

      });
    }
  }

  voteInnerImage(id: number, choice: number): void {
    if (choice === 0) {
      this.addInnerImageMessage(id);
    }
    this.voteService.addVote({
      choice: choice.toString(),
      type: 'InnerImage', // todo remove
      typeId: id.toString()}).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  addInnerImage(id: number, tagId: number): void {
    const editInnerImageValue = this.editInnerImageForm.value;
    console.log(this.tmpImage);
    editInnerImageValue.fileSource = this.tmpImage;
    this.innerImageService.addInner(tagId.toString(), {
      description: editInnerImageValue.description,
      title: editInnerImageValue.title,
       url: this.image.innerImageList[0].url}).subscribe(value => {
         this.ngOnInit();
    }, error => {
    });
  }

  // TODO regler le fait de devoir reload l'image a chque appui sur send message

  addInnerImageMessage(id: number): void {
    const messageInnerValue = this.messageInnerForm.value;
    this.innerImageService.addMessage(id.toString(), {
      content: messageInnerValue.content
    }).subscribe(value => {
      this.ngOnInit();
    }, error => {

    });
  }

  onFileChange(event): void {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.trustedUrl = event.target.result;
      };
      reader.readAsDataURL(file);

      this.editInnerImageForm.patchValue({
        fileSource: file
      });
    }
  }

  updateImage(): void {
    const editImageValue = this.editInnerImageForm.value;
    console.log(editImageValue.title);
    console.log(editImageValue.description);
    if (editImageValue.image !== null) {
      const formData: FormData = new FormData();
      const name: string = (new Date()).valueOf().toString() + Math.random().toString(36).substring(10) + JSON.parse(localStorage.getItem('currentUser')).token.slice(JSON.parse(localStorage.getItem('currentUser')).token.lastIndexOf('-')).substring(10) + editImageValue.fileSource.name.slice(editImageValue.fileSource.name.lastIndexOf('.'));
      formData.append('file', editImageValue.fileSource, name);
      this.imageService.upload(formData).subscribe(value1 => {
        console.log('sdsdsdsdsdsd----------------'+  name);
        this.innerImageService.updateInner(this.image.innerImageList[0].id,
          {title: editImageValue.title,
            description: editImageValue.description,
            url: name}).subscribe(value => {
        });
      });
      this.tmpImage = name;
      console.log(this.tmpImage);
      this.editInnerImageForm.patchValue({
        fileSource: name,
      });
    } else {
      this.innerImageService.updateInner(this.image.innerImageList[0].id,
        {title: editImageValue.title,
          description: editImageValue.description}).subscribe(value => {
      });
    }
    this.ngOnInit();
  }
}
