import { BaseComponent } from '../../base/base-component';
import { KeyboardButton } from '../interfaces/desciption';
import { Component } from '../../base/component';
import { Subscription } from '../../base/subscription';
import { keyboardService } from '../services/keyboard-service';
import { Watcher } from '../../base/watcher';
import './button.scss';

class ButtonComponent extends BaseComponent {
  public btnInfo: KeyboardButton;

  public host: HTMLElement;

  public isPressed: boolean = false;

  public init(): void {
    this.btnInfo = JSON.parse(this.getAttribute('btn-info'));
    if (this.btnInfo.key === 'Quote') {
      this.btnInfo.en = {
        lowercase: '&#39',
        uppercase: '&#34',
        capsLowercase: '&#39',
        capsUppercase: '&#34',
      };
    }
    this.template = `
			<div class="key ${this.btnInfo.customClass ?? ''}">
				${this.btnInfo[keyboardService.language][keyboardService.currentCase]}
			</div>
		`;
  }

  public initHosts(): void {
    this.host = this.querySelector('.key');
  }

  public toggleState(isPressed: boolean): void {
    if (isPressed !== this.isPressed) {
      this.isPressed = isPressed;
      this.host.classList.toggle('azure');
    }
  }

  public onKeyDown(): void {
    switch (this.btnInfo.key) {
      case 'ShiftLeft':
      case 'ShiftRight':
        keyboardService.shiftKeyDown();
        break;
      case 'CapsLock':
        keyboardService.capsKeyDown();
        break;
      case 'AltLeft':
      case 'AltRight':
        keyboardService.altKeyDown();
        break;
      case 'ControlLeft':
      case 'ControlRight':
      case 'MetaLeft':
      case 'MetaRight':
        break;
      default:
        keyboardService.buttonPress.broadcast(this.host.innerHTML.trim());
        break;
    }
  }

  public onKeyUp(): void {
    switch (this.btnInfo.key) {
      case 'ShiftLeft':
      case 'ShiftRight':
        keyboardService.shiftKeyUp();
        break;
      case 'AltLeft':
      case 'AltRight':
        keyboardService.altKeyUp();
        break;
      case 'CapsLock':
        keyboardService.capsKeyUp();
        break;
      default:
        break;
    }
  }

  public initHandlers(): void {
    this.subscriptions.push(
      new Subscription<MouseEvent>(this.host, 'mousedown', () => {
        this.toggleState(true);
        this.onKeyDown();
      }),
      new Subscription<MouseEvent>(this.host, 'mouseup', () => {
        this.toggleState(false);
        this.onKeyUp();
      }),
      new Subscription<MouseEvent>(this.host, 'mouseleave', () => {
        this.toggleState(false);
      }),
      new Subscription<KeyboardEvent>(window, 'keydown', (event: KeyboardEvent) => {
        if (event.code === this.btnInfo.key) {
          this.toggleState(true);
          this.onKeyDown();
        }
      }),
      new Subscription<KeyboardEvent>(window, 'keyup', (event: KeyboardEvent) => {
        if (event.code === this.btnInfo.key) {
          this.toggleState(false);
          this.onKeyUp();
        }
      })
    );
    this.watchers.push(
      new Watcher(keyboardService.keyboardcase, () => {
        this.host.innerHTML = this.btnInfo[keyboardService.language][keyboardService.currentCase];
      })
    );
  }
}

export const buttonComponent = new Component('keyboard-btn', ButtonComponent);
