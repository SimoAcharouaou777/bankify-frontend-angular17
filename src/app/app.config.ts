import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore} from "@ngrx/store";
import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideEffects} from "@ngrx/effects";
import {TransactionEffects} from "./core/store/transactions/transaction.effects";
import {basketReducer} from "./core/store/transactions/transaction.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ basket: basketReducer }),
    provideEffects([])
  ]
};
