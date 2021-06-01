import {Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../service/Page.service';
import {CategoryService} from '../../../service/Category.service';
import {AbstractComponents} from '../../commons/AbstractComponents';
import {UserSecurityService} from '../../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {map, startWith} from 'rxjs/operators';
import {TagService} from '../../../service/Tag.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent extends AbstractComponents implements OnInit {

  private id: string;
  searchForm: FormGroup;

  categories: any[] = [];
  pages: any;
  description: string;
  name: string;
  noId = false;
  url: string;

  //pagi
  pageEvent: PageEvent;
  dataSource: any[];
  pageIndex: number;
  pageSize: number;
  length: number;

  //chip
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['t'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private userSecurityService: UserSecurityService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private pageService: PageService,
              private tagService: TagService,
              private categoryService: CategoryService) {
    super();
    this.categoryService.getAllCategory().subscribe(value => {
      this.categories = value;
      console.log(value);
      this.route.paramMap.subscribe(params => {
        this.ngOnInit();
      });
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') === undefined ? null : this.route.snapshot.paramMap.get('id');
    this.url = null;
    this.categoryService.getAllCategory().subscribe(value => {
      if (this.id === null) {
        this.noId = true;
        const cat = value[Math.floor(Math.random() * value.length)];
        if (cat.childCategory.length > 0) {
          this.id = cat.childCategory[Math.floor(Math.random() * cat.childCategory.length)].id;
        } else {
          this.id = cat.id;
        }
      }
      for (const c of value) {
        if (c.childCategory.length > 0) {
          for (const child of c.childCategory) {
            if (child.id == this.id) {
              this.name = child.name;
              this.description = child.description;
              break;
            }
          }
        } else {
          if (c.id == this.id) {
            this.name = c.name;
            this.description = c.description;
            break;
          }
        }
      }
      this.init();

      this.tagService.getAllTag().subscribe(data3 => {
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
          startWith(null),
          map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

        this.pageService.getAllPageByCategory(this.id).subscribe(data => {
          this.pages = data;
          if (data.pageList.length !== 0) {
            this.url = data.pageList[Math.floor(Math.random() * data.pageList.length)].image.url;
          }
          console.log(data);
          this.pageIndex = 0;
          this.pageSize = 9;
          this.length = data.number;
          this.updateData(null);
        });
      });
    });
  }

  init(): void {
    this.searchForm = new FormGroup({
      category: new FormControl(this.categories[0].name, Validators.required),
      input: new FormControl('', Validators.required)
    });
  }

  public updateData(event?: PageEvent): PageEvent {
    if (event !== null) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
    }
    const end = (this.pageIndex + 1) * this.pageSize;
    const start = this.pageIndex * this.pageSize;
    this.dataSource = this.pages.pageList.slice(start, end);
    return event;
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  search(): void {

  }
}
