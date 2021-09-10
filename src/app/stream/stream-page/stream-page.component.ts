import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stream-page',
  templateUrl: './stream-page.component.html',
  styleUrls: ['./stream-page.component.scss']
})
export class StreamPageComponent implements OnInit {

  _video = "http://localhost:8080/2020_02_29_23_50_01.mkv"

  constructor() { }

  ngOnInit(): void {
  }

}
