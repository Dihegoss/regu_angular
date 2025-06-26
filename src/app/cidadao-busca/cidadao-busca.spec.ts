import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadaoBusca } from './cidadao-busca';

describe('CidadaoBusca', () => {
  let component: CidadaoBusca;
  let fixture: ComponentFixture<CidadaoBusca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CidadaoBusca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CidadaoBusca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
