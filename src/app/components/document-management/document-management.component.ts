import { Component } from '@angular/core';
import { SharedUtilsService } from 'src/app/services/shared-utils.service';

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.component.html',
  styleUrls: ['./document-management.component.scss']
})
export class DocumentManagementComponent {
  constructor(private sharedService: SharedUtilsService) { }
  selectedFile: File | any= null;
  attachedFiles: Array<File> = [];
  isLogin: boolean = false;
  
  ngOnInit() {
    this.isLogin = localStorage.getItem('loggedIn-user') == 'true'? true: false;
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.sharedService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          this.attachedFiles.push(response)
          alert('File uploaded successfully!');

        },
        error: (error) => {
          alert('File upload failed!');
        }
      });
    } else {
      alert('Please select a file first!');
    }
  }
}
