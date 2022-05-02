import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from '../../models/menu.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss']
})
export class GlobalHeaderComponent implements OnInit {
  isModalOpen:boolean = false;
  userStatus: boolean = false;

  menuItems:any = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.menuItems.push(new Link('Home', ''), new Link('Categories', ''), new Link('Home', ''), new Link('Politics', ''), new Link('Business', ''), new Link('Health', ''), new Link('Design', ''), new Link('Sport', ''), new Link('Contact', ''))
   }

  ngOnInit(): void {
    console.log(this.menuItems);
    this.getUserStatus();
  }

  getUserStatus() {
    this.userService.getUserStatus.subscribe(status => {
      console.log(status);
      this.userStatus = status;
    })
  }


  onShowMobileMenuModal() {
    this.isModalOpen = !this.isModalOpen;    
  }

  onLoginIconClick() {
    if (!this.userStatus) {
      this.router.navigate(['/login'],{
        queryParams: {
          isSignUp: JSON.stringify({
            isSignUp: false
          })
        }
      });
    }
    else {
      this.userService.setUserStatus = false;
    }
  }

  onSignUpIconClick() {
    this.router.navigate(['/login'], {
      queryParams: {
        isSignUp: JSON.stringify({
          isSignUp: true
        })
      }
    });
  }

}
