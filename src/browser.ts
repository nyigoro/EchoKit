import { EchoKyt as EchoKytClass } from './echokyt.js';
import * as api from './index.js';

type BrowserApi = typeof EchoKytClass & typeof api;

const browserApi = Object.assign(EchoKytClass, api, {
  from: EchoKytClass.from,
}) as BrowserApi;

if (typeof globalThis !== 'undefined') {
  (globalThis as typeof globalThis & { EchoKyt?: BrowserApi }).EchoKyt = browserApi;
}

export default browserApi;
