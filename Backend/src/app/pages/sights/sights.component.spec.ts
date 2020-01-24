import { TestBed, async } from '@angular/core/testing';
import { SightsComponent } from './sights.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SightsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [    
            RouterTestingModule,
          ],
         declarations: [
        SightsComponent
      ],
    }).compileComponents();
  }));

  it('Should render the Sight Module', async(() => {
    const fixture = TestBed.createComponent(SightsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
