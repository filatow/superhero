import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RegistryService } from 'src/app/services/registry.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private registryService: RegistryService,
    public profileService: ProfileService
  ) {}

  logout() {
    this.registryService.nullifyActiveUserId();
    this.profileService.clearSavedSearches();
    this.authService.logout();
  }
}
