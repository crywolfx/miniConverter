import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import { formatSize } from '../utils';
const childProcess = require("child_process");
// const pathToFfmpeg = '/Users/zhangzhe/electron/ffmpegDemo/node_modules/ffmpeg-static/ffmpeg';

// childProcess.exec(`${pathToFfmpeg} -h`, () => {
//     childProcess.spawn(`${pathToFfmpeg}`, ['-i', '/Users/zhangzhe/electron/ffmpegDemo/input.mp4', '-r' ,'24' ,'/Users/zhangzhe/electron/ffmpegDemo/output2.mp4']);
// })
console.log(ffmpegStatic);
console.log(__dirname);
export interface InfoFormat {
  size: string;
  type: string;
  fileName: string;
  videoStream: ffmpeg.FfprobeStream;
}

export interface FfprobeData extends ffmpeg.FfprobeData {
  formatData: InfoFormat;
}

class Ffmpeg {
  private ffmpeg: typeof ffmpeg;
  private placeHolder: string;

  constructor() {
    this.ffmpeg = ffmpeg;
    this.placeHolder = 'N/A';
  }

  private formatInfo(data: ffmpeg.FfprobeData) {
    const { format = {}, streams = [] } = data;
    const { size = 0, filename = '' } = format;

    const videoStream: ffmpeg.FfprobeStream =
      streams.filter(
        stream => stream.codec_type === 'video' && stream.duration !== this.placeHolder
      )[0] || {};
    const fileFullName: string = filename.split('/').pop() || '';
    const fileArr: string[] = fileFullName.split('.');

    const formatData: InfoFormat = {
      size: formatSize(size),
      type: fileArr.pop() || videoStream.codec_name || this.placeHolder,
      fileName: fileArr.slice(0, fileArr.length).join(),
      videoStream
    };
    return formatData;
  }

  public getVideoInfo(url: string) {
    this.test();
    return new Promise((resolve: (value: FfprobeData) => void, reject) => {
      this.ffmpeg.ffprobe(url, (err, data: ffmpeg.FfprobeData) => {
        if (!err) {
          const formatData: InfoFormat = this.formatInfo(data);
          const ffprobeData = { ...data, formatData };
          resolve(ffprobeData);
        }
        reject(err);
      });
    });
  }

  public test () {}
}

export default Ffmpeg;
