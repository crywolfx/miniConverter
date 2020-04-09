import { dialog } from './remote';
import FFMPEG, { FfprobeData } from './ffmpeg/core';

const ffmpeg = new FFMPEG();
class OpenFile {
  public filter(res: Electron.OpenDialogReturnValue) {
    const { canceled, filePaths } = res;
    return !canceled ? filePaths : [];
  }

  public openVideo() {
    return dialog
      .showOpenDialog({
        title: '打开文件',
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
      })
      .then(res => {
        const paths: string[] = this.filter(res);
        return this.getFileInfo(paths).then(videoInfo => {
          return videoInfo;
        });
      });
  }

  public getFileInfo(paths: string[]) {
    const getAllInfo = [];
    for (const path of paths) {
      getAllInfo.push(ffmpeg.getVideoInfo(path));
    }
    return Promise.all(getAllInfo);
  }

  public openFolder(): void {}
}

export default new OpenFile();
