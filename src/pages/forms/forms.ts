import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormLayoutPage } from '../form-layout/form-layout';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { FiltersPage } from '../_filters/filters';
import { FormValidationsPage } from '../_form-validations/form-validations';

@Component({
  selector: 'forms-page',
  templateUrl: 'forms.html'
})
export class FormsPage {
  items: Array<{title: string, note?: string, component: any}>;

  constructor(
    public nav: NavController,
    public translate: TranslateService
  ) {
  }

  ionViewWillEnter(){
    Observable.forkJoin(
      this.translate.get('FORMS_EXAMPLES'),
      this.translate.get('FILTERS'),
      this.translate.get('FORM_VALIDATIONS')
    ).subscribe(data => {
      this.items = [
        { title: data[0], component: FormLayoutPage },
        { title: data[1], component: FiltersPage },
        { title: data[2], component: FormValidationsPage }
      ];
    });
  }

  itemTapped(event, item) {
    this.nav.push(item.component);
  }
}
