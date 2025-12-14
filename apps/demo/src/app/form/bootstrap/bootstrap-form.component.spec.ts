import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import { PreferencesState } from '../../state/preferences/preferences.state';
import { BootstrapFormComponent } from './bootstrap-form.component';

describe('BootstrapFormComponent', () => {
  let fixture: ComponentFixture<BootstrapFormComponent>;
  let component: BootstrapFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([PreferencesState])],
      teardown: { destroyAfterEach: false },
    });

    fixture = TestBed.createComponent(BootstrapFormComponent);
    component = fixture.componentInstance;
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('has form and value ', () => {
    fixture.componentRef.setInput('data', { definition: { children: [] }, model: {} });
    fixture.detectChanges();
    fixture.detectChanges();

    expect(component.form()).toBeTruthy();
    expect(component.value).toBeTruthy();
  });
});
