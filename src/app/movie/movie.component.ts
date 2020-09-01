import {Component, OnInit} from '@angular/core';
import {Cast, MovieDetails, MoviesService} from '../service/movies.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movieDetails: MovieDetails;
  stars: string[] = Array();
  casts: Cast[];

  constructor(private moviesServices: MoviesService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
        const param = 'id';
        const id = params[param];
        this.moviesServices.getMovie(id).subscribe(movie => {
          this.movieDetails = movie;
          this.stars = [];
          this.moviesServices.fillStarArr(movie.vote_average, this.stars);
        });
        this.moviesServices.getMovieCast(id).subscribe(cast => {
          this.casts = cast;
        });
      }
    );
  }

}
