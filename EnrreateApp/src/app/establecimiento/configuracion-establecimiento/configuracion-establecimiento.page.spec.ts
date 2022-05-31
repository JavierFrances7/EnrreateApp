import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfiguracionEstablecimientoPage } from './configuracion-establecimiento.page';

describe('ConfiguracionEstablecimientoPage', () => {
  let component: ConfiguracionEstablecimientoPage;
  let fixture: ComponentFixture<ConfiguracionEstablecimientoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionEstablecimientoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionEstablecimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
