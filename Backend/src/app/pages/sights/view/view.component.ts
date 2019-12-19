import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore } from 'angularfire2/firestore';


import { SmartTableData } from '../../../@core/data/smart-table';
import { resolve } from 'url';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class SightsViewComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name_de: {
        title: 'Name (Deutsch)',
        type: 'string',
      },
      name_en: {
        title: 'Name (English)',
        type: 'string',
      },
      name_fr: {
        title: 'Name (French)',
        type: 'string',
      },
      information_de: {
        title: 'Information (Deutsch)',
        type: 'string',
      },
      information_en: {
        title: 'Information (English)',
        type: 'number',
      },
      information_fr: {
        title: 'Information (French)',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  public items: Observable<any[]>;

  constructor (private service: SmartTableData, db: AngularFirestore) {
    const data = db.collection('/historic_sites').get();
    // console.log(data);
    // this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
