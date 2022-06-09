import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisEventosEstablecimientoPage } from './mis-eventos-establecimiento.page';

describe('MisEventosEstablecimientoPage', () => {
  let component: MisEventosEstablecimientoPage;
  let fixture: ComponentFixture<MisEventosEstablecimientoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MisEventosEstablecimientoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisEventosEstablecimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
