import { Component, effect, inject, signal, Signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { PopularComponent } from '../popular/popular.component';

@Component({
  selector: 'app-hero',
  imports: [MovieCardComponent, PopularComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  movieService = inject(MovieService);
  movies: Signal<any> = toSignal(this.movieService.getPopularMovies());
  isChanging = signal<boolean>(false);
  isTitleChanging = signal<boolean>(false);
  selectedMovieBanner = signal<string>('');
  selectedMovieTitle = signal<string | undefined>('');

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
          this.selectedMovieTitle.set(firstMovie.title);
          this.selectedMovieBanner.set(
            `https://image.tmdb.org/t/p/original/${firstMovie.backdrop_path}`,
          );
        }
      }
    });
  }

  onMovieSelected(movieData: {
    banner: string | undefined;
    title: string | undefined;
  }): void {
    if (movieData && movieData.banner) {
      // Start both animations
      this.isChanging.set(true);
      this.isTitleChanging.set(true);

      // Fade out the title
      setTimeout(() => {
        // Update the movie title
        this.selectedMovieTitle.set(movieData.title);

        // Let the title fade back in after a short delay
        setTimeout(() => {
          this.isTitleChanging.set(false);
        }, 100);
      }, 250); // Wait a bit before changing the title

      // Handle background image change
      setTimeout(() => {
        this.selectedMovieBanner.set(
          `https://image.tmdb.org/t/p/original/${movieData.banner}`,
        );

        // Let the new image fade in
        setTimeout(() => {
          this.isChanging.set(false);
        }, 50);
      }, 300);
    }
  }
}
