import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TagtypeService} from '../../../../service/tagtype.service';
import {Router} from '@angular/router';
import {ParagraphtypeService} from '../../../../service/paragraphtype.service';

@Component({
  selector: 'app-addparagraphtype',
  templateUrl: './addparagraphtype.component.html',
  styleUrls: ['./addparagraphtype.component.css']
})
export class AddparagraphtypeComponent implements OnInit {

  addParagraphTypeForm: FormGroup;

  constructor(private paragraphtypeService: ParagraphtypeService, private router: Router) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void{
    this.addParagraphTypeForm = new FormGroup({
      name: new FormControl('Lorem ipsum dolor.', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new FormControl('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }

  addParagraphType(): void {
    const addPragraphTypeValue = this.addParagraphTypeForm.value;

    this.paragraphtypeService.addParagraphType({description: addPragraphTypeValue.description,
      name: addPragraphTypeValue.name}).subscribe(data => {
      this.router.navigate(['/editparagraphtype/' + data.toString()]);
    });
  }
}
