import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteVerPerfilEstablecimientoPage } from './cliente-ver-perfil-establecimiento.page';

describe('ClienteVerPerfilEstablecimientoPage', () => {
  let component: ClienteVerPerfilEstablecimientoPage;
  let fixture: ComponentFixture<ClienteVerPerfilEstablecimientoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteVerPerfilEstablecimientoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteVerPerfilEstablecimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
