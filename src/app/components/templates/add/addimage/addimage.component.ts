import { Component, OnInit } from '@angular/core';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ImageService} from '../../../../service/Image.service';

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.css']
})
export class AddimageComponent extends AbstractComponents implements OnInit {
  addImageForm: FormGroup;

  constructor(route: ActivatedRoute,
              router: Router,
              private imageService: ImageService) {
    super(route, router);
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.addImageForm = new FormGroup({
      title: new FormControl('Lorem ipsum dolor sit amet',
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      description: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        [Validators.required, Validators.minLength(32), Validators.maxLength(1024)]),
      image: new FormControl(null, [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
  }

  onFileChange(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addImageForm.patchValue({
        fileSource: file
      });
    }
  }

  addImage(): void {
    const addImageValue = this.addImageForm.value;

    console.log(addImageValue);

    //file: new FormData().append('file', addImageValue.fileSource)

    this.imageService.addImage({
      title: addImageValue.title,
      description: addImageValue.description
    }).subscribe(value => {
      this.router.navigate(['/editimage/' + value.toString()]);
    });
  }
}
