import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
  userName: string = "";
  files: any = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userName = localStorage.getItem("userName") ?? "";

    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/login");
    }

    this.loadFiles();
  }

  loadFiles() {
    this.userService.getAllFiles(localStorage.getItem("userName") ?? "").subscribe((res: any) => { this.files = [{ file: res.attachmentFileData, name: res.fileName }]; }, err => { console.log(err) });
  }


  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  moveToUploads() {
    this.router.navigateByUrl("/upload");
  }

  download() {
    if (this.files[0].file && this.files[0].file.length == 0) {
      return;
    }

    try {

      const fileData = this.files[0].file[0];
      const fileName = this.files[0].name;

      const byteString = atob(fileData);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab]);
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url);

      alert("File downloaded successfully");
    }
    catch {
      alert("File download failed");
    }
  }
}
