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
import {delay, map, startWith} from 'rxjs/operators';
import {TagService} from '../../../service/Tag.service';
import {Alert} from '../../../model/my/AlertManager';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent extends AbstractComponents implements OnInit {

  id: string;
  searchForm: FormGroup;

  categories: any[] = [];
  tags: any[] = [];
  tagsMap;
  pages: any;
  description: string;
  name: string;
  noId = false;
  url: string;
  searchDone: string;

  // pagi
  pageEvent: PageEvent;
  dataSource: any[];
  pageIndex: number;
  pageSize: number;
  length: number;

  // chip
  selectable = true;
  removable = true;
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  tagSearch: string[];
  allTagsSearch: string[];

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
      this.tagService.getAllTag().subscribe(data3 => {
        this.tags = data3;
        console.log(data3);
        this.tagsMap = new Map();
        for (const tag of this.tags) {
          this.tagsMap.set(tag.id, tag);
        }
        console.log(this.tagsMap);
        this.route.paramMap.subscribe(params => {
          this.ngOnInitDebug();
        });
      });
    });
  }

  private async removeSuggest(): Promise<void> {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    this.noId = true;
    await delay(5000);
    this.noId = false;
  }

  ngOnInitDebug(): void {
    this.id = this.route.snapshot.paramMap.get('id') === undefined ? null : this.route.snapshot.paramMap.get('id');
    if (this.id === null) {
      this.removeSuggest();
      const cat = this.categories[Math.floor(Math.random() * this.categories.length)];
      if (cat.childCategory.length !== 0) {
        this.id = cat.childCategory[Math.floor(Math.random() * cat.childCategory.length)].id;
      } else {
        this.id = cat.id;
      }
    }
    this.url = null;
    this.searchDone = null;
    this.tagSearch = [];
    this.allTagsSearch = [];
    for (const c of this.categories) {
      if (c.childCategory.length !== 0) {
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
    for (const tag of this.tags) {
      this.allTagsSearch.push(tag.id);
    }

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map(tagSearch => this.allTagsSearch.filter(item => this.tagSearch.indexOf(item) < 0)));
    console.log(this.id);
    this.pageService.getAllPageByCategory(this.id).subscribe(data => {
      this.pages = data;
      if (data.pageList.length !== 0) {
        this.url = data.pageList[Math.floor(Math.random() * data.pageList.length)].image.url;
      }
      console.log(data);
      this.clear();
    });
  }

  ngOnInit(): void { }

  private init(): void {
    this.searchForm = new FormGroup({
      input: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  public clear(): void {
    this.pageIndex = 0;
    this.pageSize = 9;
    this.length = this.pages.number;
    this.updateData(null);
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
    const index = this.tagSearch.indexOf(fruit);
    if (index >= 0) {
      this.tagSearch.splice(index, 1);
    }
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map(tagSearch => this.allTagsSearch.filter(item => this.tagSearch.indexOf(item) < 0)));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tagSearch.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map(tagSearch => this.allTagsSearch.filter(item => this.tagSearch.indexOf(item) < 0)));
  }

  search(): void {
    const value = this.searchForm.value;
    this.searchDone = value.input;
    const keep = value.input.toLowerCase().split(' ');

    if (this.searchDone && this.searchDone.length >= 3) {
      this.dataSource = [];

      for (const data of this.pages.pageList) {
        const titleSplited = data.title.toLowerCase().split(' ');

        for (const t of titleSplited) {
          for (const k of keep) {
            console.log(t + ' ' + k);
            const titleSplitedChar = t.split('');
            const titleSplitedChar2 = [];
            for (let i = 1; i < titleSplitedChar.length - 1; i++) {
              titleSplitedChar2.push(titleSplitedChar[i - 1] + '' + titleSplitedChar[i] + '' + titleSplitedChar[i + 1]);
            }
            const keepSplitedChar = k.split('');
            const keepSplitedChar2 = [];
            for (let i = 1; i < keepSplitedChar.length - 1; i++) {
              keepSplitedChar2.push(keepSplitedChar[i - 1] + '' + keepSplitedChar[i] + '' + keepSplitedChar[i + 1]);
            }
            for (const ts of titleSplitedChar2) {
              for (const ks of keepSplitedChar2) {
                console.log('double ' + ts + ' ' + ks);
                if (ts === ks) {

                  this.dataSource.push(data);
                }
              }
            }
          }
        }
      }
      // remove duplicated
      this.dataSource = this.dataSource.filter((elem, index, self) => {
        return index === self.indexOf(elem);
      });
      this.pageIndex = 0;
      this.length = this.dataSource.length;
    }
  }
}
