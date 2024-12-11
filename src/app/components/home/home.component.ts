import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tiles = [
    {
      title: 'User Management:',
      description: 'Managing and Controlling User Access ',
      link: '/user-management'
    },
    {
      title: 'Document Management:',
      description: 'Upload, Manage  and Organize Documents.',
      link: './document-management'
    },
    {
      title: 'Q&A Interface:',
      description: 'User-friendly interface for asking Questions, receiving answers'
    },
  ];

}
