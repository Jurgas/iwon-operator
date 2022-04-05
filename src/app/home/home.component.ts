import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  searchWebsiteForm: FormGroup = new FormGroup({
    website: new FormControl(null, Validators.required),
    file: new FormControl(null, Validators.required),
    crawlWebsite: new FormControl(false),
  });

  constructor(private router: Router) {
  }

  goToCollect(): void {
    this.router.navigate(['/collect']);
  }

  goToEdit(): void {
    this.router.navigate(['/edit']);
  }

  onSubmit(): void {
    if (this.searchWebsiteForm.get('website')?.valid || this.searchWebsiteForm.get('file')?.valid) {
      let website = this.searchWebsiteForm.get('website')?.value || this.searchWebsiteForm.get('file')?.value;
      if (!website.startsWith('https://') && !website.startsWith('http://')) {
        website = 'http://' + website;
      }
      this.router.navigate(
        ['/collect'],
        {
          queryParams: {
            website: website,
            follow_links: this.searchWebsiteForm.get('crawlWebsite')?.value ? 'y' : 'n',
            file: this.searchWebsiteForm.get('file')?.value ? 'y' : 'n',
          },
        });
    }
  }
}
