import {Component, OnInit} from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ImageService} from '../../../../service/Image.service';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.css']
})
export class AddimageComponent extends AbstractComponents implements OnInit {
  addImageForm: UntypedFormGroup;
  imgURL: any;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private imageService: ImageService) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.addImageForm = new UntypedFormGroup({
      title: new UntypedFormControl('Lorem ipsum dolor sit amet',
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      description: new UntypedFormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        [Validators.required, Validators.minLength(32), Validators.maxLength(1024)]),
      image: new UntypedFormControl(null, [Validators.required]),
      fileSource: new UntypedFormControl('', [Validators.required])
    });
  }

  onFileChange(event): void {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;
      };
      reader.readAsDataURL(file);

      this.addImageForm.patchValue({
        fileSource: file
      });
    }
  }

  addImage(): void {
    const addImageValue = this.addImageForm.value;

    const formData: FormData = new FormData();
    const name: string = (new Date()).valueOf().toString() + Math.random().toString(36).substring(10) + JSON.parse(localStorage.getItem('currentUser')).token.slice(JSON.parse(localStorage.getItem('currentUser')).token.lastIndexOf('-')).substring(10) + addImageValue.fileSource.name.slice(addImageValue.fileSource.name.lastIndexOf('.'));
    formData.append('file', addImageValue.fileSource, name);

    this.imageService.upload(formData).subscribe(value1 => {
      this.imageService.addImage({
        title: addImageValue.title,
        description: addImageValue.description,
        url: name
      }).subscribe(value => {
        this.router.navigate(['/editimage/' + value.toString()]);
      });
    });
  }
}
