import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  userName: string = "";
  formData: any;
  selectedFiles: any = [];
  files: any = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userName = localStorage.getItem("userName") ?? "";

    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/login");
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  fileSelectionChanged(event: Event) {
    this.selectedFiles = [];

    const element = event.currentTarget as HTMLInputElement;
    this.files = element.files;

    let fileList: FileList | null = element.files;
    if (fileList) {
      for (let itm in fileList) {
        let item: File = fileList[itm];

        if ((itm.match(/\d+/g) != null) && (!this.selectedFiles.includes(item['name'])))
          this.selectedFiles.push(item['name']);
      }
    }
  }

  uploadFiles() {
    this.formData = new FormData();
    if (this.selectedFiles.length) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.formData.append('files', this.files[i],
          this.files[i].name);
      }

      this.userService.uploadFiles(this.formData, localStorage.getItem("token") ?? "").subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(this.selectedFiles.length +
            " files not uploaded. Error: " + err.error.error);
        }
      );
    }
  }

  saveByteArray(bytes: any) {
    var blob = new Blob([bytes]);
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = "fileName";
    link.click();
  }

  moveToDownloads() {
    this.router.navigateByUrl("/download");
  }
}
