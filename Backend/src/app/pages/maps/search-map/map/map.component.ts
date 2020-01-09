import { NgModule } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../entity/Location';
import { MouseEvent } from '@agm/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  zoom: number = 15;

  latitude:number = 49.239486;
  longitude:number = 6.994886; 

  sightsForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
    ) {
    this.createSightsForm();
  }

  sightsName = new FormControl([
    //Validators.required,
  ]);

  sightsDescription = new FormControl();
  sightsType = new FormControl();


  @Input()
  public set searchedLocation(searchedLocation: Location) {
    this.latitude = searchedLocation.latitude;
    this.longitude = searchedLocation.longitude;
    this.zoom = 15;
  }

  ngOnInit(): void {
    // set up current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.searchedLocation = new Location(
          position.coords.latitude, position.coords.longitude,
        );
      });
    }
  }

  markerDragEnd($event: MouseEvent){
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;

    console.log (this.latitude);
    console.log (this.longitude);
  }

  createSightsForm(){
    this.sightsForm = this.formBuilder.group({
      sightsName: [''],  
      sightsDescription: [''],
      sightsType: [''],
      
      de_sightsDescription: [''], 
    });
  }

  fileData: File = null;
  AudioData: File = null;
  de_AudioData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
 
ImageProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[1];
      this.preview();
}
 
preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
}

AudioProgress(fileInput: any) {
  this.AudioData = <File>fileInput.target.files[0];
}

DE_AudioProgress(fileInput: any) {
  this.de_AudioData = <File>fileInput.target.files[0];
}



public onSubmit() {
  {
  if(this.sightsForm.valid)
    {
    const formData = new FormData();
    formData.append('file', this.fileData);

    const formData1 = new FormData();
    formData1.append('file', this.AudioData);


    let new_sights = {};
      new_sights["name"]=this.sightsForm.value.sightsName;
      new_sights["description"]=this.sightsForm.value.sightsDescription;
      new_sights["de_description"]=this.sightsForm.value.de_sightsDescription;
      new_sights["type"]=this.sightsForm.value.sightsType;
      new_sights["longiitude"]=this.longitude;
      new_sights["latitude"]=this.latitude;
      new_sights["image"]=formData;
      new_sights["audio"]=formData1;
      new_sights["de_audio"]=formData1;

      //add image and audio data to new_sights and new_sights would be sent to data base via a service.

    /*this.http.post('url/to/your/api', formData) //for Image
      .subscribe(res => {
        console.log(res);
        this.uploadedFilePath = res.data.filePath;
        alert('SUCCESS !!');
      })*/
    
    console.log('Form data is : ', this.sightsForm.value );
    console.log('Full data is ', new_sights );
    }
  }
}


}
