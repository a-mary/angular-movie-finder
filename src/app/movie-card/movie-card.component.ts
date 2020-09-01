import {Component, Input, OnInit} from '@angular/core';
import {Movie, MoviesService} from '../service/movies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input()
  movie: Movie;
  stars: string[] = Array();

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.moviesService.fillStarArr(this.movie.vote_average, this.stars);
  }

}
