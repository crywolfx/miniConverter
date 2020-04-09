import { ipcMain, dialog } from 'electron';
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
    ipcMain.on('openFile', () => {
      dialog.showOpenDialog({
        title: '打开文件',
        defaultPath: 'xxx',
        properties: ['openFile', 'multiSelections'],
        filters: [
          {
            name: 'video',
            extensions: [
              'MP4',
              'WebM',
              'Ogg',
              'mkv',
              'avi',
              'MOV',
              'ASF',
              'WMV',
              'NAVI',
              '3GP',
              'FLV',
              'F4V',
              'RMVB',
              'HDDVD',
              'rm',
              'rmvb',
              'MP3'
            ]
          }
        ]
      });
    });
  }

  private addFolderEvent(): void {}
}
