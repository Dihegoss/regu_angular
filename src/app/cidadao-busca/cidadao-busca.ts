import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CidadaoService, Cidadao } from '../services/cidadao';

@Component({
  selector: 'app-cidadao-busca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cidadao-busca.html',
  styleUrl: './cidadao-busca.scss'
})
export class CidadaoBuscaComponent {
  cpf: string = '';
  cidadaos: Cidadao[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private cidadaoService: CidadaoService) {}

  pesquisar(): void {
    if (!this.cpf) {
      this.error = 'Por favor, preencha o campo CPF';
      return;
    }

    this.loading = true;
    this.error = '';
    this.cidadaos = [];

    this.cidadaoService.buscarCidadao(this.cpf).subscribe({
      next: (data) => {
        this.cidadaos = data;
        this.loading = false;
        if (data.length === 0) {
          this.error = 'Nenhum resultado encontrado';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Erro ao buscar dados. Tente novamente.';
        console.error('Erro na busca:', err);
      }
    });
  }

  limpar(): void {
    this.cpf = '';
    this.cidadaos = [];
    this.error = '';
  }
}
