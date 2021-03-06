import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {IDictionary} from '../../core/app-core';
import {CurrencyStore} from '../../service/index';

const map: IDictionary<{name: string, culture: string}> = {
  '0': {name: 'UAH', culture: 'uk-UA'},
  '1': {name: 'EUR', culture: 'en-US'},
  '2': {name: 'USD', culture: 'en-US'},
  '3': {name: 'MDL', culture: 'md-MD'}
};

@Pipe({
  name: 'localeCurrency'
})

export class LocaleCurrencyPipe implements PipeTransform {
  constructor(private currencyStore: CurrencyStore) {

  }

  transform(value: any,
            currencyCode: number,
            nickDisplay: boolean = true,
            digits: string = null): any {
    let currencyText: string = map[currencyCode.toString()].name;
    let dataUpdate = this.currencyStore.changeCurrency(+value, +currencyCode);
    return new CurrencyPipe(currencyText).transform(dataUpdate, currencyText, nickDisplay, digits);
  }
}
