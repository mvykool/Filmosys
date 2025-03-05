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
  selected = output<{
    title: string | undefined;
    banner: string | undefined;
  }>();

  fullImageUrl = signal<string>('');

  ngOnInit(): void {
    this.generatePosterUrl();
  }

  onSelect(): void {
    this.selected.emit({ title: this.title(), banner: this.filmBanner() });
  }

  generatePosterUrl(): void {
    if (this.filmBanner()) {
      this.fullImageUrl.set(
        `https://image.tmdb.org/t/p/w500/${this.filmBanner()}`,
      );
    }
  }
}
