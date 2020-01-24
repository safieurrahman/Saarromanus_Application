import { TestBed, async } from '@angular/core/testing';
import { HistoricRoutesComponent } from './historic-routes.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HistoricRoutesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [    
            RouterTestingModule,
          ],
         declarations: [
            HistoricRoutesComponent
      ],
    }).compileComponents();
  }));

  it('Should render the Routes Module', async(() => {
    const fixture = TestBed.createComponent(HistoricRoutesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
