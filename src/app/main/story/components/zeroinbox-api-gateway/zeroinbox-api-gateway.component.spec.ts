import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroinboxApiGatewayComponent } from './zeroinbox-api-gateway.component';

describe('ZeroinboxApiGatewayComponent', () => {
  let component: ZeroinboxApiGatewayComponent;
  let fixture: ComponentFixture<ZeroinboxApiGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeroinboxApiGatewayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroinboxApiGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
