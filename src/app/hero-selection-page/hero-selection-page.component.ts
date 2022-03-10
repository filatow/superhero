import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HeroesService } from '../services/heroes.service';
import { ProfileService } from '../services/profile.service';
import { RegistryService } from '../services/registry.service';
import { Hero, SearchError } from '../shared/interfaces';

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.scss']
})
export class HeroSelectionPageComponent implements OnInit, AfterViewInit, OnDestroy {
  searchForm: FormGroup;
  apiSearchSub: Subscription;
  searchInputSub: Subscription;
  searchResults: Hero[] = [];
  @ViewChild('searchInput') searchInputRef: ElementRef;
  searchInput$: Observable<InputEvent>;
  savedSearches: string[];

  constructor(
    private authService: AuthService,
    private registryService: RegistryService,
    private heroesService: HeroesService,
    public profileService: ProfileService
  ) {}

  private sanitizeSearchInput = (inputEvent: InputEvent) => {
    const inputElement = inputEvent.target as HTMLInputElement;

    this.searchForm.get('searchInput').setValue(
      inputElement.value
        .trimStart()
        .replace(/[^A-Za-z ]/, '')
        .replace(/[ ]+/g, ' ')
    );
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(null, [])
    });

    this.savedSearches = this.profileService.getSavedSearches();
  }

  ngAfterViewInit(): void {
    this.searchInput$ = fromEvent(this.searchInputRef.nativeElement, 'input');
    this.searchInputSub = this.searchInput$.subscribe({
      next: this.sanitizeSearchInput,
    });
  }

  doSearch(request?: string) {
    if (request) {
      this.searchForm.get('searchInput').setValue(request);
    } else {
      request = this.searchForm.get('searchInput').value.trimEnd();
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
    this.searchForm.get('searchInput').setValue(letter);
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
    this.profileService.addHero(heroId);
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
  }
}
