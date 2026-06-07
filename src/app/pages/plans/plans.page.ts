import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plans',
  imports: [FormsModule],
  templateUrl: './plans.page.html'
})
export class PlansPage implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly zipCode = signal('');

  ngOnInit(): void {
    const zip = this.route.snapshot.queryParamMap.get('zip');
    if (zip && zip.length === 5) {
      this.zipCode.set(zip);
      this.onZipSubmit();
    }
  }

  onZipSubmit(): void {
    if (this.zipCode().length === 5) {
      this.router.navigate(['/enroll'], { queryParams: { zip: this.zipCode() } });
    }
  }
}
