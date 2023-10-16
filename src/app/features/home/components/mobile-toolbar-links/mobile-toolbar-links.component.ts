import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-toolbar-links',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './mobile-toolbar-links.component.html',
  styleUrls: ['./mobile-toolbar-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileToolbarLinksComponent {
  @Input() links: { label: string; routerLink: string[] }[] = [];
  @Output() clickedInItem:EventEmitter<any> = new EventEmitter();
  @Output() clickedOnDropdown:EventEmitter<any> = new EventEmitter();



  clickOnMenuItem(e:Event){
    e.stopPropagation();
    this.clickedInItem.emit();
  }

  clickOnDropDown(e:Event){
    e.stopPropagation();
    this.clickedOnDropdown.emit();

  }


  constructor() {}

}
