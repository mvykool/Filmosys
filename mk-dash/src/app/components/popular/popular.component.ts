import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-popular',
  imports: [MovieCardComponent],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss',
})
export class PopularComponent {
  movieService = inject(MovieService);
  movies: Signal<any> = toSignal(this.movieService.getPopularMovies());
}
