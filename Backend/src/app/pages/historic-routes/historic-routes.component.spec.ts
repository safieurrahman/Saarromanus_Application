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

  /*
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  }));
  */
});
