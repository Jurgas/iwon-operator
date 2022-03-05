import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  searchWebsiteForm: FormGroup = new FormGroup({
    website: new FormControl(null, Validators.required),
    crawlWebsite: new FormControl(false),
  });

  selectedFile: File | undefined;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToCollect(): void {
    this.router.navigate(['/collect']);
  }

  goToEdit(): void {
    this.router.navigate(['/edit']);
  }

  onWebsiteSubmit(): void {
    if (this.searchWebsiteForm.valid) {
      this.router.navigate(
        ['/collect'],
        {
          queryParams:
            {website: this.searchWebsiteForm.get('website')?.value},
        });
    }
  }

  selectFile($event: Event): void {
    // @ts-ignore
    this.selectedFile = $event.target['files'][0];
    console.log(this.selectedFile);
  }

  fileSubmit(): void {
    if (!!this.selectedFile) {
      this.goToCollect();
    }
  }
}
