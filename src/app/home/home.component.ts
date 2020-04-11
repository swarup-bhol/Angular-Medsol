import { Component, OnInit } from '@angular/core';
import { HeaderService } from './../Services/header.service'
import {Endpoint} from '../ApiEndpoints/Endpoint';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _hs: HeaderService) { }

  ngOnInit() {
    this._hs.header.next(false);
  }

}
