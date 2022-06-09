import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventosGuardadosUsuarioPage } from './eventos-guardados-usuario.page';

describe('EventosGuardadosUsuarioPage', () => {
  let component: EventosGuardadosUsuarioPage;
  let fixture: ComponentFixture<EventosGuardadosUsuarioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosGuardadosUsuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventosGuardadosUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
