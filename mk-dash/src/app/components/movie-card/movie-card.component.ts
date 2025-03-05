import { CommonModule } from '@angular/common';
import { Component, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  title = input<string>(); // Signal<string|undefined>
  filmBanner = input<string>();

  fullImageUrl = signal<string>('');

  ngOnInit(): void {
    this.generatePosterUrl();
  }

  generatePosterUrl(): void {
    if (this.filmBanner()) {
      this.fullImageUrl.set(
        `https://image.tmdb.org/t/p/w500/${this.filmBanner()}`,
      );
    }
  }
}
