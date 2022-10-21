import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './modelo/acoes';
import { AcoesService } from './acoes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent implements OnInit, OnDestroy {
  acoesInput = new FormControl();
  
  constructor(
    private acoesService: AcoesService
  ) {}

  
  // Exemplo 1: 
  // Utilizando subscription para criar/destruir o observable
  acoes: Acoes;
  private subscription: Subscription
  ngOnInit(): void {
    this.subscription = this.acoesService.getAcoes().subscribe(data => {
      this.acoes = data;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  // Exemplo 2: 
  // Utilizando o pipe async no template
  acoes$ = this.acoesService.getAcoes();
}
