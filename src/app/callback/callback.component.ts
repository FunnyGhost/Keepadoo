import { AfterViewInit, Component } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'kpd-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements AfterViewInit {
  constructor(private authService: AuthenticationService) {}

  ngAfterViewInit() {
    this.authService.continueFromWhereYouLeftOff();
  }
}
