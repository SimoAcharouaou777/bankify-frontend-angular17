import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { StoreModule} from "@ngrx/store";
import { basketReducer } from "../core/store/transactions/transaction.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TransactionEffects} from "../core/store/transactions/transaction.effects";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    EffectsModule.forFeature([TransactionEffects]),
  ],
})
export class UserModule { }
