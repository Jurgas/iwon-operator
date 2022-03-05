import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs';
import {CategoryEnum} from '../_enums/category.enum';
import {ScrapyConfig} from '../_interfaces/scrapy-config';
import {ScrapyResponse} from '../_interfaces/scrapy-response';
import {ApiService} from '../_services/api.service';
import {SpinnerService} from '../_services/spinner.service';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss'],
})
export class CollectComponent implements OnInit {

  collectForm: FormGroup = new FormGroup({
    facilities: new FormArray([], Validators.minLength(1)),
  });

  CategoryEnum = CategoryEnum;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params['website']) {
          const scrapyConfig: ScrapyConfig = {
            spider_name: 'facilities',
            request: {
              url: params['website'],
            },
          };
          this.spinnerService.show();
          this.apiService.getScrapyData(scrapyConfig)
            .pipe(finalize(() => this.spinnerService.hide()))
            .subscribe((result: ScrapyResponse) => {
              console.log(result);
              console.log(result.items);
            });
        }
      });
  }

  get facilitiesFormArray(): FormArray {
    return this.collectForm.get('facilities') as FormArray;
  }

  public addFacility(): void {
    const facility: FormGroup = new FormGroup({
      voivodeship: new FormControl(null),
      district: new FormControl(null),
      name: new FormControl(null),
      category: new FormControl(null),
      address: new FormControl(null),
      phone: new FormControl(null),
      email: new FormControl(null),
      website: new FormControl(null),
    });
    setTimeout(() => {
      this.facilitiesFormArray.push(facility);
    }, 100);
  }

  public removeFacility(index: number): void {
    this.facilitiesFormArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.collectForm.valid) {
      this.router.navigate(['/home']);
    }
  }

  noOrder = (a: any, b: any): number => {
    return 0;
  };
}
