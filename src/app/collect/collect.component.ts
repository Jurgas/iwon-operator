import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {of, Subject, switchMap} from 'rxjs';
import {CategoryEnum} from '../_enums/category.enum';
import {PostCodeInfo} from '../_interfaces/post-code-info';
import {ScrapyConfig} from '../_interfaces/scrapy-config';
import {ScrapyFacilityItem} from '../_interfaces/scrapy-facility-item';
import {ScrapyResponse} from '../_interfaces/scrapy-response';
import {FacilityService} from '../_services/facility.service';
import {PostCodeService} from '../_services/post-code.service';
import {ScrapyService} from '../_services/scrapy.service';
import {SpinnerService} from '../_services/spinner.service';
import {CustomValidators} from '../_validators/custom.validators';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss'],
})
export class CollectComponent implements OnInit, OnDestroy {

  emailRegex = /\d{2}-\d{3}/;
  postCodes: PostCodeInfo[] = [];

  collectForm: FormGroup = new FormGroup({
    facilities: new FormArray([], Validators.required),
  });

  CategoryEnum = CategoryEnum;

  destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private apiService: ScrapyService,
              private spinnerService: SpinnerService,
              private facilityService: FacilityService,
              private postCodeService: PostCodeService) {
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
              crawl_args: {
                follow_links: params['follow_links'] === 'y',
                file: params['file'] === 'y',
              },
            };
            this.spinnerService.show();
            return this.apiService.getScrapyData(scrapyConfig);
          }
          return of(null);
        }))
      .subscribe({
        next: async (result: ScrapyResponse | null) => {
          if (!!result) {
            this.spinnerService.show();
            for (const item of result.items) {
              await this.addFacility(item);
            }
          }
          this.spinnerService.hide();
        },
        error: () => {
          this.spinnerService.hide();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get facilitiesFormArray(): FormArray {
    return this.collectForm.get('facilities') as FormArray;
  }

  public async addFacility(item?: ScrapyFacilityItem): Promise<void> {
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
    if (item) {
      facility.patchValue(item);
      if (!!item.address) {
        const postCode = item.address.match(this.emailRegex)?.shift();
        if (!!postCode) {
          const foundPostCode: PostCodeInfo | undefined = this.postCodes.find(postCodeItem => postCodeItem.postCode === postCode);
          if (!!foundPostCode) {
            this.setFacilityPostCodeDetails(facility, foundPostCode);
          } else {
            await this.postCodeService.getPostCodeInfo(postCode).then((postCodeInfo: PostCodeInfo[]) => {
              this.postCodes.push({
                postCode,
                wojewodztwo: postCodeInfo[0].wojewodztwo,
                powiat: postCodeInfo[0].powiat,
                miejscowosc: postCodeInfo[0].miejscowosc,
              });
              this.setFacilityPostCodeDetails(facility, postCodeInfo[0]);
            }, () => {
            });
          }
        }
      }
    }
    this.facilitiesFormArray.push(facility);
  }

  public removeFacility(index: number): void {
    this.facilitiesFormArray.removeAt(index);
  }

  private setFacilityPostCodeDetails(facility: FormGroup, postCodeDetail: PostCodeInfo): void {
    facility.get('voivodeship')?.setValue(postCodeDetail.wojewodztwo);
    facility.get('district')?.setValue(postCodeDetail.powiat);
    facility.get('address')?.setValue(facility.get('address')?.value + ' ' + postCodeDetail.miejscowosc);
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
