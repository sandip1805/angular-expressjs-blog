import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBlogComponent } from 'src/app/modules/blog/add-blog/add-blog.component';
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
  @Output() updateData: EventEmitter<any> = new EventEmitter<any>();
  menuItems:any = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private ngbModal: NgbModal,
  ) {
    this.menuItems.push(new Link('Home', ''), new Link('Categories', ''), new Link('Politics', ''), new Link('Business', ''), new Link('Health', ''), new Link('Design', ''), new Link('Contact', ''), new Link('Add Blog', ''))
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

  onNavLinkClick(item: Link) {
    console.log(item);
    if (item?.name === "Add Blog") {
      this.openAddBlogModal();
    }
    else {
      return;
    }
  }

  openAddBlogModal() {
    const ngbRef = this.ngbModal.open(AddBlogComponent, {
      size: 'xl', centered: true
    });
  
    ngbRef.componentInstance.from = 'ADD';
    ngbRef.componentInstance.updateData.subscribe((res: any) => {
      if (res) this.updateData.emit(true);
    });
  }

}
