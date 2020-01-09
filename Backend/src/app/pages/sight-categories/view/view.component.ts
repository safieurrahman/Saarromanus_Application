import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { AngularFirestore } from 'angularfire2/firestore';


import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class SightCategoriesViewComponent {
  settings = {
    hideSubHeader: true,
    mode: 'external',
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
    },
  };

  public source: LocalDataSource;

  constructor (private service: SmartTableData, private afs: AngularFirestore) {
    afs.collection('sight_categories').valueChanges().subscribe(res => {
      const result = res.map(row => { 
        for (let key in row['de']) {
          row[key+'_en'] = row['en'][key]
          row[key+'_de'] = row['de'][key]
          row[key+'_fr'] = row['fr'][key]
        }
        return row;
      });
      this.source= new LocalDataSource(result);
    })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
