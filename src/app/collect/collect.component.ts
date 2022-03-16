import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, of, switchMap} from 'rxjs';
import {CategoryEnum} from '../_enums/category.enum';
import {ScrapyConfig} from '../_interfaces/scrapy-config';
import {ScrapyResponse} from '../_interfaces/scrapy-response';
import {FacilityService} from '../_services/facility.service';
import {ScrapyService} from '../_services/scrapy.service';
import {SpinnerService} from '../_services/spinner.service';
import {CustomValidators} from '../_validators/custom.validators';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss'],
})
export class CollectComponent implements OnInit {

  collectForm: FormGroup = new FormGroup({
    facilities: new FormArray([], Validators.required),
  });

  CategoryEnum = CategoryEnum;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private apiService: ScrapyService,
              private spinnerService: SpinnerService,
              private facilityService: FacilityService) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          if (params['website']) {
            const scrapyConfig: ScrapyConfig = {
              spider_name: 'facilities',
              request: {
                url: params['website'],
              },
            };
            this.spinnerService.show();
            return this.apiService.getScrapyData(scrapyConfig)
              .pipe(finalize(() => this.spinnerService.hide()));
          }
          return of(null);
        }))
      .subscribe((result: ScrapyResponse | null) => {
        if (!!result) {
          console.log(result);
          console.log(result.items);
        }
      });
  }

  get facilitiesFormArray(): FormArray {
    return this.collectForm.get('facilities') as FormArray;
  }

  public addFacility(): void {
    const facility: FormGroup = new FormGroup({
      voivodeship: new FormControl(null, [Validators.required, CustomValidators.noWhitespaceValidator]),
      district: new FormControl(null, [Validators.required, CustomValidators.noWhitespaceValidator]),
      name: new FormControl(null, [Validators.required, CustomValidators.noWhitespaceValidator]),
      category: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
      phone: new FormControl(null),
      email: new FormControl(null),
      website: new FormControl(null),
    });
    this.facilitiesFormArray.push(facility);
  }

  public removeFacility(index: number): void {
    this.facilitiesFormArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.collectForm.valid) {
      this.facilityService.addFacilities(this.collectForm.getRawValue().facilities).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  noOrder = (a: any, b: any): number => {
    return 0;
  };
}
