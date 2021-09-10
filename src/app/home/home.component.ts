import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Movie} from '../shared/interfaces';
import {fromEvent, Subscription} from 'rxjs';

export interface Position {
  left: number;
  top: number;
  x: number;
  y: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  subscription: Subscription;

  pos: Position = {
    left: 0,
    top: 0,
    x: 0,
    y: 0
  };

  reverse: boolean;

  element: HTMLElement;
  @ViewChild('popularMoviesDiv') popularMoviesDiv: ElementRef;
  popularMovies: Movie[];
  topMovies: Movie[];
  upcomingMovies: Movie[];

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.moviesService.getMovieList('popular', '1').subscribe(response => {
      this.popularMovies = response.results;
    });


    this.moviesService.getMovieList('top', '1').subscribe(response => {
      this.topMovies = response.results;
    });

    this.moviesService.getMovieList('upcoming', '1').subscribe(response => {
      this.upcomingMovies = response.results;
    });

  }

  // scroll(el: HTMLElement) {
  //   el.scrollIntoView();
  // }

  scrollToNext(el: HTMLElement) {
    // console.log(this.el.nativeElement.scrollLeft);
    // console.log(this.el.nativeElement.scrollWidth);
    // console.log(this.el.nativeElement.scrollWidth-225);
    // 1125
    // 941
    let scrollSize:number = el.clientWidth - (el.clientWidth%236);
    if (el.scrollLeft < (el.scrollWidth - scrollSize))
      el.scrollLeft += scrollSize;
    else
      el.scrollLeft = el.scrollWidth;

    console.log(el.scrollLeft);
    console.log(el.scrollWidth);
    console.log(el.clientWidth);
    console.log(scrollSize);
    // console.log(this.el.nativeElement.scrollWidth-225);


  }

  scrollToPrev(el: HTMLElement) {
    let scrollSize:number = el.clientWidth - (el.clientWidth%236);

    if (el.scrollLeft >= scrollSize)
      el.scrollLeft -= scrollSize;
    else
      el.scrollLeft = 0;


  }

  mouseDownHandler(e, el: HTMLElement) {

    this.pos = {
      left: el.scrollLeft,
      top: el.scrollTop,
      x: e.clientX,
      y: e.clientY

    }

    // console.log(e.type);
    // console.log(this.pos);

    // this.element = el;

    // this.onMouseMove()
    // console.log(e.type);
    //
    // console.log(el.scrollLeft + " " + el.scrollTop);
    //
    // console.log(e.clientX);
    // console.log(e.clientY);
    //
    // this.subscription =
    //   fromEvent(document, 'mousemove')
    //     .subscribe((me: MouseEvent) => {
    //       console.log(me.type);
    //
    //       const dx = me.clientX - this.pos.x;
    //       const dy = me.clientY - this.pos.y;
    //
    // console.log(dx);
    // console.log(dy);
    //
    // // console.log(this.pos.top - dy);
    // // console.log(this.pos.left - dx);
    //
    //
    // //
    // //       // Scroll the element
    //       el.scrollTop = this.pos.top - (dy*2);
    //       el.scrollLeft = this.pos.left - (dx*2);
    // //       console.log(event);
    //     });



  }

  mouseUpHandler() {
    // this.subscription.unsubscribe();
  }

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(e) {
  //   const dx = e.clientX - this.pos.x;
  //   const dy = e.clientY - this.pos.y;
  //
  //   // Scroll the element
  //   this.element.scrollTop = this.pos.top - dy;
  //   this.element.scrollLeft = this.pos.left - dx;
  //   console.log(e);
  // }


  mouseWheelHandler(e, el:HTMLElement) {
    e.preventDefault();
    let wheelDelta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (wheelDelta > 0 ) {
      if (el.scrollLeft >= 236)
        el.scrollLeft -= 236;
      else
        el.scrollLeft = 0;


      // this.scrollToPrev(el)
    } else {

      if (el.scrollLeft < (el.scrollWidth - 236))

        el.scrollLeft += 236;
      else
        el.scrollLeft = el.scrollWidth;
      // this.scrollToNext(el);
    }
    console.log(wheelDelta);

  }

  ngAfterViewInit(): void {
    // this.reverse = false;
    // setInterval(() => {
    //   console.log("int");
    //
    //   let maxScrollLeft = this.popularMoviesDiv.nativeElement.scrollWidth - this.popularMoviesDiv.nativeElement.clientWidth;
    //   console.log(this.reverse);
    //
    //   if (this.reverse) {
    //     if (this.popularMoviesDiv.nativeElement.scrollLeft >= 236) {
    //
    //
    //       this.popularMoviesDiv.nativeElement.scrollLeft -= 236;
    //     } else{
    //       this.popularMoviesDiv.nativeElement.scrollLeft = 0;
    //       this.reverse = false;
    //     }
    //   } else {
    //     if (this.popularMoviesDiv.nativeElement.scrollLeft < maxScrollLeft) {
    //
    //       this.popularMoviesDiv.nativeElement.scrollLeft += 236;
    //       console.log(this.popularMoviesDiv.nativeElement.scrollLeft);
    //       console.log(maxScrollLeft);
    //
    //       console.log("next r");
    //     }
    //     else {
    //       this.reverse = true;
    //       console.log("reverse true " + this.reverse);
    //
    //       this.popularMoviesDiv.nativeElement.scrollLeft = maxScrollLeft;
    //     }
    //   }
    //
    //
    //   // if (!reverse) {
    //   //   if (this.popularMoviesDiv.nativeElement.scrollLeft < maxScrollLeft) {
    //   //
    //   //     this.popularMoviesDiv.nativeElement.scrollLeft += 236;
    //   //     console.log(this.popularMoviesDiv.nativeElement.scrollLeft);
    //   //     console.log(maxScrollLeft);
    //   //
    //   //     console.log("next r");
    //   //   }
    //   //   else {
    //   //     reverse = true;
    //   //     console.log("reverse true");
    //   //     this.popularMoviesDiv.nativeElement.scrollLeft = maxScrollLeft;
    //   //   }
    //   //
    //   //   console.log("next");
    //   // }
    //
    //   // else if (this.popularMoviesDiv.nativeElement.scrollLeft == maxScrollLeft ) {
    //   //   if (this.popularMoviesDiv.nativeElement.scrollLeft >= 236) {
    //   //
    //   //
    //   //     this.popularMoviesDiv.nativeElement.scrollLeft -= 236;
    //   //   }else{
    //   //     this.popularMoviesDiv.nativeElement.scrollLeft = 0;
    //   //     reverse = false;
    //   //   }
    //     console.log("prev");
    //
    //   // }
    //
    //   // if (this.popularMoviesDiv.nativeElement.scrollLeft == this.popularMoviesDiv.nativeElement.scrollWidth ) {
    //   //   if (this.popularMoviesDiv.nativeElement.scrollLeft >= 236)
    //   //     this.popularMoviesDiv.nativeElement.scrollLeft -= 236;
    //   //   else{
    //   //     this.popularMoviesDiv.nativeElement.scrollLeft = 0;
    //   //     reverse = true;
    //   //   }
    //   // } else {
    //   //   if (this.popularMoviesDiv.nativeElement.scrollLeft < (this.popularMoviesDiv.nativeElement.scrollWidth - 236))
    //   //     this.popularMoviesDiv.nativeElement.scrollLeft += 236;
    //   //   else
    //   //     this.popularMoviesDiv.nativeElement.scrollLeft = this.popularMoviesDiv.nativeElement.scrollWidth;
    //   // }
    //   console.log(this.popularMoviesDiv.nativeElement.scrollLeft);
    //   console.log(this.popularMoviesDiv.nativeElement.scrollWidth);
    //
    //
    // }, 2000)
  }
}
