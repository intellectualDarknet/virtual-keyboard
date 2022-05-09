import { Keyboard, KeyboardButton, KeyboardRow } from './main/interfaces/desciption';
import { mainModule } from './main/main.module';
import { loadService } from './main/services/load-services';
import './app.scss';

export class App {
  public static body: HTMLBodyElement = document.querySelector('body');

  public static keyboard: Keyboard;

  public static async initialize(): Promise<void> {
    mainModule.defineComponents();
    await mainModule.whenComponentsDefined();
    App.keyboard = await loadService.load('./assets/layouts.json');
  }

  public static render(): void {
    App.body.innerHTML = `
      <div class="app">
          <div class="keyboard">
              <keyboard-textarea></keyboard-textarea>
              ${App.keyboard
                .map(
                  (row: KeyboardRow) => `
                  <div class="row">
                      ${row
                        .map(
                          (btn: KeyboardButton) => `
                          <keyboard-btn btn-info='${JSON.stringify(btn)}'></keyboard-btn>
                      `
                        )
                        .join('')}
                  </div>
              `
                )
                .join('')}
          </div>
      </div>
    `;
  }

  public static start(): void {
    App.render();
  }
}
