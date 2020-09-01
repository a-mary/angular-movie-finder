import {Component, OnInit} from '@angular/core';
import {MoviesService, PersonDetail} from '../service/movies.service';
import {ActivatedRoute} from '@angular/router';

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
    this.router.params.subscribe((params) => {
        const param = 'id';
        const id = params[param];
        this.moviesServices.getPersonDetail(id).subscribe(person => {
          this.personDetail = person;
        });
      }
    );
  }
}
