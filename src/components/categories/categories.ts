import { Component } from '@angular/core';

/**
 * Generated class for the CategoriesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'categories',
  templateUrl: 'categories.html'
})
export class CategoriesComponent {

  text: string;

  constructor() {
    console.log('Hello CategoriesComponent Component');
    this.text = 'Hello World';
  }

}
