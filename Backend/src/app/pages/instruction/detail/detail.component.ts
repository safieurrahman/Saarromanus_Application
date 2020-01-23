import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html',
})
export class InstructionDetailComponent {
  objectId: string
  objectDoc: any
  objectData: any 
  
  instructionForm = this.formBuilder.group({
    content_de: ['', Validators.required],
    content_fr: ['', Validators.required],
    content_en: ['', Validators.required],
  });

  submitted = false;

  constructor(private afs: AngularFirestore, private router: Router, private formBuilder: FormBuilder) {   
    afs.collection('instruction_manual').valueChanges({idField: 'id'}).subscribe(res => {
      this.objectData = res[0];
      this.instructionForm.patchValue({
        content_de: this.objectData.de.content,
        content_fr: this.objectData.fr.content,
        content_en: this.objectData.en.content,
      });
    });
  }

    // convenience getter for easy access to form fields
    get f() { return this.instructionForm.controls; }

  public onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.instructionForm.invalid) {
        return;
    }

    const result = {
      de: {
        content: this.instructionForm.value.content_de
      },
      en: {
        content: this.instructionForm.value.content_en
      },
      fr: {
        content: this.instructionForm.value.content_fr
      }
    }
    console.log("reult", result);
    this.afs.doc('instruction_manual/'+this.objectData.id).set(result).then(() => {
      this.router.navigate(['/pages/']);
    })

  }
}
