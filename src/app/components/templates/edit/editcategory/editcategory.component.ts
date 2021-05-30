import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../../service/Category.service';
import {AbstractComponents} from '../../../commons/AbstractComponents';
import {UserSecurityService} from '../../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ParagraphTypeService} from '../../../../service/ParagraphType.service';
import {ParatagTypeService} from '../../../../service/ParatagType.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent extends AbstractComponents implements OnInit {

  private id: string;

  typeData = new Map(); // {befor : any[], after : any[]}
  drag; // {befor : any[], after : any[]}
  editCategoryForm: FormGroup;
  category: any;
  paragraph: any;
  paratag: any;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private paragraphTypeService: ParagraphTypeService,
              private paratagTypeService: ParatagTypeService) {
    super();
  }

  ngOnInit(): void {
    this.drag = {after:  [], before: []};
    this.id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getEditCategoryDto(this.id).subscribe(data => {
      console.log('*********** CATEGORY ***********');
      console.log(data);
      this.category = data;
      this.paragraphTypeService.getAllParagraphType().subscribe(data1 => {
        console.log('*********** PARAGRAPH LIST ***********');
        console.log(data1);
        this.paragraph = data1;
        this.paratagTypeService.getAllParatagType().subscribe(data2 => {
          console.log('*********** PARATAG LIST ***********');
          console.log(data2);
          this.paratag = data2;

          for (const paragraph of this.paragraph) {
            this.typeData.set(paragraph.id, {type: 'ParagraphType', name: paragraph.name, description : paragraph.description});
            let find = false;
            for (const sortedType of this.category.sortedTypeType) {
              if (sortedType.typeId === paragraph.id) {
                find = true;
              }
            }
            if (!find) {
              this.drag.before.push(paragraph.id);
            }
          }
          for (const paratag of this.paratag) {
            this.typeData.set(paratag.id, {type: 'ParatagType', name: paratag.name, tagTypeName: paratag.tagType.name, description : paratag.tagType.description});
            let find = false;
            for (const sortedType of this.category.sortedTypeType) {
              if (sortedType.typeId === paratag.id) {
                find = true;
              }
            }
            if (!find) {
              this.drag.before.push(paratag.id);
            }
          }

          for (const sortedType of this.category.sortedTypeType) {
            this.drag.after.push(sortedType.typeId);
          }

          console.log('*********** TYPEDATA LIST ***********');
          console.log(this.typeData);
          this.init();
        });
      });
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  init(): void {
    this.editCategoryForm = new FormGroup({
      name: new FormControl(this.category.name,
        [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      description: new FormControl(this.category.description,
        [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }

  update(): void {
    const editCategoryValue = this.editCategoryForm.value;
    console.log(this.drag.after);

    const tmpList = [];
    for (const t of this.drag.after) {
      tmpList.push({id: t, type: this.typeData.get(t).type});
    }

    this.categoryService.updateCategory(this.category.id.toString(),
      {description: editCategoryValue.description,
        name: editCategoryValue.name,
        sortedTypeList: tmpList}).subscribe(value => {
      this.ngOnInit();
    });
  }
}
