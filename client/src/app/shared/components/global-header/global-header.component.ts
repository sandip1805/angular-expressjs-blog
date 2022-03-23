import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/menu.model';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss']
})
export class GlobalHeaderComponent implements OnInit {
  isModalOpen:boolean = false;

  menuItems:any = [];

  constructor() {
    this.menuItems.push(new Link('Home', ''), new Link('Categories', ''), new Link('Home', ''), new Link('Politics', ''), new Link('Business', ''), new Link('Health', ''), new Link('Design', ''), new Link('Sport', ''), new Link('Contact', ''))
   }

  ngOnInit(): void {
    console.log(this.menuItems);
  }

  onShowMobileMenuModal() {
    this.isModalOpen = !this.isModalOpen;    
  }

}
