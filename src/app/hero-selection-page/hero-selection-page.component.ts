import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { POWERUP_NAMES } from '../consts';
import { AuthService } from '../services/auth.service';
import { HeroesService } from '../services/heroes.service';
import { ProfileService } from '../services/profile.service';
import { RegistryService } from '../services/registry.service';
import { Hero } from '../shared/interfaces';
import { HERO_IMAGE_HEIGHT, HERO_IMAGE_WIDTH } from './consts';

@Component({
  selector: 'app-hero-selection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.scss']
})
export class HeroSelectionPageComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  searchInput: FormControl;
  routeQueryParamsSub: Subscription;
  apiSearchSub: Subscription;
  searchInputSub: Subscription;
  searchResults: Hero[] = [];
  savedSearches: string[];
  powerupNames = POWERUP_NAMES;
  heroImageWidth = HERO_IMAGE_WIDTH;
  heroImageHeight = HERO_IMAGE_HEIGHT;

  constructor(
    private authService: AuthService,
    private registryService: RegistryService,
    private heroesService: HeroesService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    public cd: ChangeDetectorRef,
  ) {}

  private sanitizeSearchInput = (newValue: string) => {
    const sanitizedValue = newValue
      .trimStart()
      .replace(/[^A-Za-z ]/, '')
      .replace(/[ ]+/g, ' ');

    if (sanitizedValue !== newValue) {
      this.searchInput.setValue(sanitizedValue);
    }
  }

  private formInit() {
    this.searchInput = new FormControl(null, []);
    this.searchInputSub = this.searchInput.valueChanges.subscribe({
      next: this.sanitizeSearchInput
    });

    this.searchForm = new FormGroup({
      searchInput: this.searchInput
    });
  }

  private savedSearchesInit() {
    this.savedSearches = this.profileService.getSavedSearches();
  }

  private processQueryParams() {
    this.routeQueryParamsSub = this.route.queryParams.subscribe((params: Params) => {
      if (params.doSearchByLetter) {
        this.doSearchByLetter(params.doSearchByLetter);
      }

      if (params.doSearch) {
        this.doSearch(params.doSearch);
      }
    })
  }

  ngOnInit(): void {
    this.formInit();
    this.savedSearchesInit();
    this.processQueryParams();
  }

  doSearch(request?: string) {
    if (request) {
      this.searchInput.setValue(request);
    } else {
      request = this.searchInput.value.trimEnd();
    }

    this.apiSearchSub = this.heroesService
      .search(request)
      .subscribe({
        next: (response: Hero[]) => {
          this.searchResults = response;
        }
      });

    this.profileService.saveSearchedString(request);
  }

  doSearchByLetter(letter: string) {
    this.searchInput.setValue(letter);
    this.apiSearchSub = this.heroesService
      .search(letter)
      .subscribe({
        next: (response: Hero[]) => {
          this.searchResults = response.filter(
            (hero: Hero) => hero.name.startsWith(letter)
          );
        }
      });
  }

  selectHero(heroId: string) {
    this.profileService.addHero(
      this.searchResults.find((hero: Hero) => hero.id === heroId)
    );
  }

  isHeroSelected(heroId: string) {
    return this.profileService.isHeroInList(heroId);
  }

  logout() {
    this.registryService.nullifyActiveUserId();
    this.profileService.clearSavedSearches();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.apiSearchSub) {
      this.apiSearchSub.unsubscribe();
    }

    if (this.searchInputSub) {
      this.searchInputSub.unsubscribe();
    }

    if (this.routeQueryParamsSub) {
      this.routeQueryParamsSub.unsubscribe();
    }
  }
}
