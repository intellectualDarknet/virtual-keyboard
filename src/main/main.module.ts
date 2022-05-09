import { Module } from '../base/module';
import { buttonComponent } from './components/button';
import { textareaComponent } from './components/textarea';

export const mainModule: Module = new Module([buttonComponent, textareaComponent]);
