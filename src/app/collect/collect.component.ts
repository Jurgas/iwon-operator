import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CategoryEnum} from '../_enums/category.enum';

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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
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
