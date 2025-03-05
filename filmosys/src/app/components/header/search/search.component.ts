import { Component } from '@angular/core';
import { strings, Strings } from '../../../utils/constants';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchPlaceholder: string = strings.header.search;

  customStrings: Strings = strings;
}
