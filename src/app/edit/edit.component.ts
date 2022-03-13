import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs';
import {CategoryEnum} from '../_enums/category.enum';
import {Facility} from '../_interfaces/facility';
import {FacilityService} from '../_services/facility.service';
import {SpinnerService} from '../_services/spinner.service';
import {CustomValidators} from '../_validators/custom.validators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  facilityForm: FormGroup = new FormGroup({
    voivodeship: new FormControl(null, [Validators.required, CustomValidators.noWhitespaceValidator]),
    district: new FormControl(null, [Validators.required, CustomValidators.noWhitespaceValidator]),
    name: new FormControl(null, [Validators.required, CustomValidators.noWhitespaceValidator]),
    category: new FormControl(null, [Validators.required]),
    address: new FormControl(null),
    phone: new FormControl(null),
    email: new FormControl(null),
    website: new FormControl(null),
  });

  dateSort: FormControl = new FormControl(false);
  facilities: Facility[] = [];
  CategoryEnum = CategoryEnum;

  selectedId: number | undefined;

  constructor(private facilityService: FacilityService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.fetchFacilities(true);
    this.dateSort.valueChanges.subscribe((value: boolean) => {
      this.sortFacilities(value);
    });
  }

  private fetchFacilities(init?: boolean): void {
    this.spinnerService.show();
    this.facilityService.fetchFacilities()
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((facilities: Facility[]) => {
        this.facilities = facilities;
        this.sortFacilities(this.dateSort.value);
        if (init) {
          this.selectFacility(this.facilities[0]?.id, this.facilities[0]);
        }
      });
  }

  onSubmit(): void {
    if (this.selectedId !== undefined && this.facilityForm.valid) {
      this.spinnerService.show();
      this.facilityService.updateFacility(this.selectedId, this.facilityForm.getRawValue())
        .subscribe(() => {
          this.fetchFacilities();
        });
    }
  }

  selectFacility(id: number | undefined, facility: Facility): void {
    if (id !== undefined && id !== this.selectedId) {
      this.selectedId = id;
      this.facilityForm.patchValue(facility);
    }
  }

  deleteFacility(): void {
    if (this.selectedId !== undefined) {
      this.facilityService.deleteFacility(this.selectedId).subscribe(() => {
        const index: number = this.facilities.findIndex(facility => facility.id === this.selectedId);
        if (index >= 0 && index < this.facilities.length - 1) {
          this.selectFacility(this.facilities[index + 1].id, this.facilities[index + 1]);
        } else if (this.facilities.length > 1) {
          this.selectFacility(this.facilities[index - 1].id, this.facilities[index - 1]);
        } else {
          this.selectedId = undefined;
        }
        this.fetchFacilities();
      });
    }
  }

  private sortFacilities(isSortDate: boolean): void {
    if (this.facilities.length > 0) {
      if (isSortDate) {
        // @ts-ignore
        this.facilities.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
      } else {
        // @ts-ignore
        this.facilities.sort((a, b) => a.id - b.id);
      }
    }
  }

  noOrder = (a: any, b: any): number => {
    return 0;
  };
}
