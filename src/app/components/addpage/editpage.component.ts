import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../service/page.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-addpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent implements OnInit {

  editInnerPageForm: FormGroup;

  private id: string;

  page: any;

  constructor(private route: ActivatedRoute, private pageService: PageService) { }

  ngOnInit(): void {
    this.init();
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageService.getEditPageDto(this.id).subscribe(data => {
      this.page = data;
      console.log(this.page);
    });

  }

  init(): void {
    this.editInnerPageForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      description: new FormControl('', [Validators.required, Validators.minLength(64), Validators.maxLength(1024)]),
    });
  }

  editInnerPage(): void {
    //save update

    //validation validation

    //new add
  }
}
