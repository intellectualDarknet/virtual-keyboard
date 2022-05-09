import { App } from './app';
import './styles/index.scss';

// tslint:disable-next-line: only-arrow-functions
(async function (): Promise<void> {
  await App.initialize();
  App.start();
})();
