import { TestBed, async } from '@angular/core/testing';
import { SightCategoriesComponent } from './sight-categories.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SightCategoriesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [    
            RouterTestingModule,
          ],
         declarations: [
        SightCategoriesComponent
      ],
    }).compileComponents();
  }));

  it('Should render the Sight Categories Module', async(() => {
    const fixture = TestBed.createComponent(SightCategoriesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
