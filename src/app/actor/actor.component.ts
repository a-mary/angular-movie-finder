import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {ActivatedRoute} from '@angular/router';
import {PersonDetail} from '../shared/interfaces';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit {

  personDetail: PersonDetail;

  constructor(private moviesServices: MoviesService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
        const id = params.get('id');
        this.moviesServices.getPersonDetail(id).subscribe(person => {
          this.personDetail = person;
        }, error => {
          console.log(error.message);
        });
      }
    );
  }
}
