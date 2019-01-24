import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { NotificationsPage } from '../notifications/notifications';
import { List1Page } from '../list-1/list-1';

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
    this.tab1Root = List1Page;
    this.tab2Root = ProfilePage;
    this.tab3Root = NotificationsPage;
  }
}
