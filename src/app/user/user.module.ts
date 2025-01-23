import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { StoreModule} from "@ngrx/store";
import { basketReducer } from "../core/store/transactions/transaction.reducer";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature('basket', basketReducer)
  ],
})
export class UserModule { }
