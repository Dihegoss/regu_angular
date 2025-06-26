import { Routes } from '@angular/router';
import { CidadaoBuscaComponent } from './cidadao-busca/cidadao-busca';

export const routes: Routes = [
  { path: '', component: CidadaoBuscaComponent },
  { path: '**', redirectTo: '' }
];
