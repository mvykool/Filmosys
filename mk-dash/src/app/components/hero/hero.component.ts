import { Component, effect, inject, signal, Signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-hero',
  imports: [MovieCardComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  movieService = inject(MovieService);
  movies: Signal<any> = toSignal(this.movieService.getPopularMovies());

  selectedMovieBanner = signal<string>('');

  constructor() {
    this.setInitialBackground();
  }

  setInitialBackground(): void {
    effect(() => {
      const moviesData = this.movies();
      if (moviesData && moviesData.length > 0 && !this.selectedMovieBanner()) {
        // Set the first movie as the default background
        const firstMovie = moviesData[0];
        if (firstMovie && firstMovie.backdrop_path) {
          this.selectedMovieBanner.set(
            `https://image.tmdb.org/t/p/original/${firstMovie.backdrop_path}`,
          );
        }
      }
    });
  }

  onMovieSelected(movieData: { banner: string | undefined }): void {
    // Set the selected movie banner
    this.selectedMovieBanner.set(
      `https://image.tmdb.org/t/p/original/${movieData.banner}`,
    );
  }
}
