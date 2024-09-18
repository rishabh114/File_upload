// src/app/app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userInput: string = '';
  result: string = '';

  // Vulnerable method with unchecked loop condition
  performLoop(): void {
    const iterations = parseInt(this.userInput, 10);
    
    // Unchecked loop condition - can lead to performance issues or DoS
    if (!isNaN(iterations) && iterations > 0) {
      let output = '';
      for (let i = 0; i < iterations; i++) {
        output += `Iteration ${i + 1}\n`;
      }
      this.result = output;
    } else {
      this.result = 'Please enter a valid number greater than zero.';
    }
  }

  // XSS vulnerability by directly binding user input to innerHTML
  displayUserInput() {
    return this.userInput; // Dangerous if userInput contains HTML/JS
  }
}