import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  title = input<string | undefined>(); // Signal<string|undefined>
  filmBanner = input<string>();
  overview = input<string>();
  vote = input<string>();
  selected = output<{
    title: string | undefined;
    banner: string | undefined;
    overview: string | undefined;
    vote: string | undefined;
  }>();

  fullImageUrl = signal<string>('');

  ngOnInit(): void {
    this.generatePosterUrl();
  }

  onSelect(): void {
    this.selected.emit({
      title: this.title(),
      banner: this.filmBanner(),
      overview: this.overview(),
      vote: this.vote(),
    });
  }

  generatePosterUrl(): void {
    if (this.filmBanner()) {
      this.fullImageUrl.set(
        `https://image.tmdb.org/t/p/w500/${this.filmBanner()}`,
      );
    }
  }
}
