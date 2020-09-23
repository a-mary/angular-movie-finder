import { Component, OnInit} from '@angular/core';
import {Cast, MovieDetails, MoviesService} from '../service/movies.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogBodyComponent} from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movieDetails: MovieDetails;
  stars: string[] = Array();
  casts: Cast[];
  isLoading: boolean;

  constructor(private moviesServices: MoviesService, private router: ActivatedRoute, public dialog: MatDialog) {
    // this.isLoading = true;
    // console.log(this.isLoading + ' lt');
  }

  ngOnInit(): void {

    this.router.params.subscribe((params) => {
        this.isLoading = true;
        console.log(this.isLoading + ' load after init');
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      data: {
        poster: this.movieDetails.poster_path
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // ngAfterViewInit(): void {
  //   this.isLoading = false;
  //   console.log(this.isLoading + ' load after init');
  // }

  // ngDoCheck(): void {
  //   this.isLoading = false;
  //   console.log(this.isLoading + ' load do check');
  // }

  showMovie() {
    // if ()
    this.isLoading = false;
    console.log(this.isLoading + ' show movie');
  }
}
