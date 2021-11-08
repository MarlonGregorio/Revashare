import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ResponseMessage } from 'src/app/classes/response-message';
import {Router, ROUTES} from "@angular/router"
import { UserService } from 'src/app/services/user.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import * as Constants from 'src/app/classes/constants';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  constructor(private storage: AngularFireStorage, private service: UserService, private router: Router) { }

  currentUser!: User;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  userName: string = '';

  @ViewChild('Password') passwordElement!: ElementRef;
  @ViewChild('AboutMe') aboutMeElement!: ElementRef;

  imageFile: File | null = null;
  imageUrlPreview: string = '';

  isWorking: boolean = false;
  
  ngOnInit(): void 
  {
    this.service.getCurrentUser().then(result => {
      if (result != null && result != undefined) {

        if (result.aboutMe == null) result.aboutMe = '';
        if (result.imageURL == null) result.imageURL = '';

        this.currentUser = result;
        this.userName = result.username;
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.email = result.email;
        this.imageUrlPreview = result.imageURL;
        this.aboutMeElement.nativeElement.value = result.aboutMe;
      }
    });
  }

  selectProfilePic(event: any) {
    var file = event.target.files[0];
    this.imageFile = file;
    this.getPreview(file).toPromise().then(result => {
      this.imageUrlPreview = result;
    });

  }

  getPreview(file: File): Observable<string> {
    return new Observable(obs => {
      const reader = new FileReader();
      reader.onload = () => {
        obs.next(reader.result as string);
        obs.complete();
      }
      reader.readAsDataURL(file);
    });
  }

  uploadProfilePic(file: File) : Promise<string> {
    var fileName = this.randomNumber() + "-" + file.name;
    var filePath = 'uploads/' + fileName;
    var uploadTask = this.storage.ref(filePath).put(file);

    return uploadTask.then(snapshot => {
      return snapshot.ref.getDownloadURL();
    }).then((url) => {
      return url
    });
  }

    //Simple randomNumber so files with the same name can be uploaded without overriding
    randomNumber(){
      return Math.random().toString().slice(2,12);
    }

  updateInformation() 
  {
    this.isWorking = true;

    var password = this.passwordElement.nativeElement.value as string;

    var user = new User('','','','','','','');
    user.id = this.currentUser.id;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.email = this.email;
    user.aboutMe = this.aboutMeElement.nativeElement.value;

    if (password != '') user.password = password;

    if (this.imageFile != null && this.imageFile != undefined) {
      this.uploadProfilePic(this.imageFile).then(result => {
        user.imageURL = result;
      },
      error => {
        alert(error);
      });
    }

    console.log(user);
    this.service.updateAccount(user).then(
      result => {
        this.isWorking = false;
        if (result != null) 
        {
          console.log(result);
          if (result.status == "success") window.location.reload();
        } 
      },
      error => {
        this.isWorking = false;
        alert(error);
      },
    );
    

  }


}
