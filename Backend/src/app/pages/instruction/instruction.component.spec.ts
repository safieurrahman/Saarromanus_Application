import { TestBed, async } from '@angular/core/testing';
import { InstructionDetailComponent } from './detail/detail.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('InstructionComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [    
            RouterTestingModule,
          ],
         declarations: [
          InstructionDetailComponent
      ],
    }).compileComponents();
  }));

  it('Should render the Instruction Module', async(() => {
    const fixture = TestBed.createComponent(InstructionComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
