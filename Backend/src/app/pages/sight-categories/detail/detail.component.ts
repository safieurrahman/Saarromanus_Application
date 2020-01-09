import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html',
})
export class SightCategoriesDetailComponent {
  db: AngularFirestoreCollection

  constructor(private afs: AngularFirestore, private router: Router) {
    this.db = this.afs.collection('sight_categories')
  }

  sightCategoryForm = new FormGroup({
    name_de: new FormControl(''),
    name_fr: new FormControl(''),
    name_en: new FormControl('')
  });

  public onSubmit() {
    const result = {
      de: {
        name : this.sightCategoryForm.value.name_de
      },
      en: {
        name : this.sightCategoryForm.value.name_en
      },
      fr: {
        name : this.sightCategoryForm.value.name_fr
      }
    }
    
    this.db.add(result).then(() => {
      this.router.navigate(['/pages/sight-categories/view'])
    })

  }
}
