import { ipcMain } from 'electron';
// import fs from 'fs';
// import path from 'path';

export default class OpenFile {
  constructor() {
    this.init();
  }

  public init(): void {
    this.addEvent();
  }

  private addEvent(): void {
    this.addFileEvent();
    this.addFolderEvent();
  }

  /**
   * @description open file
   * @author zhangzhe
   * @date 2020-04-08
   * @private
   * @memberof OpenFile
   */
  private addFileEvent(): void {
    ipcMain.on('openFile', e => {
      console.log(e);
    });
  }

  private addFolderEvent(): void {}
}
