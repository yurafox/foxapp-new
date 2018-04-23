import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {IDictionary} from '../../core/app-core';
import {CurrencyStore} from '../../service/index';

const map: IDictionary<{name: string, culture: string}> = {
  '4': {name: 'UAH', culture: 'uk-UA'},
  '3': {name: 'EUR', culture: 'en-US'},
  '0': {name: 'USD', culture: 'en-US'},
  '20': {name: 'MDL', culture: 'md-MD'}
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
    if (!value) return null;
    let currencyText: string = map[currencyCode.toString()].name;
    let dataUpdate = this.currencyStore.changeCurrency(+value, +currencyCode);
    return new CurrencyPipe(currencyText).transform(dataUpdate, currencyText, nickDisplay, digits);
  }
}
