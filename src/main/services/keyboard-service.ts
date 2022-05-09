import { Observer } from '../../base/observer';
import { KeyboardTransform } from '../interfaces/keyboard-transform';
import { Language } from '../interfaces/language';

class KeyboardService {
  public keyboardcase = new Observer();

  public buttonPress = new Observer();

  public isShiftPress: boolean = false;

  public isAltPress: boolean = false;

  public isCapsFlowBlocked: boolean = false;

  public isLanguageFlowBlocked: boolean = false;

  public currentCase: KeyboardTransform = KeyboardTransform.Lowercase;

  public language: Language = (localStorage.getItem('language') as Language) ?? Language.En;

  public capsKeyDown(): void {
    if (!this.isCapsFlowBlocked) {
      switch (this.currentCase) {
        case KeyboardTransform.Lowercase:
          this.currentCase = KeyboardTransform.CapsLowercase;
          break;
        case KeyboardTransform.Uppercase:
          this.currentCase = KeyboardTransform.CapsUppercase;
          break;
        case KeyboardTransform.CapsLowercase:
          this.currentCase = KeyboardTransform.Lowercase;
          break;
        case KeyboardTransform.CapsUppercase:
          this.currentCase = KeyboardTransform.Uppercase;
          break;
      }
      this.isCapsFlowBlocked = true;
      this.keyboardcase.broadcast();
    }
  }

  public capsKeyUp(): void {
    this.isCapsFlowBlocked = false;
  }

  public shiftKeyDown(): void {
    this.isShiftPress = true;
    if (this.isAltPress && this.isShiftPress) {
      this.changeLanguage();
    } else {
      switch (this.currentCase) {
        case KeyboardTransform.CapsLowercase:
          this.currentCase = KeyboardTransform.CapsUppercase;
          this.keyboardcase.broadcast();
          break;
        case KeyboardTransform.Lowercase:
          this.currentCase = KeyboardTransform.Uppercase;
          this.keyboardcase.broadcast();
          break;
        default:
          break;
      }
    }
  }

  public shiftKeyUp(): void {
    switch (this.currentCase) {
      case KeyboardTransform.CapsUppercase:
        this.currentCase = KeyboardTransform.CapsLowercase;
        this.keyboardcase.broadcast();
        break;
      case KeyboardTransform.Uppercase:
        this.currentCase = KeyboardTransform.Lowercase;
        this.keyboardcase.broadcast();
        break;
      default:
        break;
    }
    this.isShiftPress = false;
    this.isLanguageFlowBlocked = false;
  }

  public altKeyDown(): void {
    this.isAltPress = true;
    if (this.isShiftPress) {
      this.changeLanguage();
    }
  }

  public altKeyUp(): void {
    this.isLanguageFlowBlocked = false;
    this.isAltPress = false;
  }

  public changeLanguage(): void {
    if (!this.isLanguageFlowBlocked) {
      this.isLanguageFlowBlocked = true;
      switch (this.language) {
        case Language.En:
          this.language = Language.Ru;
          break;
        case Language.Ru:
          this.language = Language.En;
          break;
        default:
          break;
      }
      localStorage.setItem('language', this.language);
    }
    this.keyboardcase.broadcast();
  }
}

export const keyboardService = new KeyboardService();
