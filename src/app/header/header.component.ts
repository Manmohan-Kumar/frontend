import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  checked: boolean;
  disabled: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.slider.subscribe(bVal => {this.checked = bVal; this.disabled = !bVal; });
  }
  onChange(event) {
    this.authService.logout();
    this.authService.onLogin.next(event.checked);
  }

}
