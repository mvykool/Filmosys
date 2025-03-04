import { Component, inject, Signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  movieService = inject(MovieService);
  movies: Signal<any> = toSignal(this.movieService.getPoke());
}
