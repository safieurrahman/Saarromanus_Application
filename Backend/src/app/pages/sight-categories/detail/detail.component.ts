import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router, Route, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html',
})
export class SightCategoriesDetailComponent {
  objectId: string
  objectDoc: any
  objectData: any 
  
  sightCategoryForm = new FormGroup({
    name_de: new FormControl(''),
    name_fr: new FormControl(''),
    name_en: new FormControl('')
  });
  
  constructor(private afs: AngularFirestore, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.objectId = params.id == null ? null : params.id;
      if(this.objectId !== null) {
        this.objectDoc = this.afs.doc('sight_categories/'+this.objectId);
        this.objectDoc.valueChanges().subscribe(res => {
          this.sightCategoryForm.patchValue({
            'name_de': res.de.name,
            'name_fr': res.fr.name,
            'name_en': res.en.name
          });
        });
      }
    });



  }



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
    if(this.objectId == null) { 
      this.afs.collection('sight_categories').add(result).then(() => {
        this.router.navigate(['/pages/sight-categories/view']);
      });
    } else {
      this.afs.doc('sight_categories/'+this.objectId).set(result).then(() => {
        this.router.navigate(['/pages/sight-categories/view']);
      })
    } 

  }
}
