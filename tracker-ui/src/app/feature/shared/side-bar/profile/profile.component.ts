import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";


import {AuthService} from "@services";
import {IUser} from "@models";
import {ConfirmGenericComponent} from "../../dialog/confirm-generic/confirm-generic.component";


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: IUser;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  onDeleteAccount() {
    this.dialog.open(ConfirmGenericComponent, {
      data: {
        title: 'Do you want to delete your account?',
        message: 'Your account and all it\'s data will be removed completely.',
        onConfirm: () => {
          this.authService.deleteUser()
            .subscribe(() => {
              this.router.navigate(['auth']);
            })
        }
      }
    })
  }

}
