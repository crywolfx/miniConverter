import { ipcRenderer } from 'electron';
// import fs from 'fs';
// import path from 'path';

export default class OpenFile {
  public openFile(): void {
    // 异步通讯
    ipcRenderer.send('openFile');
  }
}
