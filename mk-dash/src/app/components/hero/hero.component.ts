import { Component, inject, Signal } from '@angular/core';
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
}
