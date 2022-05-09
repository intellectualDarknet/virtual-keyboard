import { BaseComponent } from '../../base/base-component';
import { Component } from '../../base/component';
import { Subscription } from '../../base/subscription';
import { Watcher } from '../../base/watcher';
import { keyboardService } from '../services/keyboard-service';
import './textarea.scss';

class TextareaComponent extends BaseComponent {
  public host: HTMLTextAreaElement;

  public init() {
    this.template = `
			<textarea class="textarea" placeholder="Смена раскладки производится нажатием на alt + shift"></textarea>
		`;
  }

  public initHosts(): void {
    this.host = this.querySelector('.textarea');
    this.host.focus();
  }

  public initHandlers(): void {
    this.watchers.push(
      new Watcher(keyboardService.buttonPress, (str: string) => {
        if (['space', 'enter', 'backspace', 'del', 'tab', '←', '→', 'ctrl'].includes(str)) {
          switch (str) {
            case 'space':
              this.insertSymbol(' ');
              break;
            case 'enter':
              this.insertSymbol('\n');
              break;
            case 'tab':
              this.insertSymbol('\t');
              break;
            case 'backspace':
              if (this.host.selectionEnd) {
                this.host.value = this.host.value.slice(0, this.host.selectionEnd - 1) + this.host.value.slice(this.host.selectionEnd);
              }
              break;
            case 'del':
              if (this.host.selectionEnd < this.host.value.length) {
                const selection: number = this.host.selectionEnd;
                this.host.value = this.host.value.slice(0, this.host.selectionEnd) + this.host.value.slice(this.host.selectionEnd + 1);
                this.host.selectionEnd = selection;
                this.host.selectionStart = selection;
              }
              break;
            case '←':
              if (this.host.selectionEnd) {
                this.host.selectionStart = this.host.selectionStart - 1;
                this.host.selectionEnd = this.host.selectionEnd - 1;
              }
              break;
            case '→':
              if (this.host.selectionStart < this.host.value.length) {
                this.host.selectionStart = this.host.selectionStart + 1;
              }
              break;
            default:
              break;
          }
        } else {
          this.insertSymbol(str);
        }
      })
    );

    this.subscriptions.push(
      new Subscription<KeyboardEvent>(window, 'keydown', (event: KeyboardEvent) => {
        event.preventDefault();
      }),
      new Subscription<MouseEvent>(document, 'mousedown', (event: Event) => {
        event.preventDefault();
      })
    );
  }

  public insertSymbol(symbol: string) {
    const selection: number = this.host.selectionEnd;
    this.host.value = this.host.value.slice(0, this.host.selectionEnd) + symbol + this.host.value.slice(this.host.selectionEnd);
    this.host.selectionEnd = selection + 1;
    this.host.selectionStart = selection + 1;
  }
}

export const textareaComponent = new Component('keyboard-textarea', TextareaComponent);
