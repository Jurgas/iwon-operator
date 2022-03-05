import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SpinnerService} from './_services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'iwon-operator';
  isSpinner$: Observable<boolean> = of(false);

  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.isSpinner$ = this.spinnerService.state$;
  }
}
