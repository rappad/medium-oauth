import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../service/publication.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  publications: any;

  constructor(public publicationSerice: PublicationService) {
    this.publicationSerice.getPublications().subscribe(publicationList => {
      this.publications = JSON.parse(localStorage.getItem('publicationsList')).data;
    });
  }

  ngOnInit() {
  }
}
