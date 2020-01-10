import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore } from 'angularfire2/firestore';


import { SmartTableData } from '../../../@core/data/smart-table';
import { resolve } from 'url';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class SightsViewComponent {
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

  public source: LocalDataSource;

  constructor (private service: SmartTableData, private afs: AngularFirestore, private router: Router) {
    afs.collection('historic_sites').valueChanges({idField: 'id'}).subscribe(res => {
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

  onEdit(event): void {
    this.router.navigate(['/pages/sights/detail', event.data.id]);
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.afs.collection('historic_sites').doc(event.data.id).delete()
    }
  }
}
