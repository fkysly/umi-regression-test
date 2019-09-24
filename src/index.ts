import 'regenerator-runtime/runtime'; // temp
import entry from './entry';
import { IApi } from 'umi-types';

export default function(api: IApi, options) {
  api.registerCommand('uitest', {}, async args => {
    await entry(api, args);
  });
}
