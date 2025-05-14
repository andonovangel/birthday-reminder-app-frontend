import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public year?: number;

  ngOnInit(): void {
    const date = new Date();
    this.year = date.getFullYear();
  }
}
