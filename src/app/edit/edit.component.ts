import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryEnum} from '../_enums/category.enum';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  facilityForm: FormGroup = new FormGroup({
    voivodeship: new FormControl(null),
    district: new FormControl(null),
    name: new FormControl(null),
    category: new FormControl(null),
    address: new FormControl(null),
    phone: new FormControl(null),
    email: new FormControl(null),
    website: new FormControl(null),
  });

  CategoryEnum = CategoryEnum;

  facilities: string[] = [
    'Zespół Szkół im. Gen. Dezyderego Chłapowskiego w Bolechowie',
    'Zespół Szkół  w Kórniku',
    'Liceum Ogólnokształcące im. Mikołaja Kopernika w Puszczykowie',
    'Zespół Szkół Nr 2 w Swarzędzu',
    'Zespół Szkół Nr 1 im. Powstańców Wielkopolskich w Swarzędzu',
    'Zespół Szkół im. Adama Wodziczki w Mosinie',
    'Zespół Szkół im. Jadwigi i Władysława Zamoyskich w Rokietnicy',
    'Specjalny Ośrodek Szkolno-Wychowawczy Dla Dzieci Niewidomych im. Synów Pułku w Owińskach',
    'Specjalny Ośrodek Szkolno-Wychowawczy im. Janusza Korczaka w Mosinie',
  ];

  selectedFacility: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  noOrder = (a: any, b: any): number => {
    return 0;
  };

  onSubmit(): void {

  }

  selectFacility(index: number): void {
    if (index !== this.selectedFacility) {
      this.selectedFacility = index;
    }
  }
}
