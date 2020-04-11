import ffmpeg from 'fluent-ffmpeg';
import { exec, spawn, ChildProcessWithoutNullStreams } from 'child_process';
import path from 'path';
import { mpegStaticPath } from './usePath';
import { formatSize, generateName, GenerateName } from '../utils';
import { tempPaths } from '../remote';

// childProcess.exec(`${mpegStaticPath} -h`, () => {
//     childProcess.spawn(`${mpegStaticPath}`, ['-i', '/Users/zhangzhe/electron/ffmpegDemo/input.mp4', '-r' ,'24' ,`/Users/zhangzhe/electron/ffmpegDemo/output${Math.random()*100}.mp4`]);
// })
ffmpeg.setFfmpegPath(mpegStaticPath);
export interface InfoFormat {
  size: string;
  type: string;
  fileName: string;
  videoStream: ffmpeg.FfprobeStream;
}

export interface FfprobeData extends ffmpeg.FfprobeData {
  formatData: InfoFormat;
  screenshot?: GenerateName;
}

class FfmpegCore {
  private ffmpeg: typeof ffmpeg;

  private processFfmpeg: ChildProcessWithoutNullStreams | null;

  private placeHolder: string;

  private fluentFfmpeg: ffmpeg.FfmpegCommand | null;

  public mpegStaticPath: string;

  constructor() {
    // fluent-ffmpeg
    this.ffmpeg = ffmpeg;
    this.fluentFfmpeg = null;
    // 命令行
    this.processFfmpeg = null;
    this.mpegStaticPath = mpegStaticPath;
    this.placeHolder = 'N/A';
  }

  public spawnFfmpeg(commandLine: string[]): void {
    exec(`${this.mpegStaticPath} -h`, err => {
      if (!err) {
        this.processFfmpeg = spawn(`${this.mpegStaticPath}`, commandLine);
        // 捕获标准输出
        this.processFfmpeg.stderr.on('data', data => {});
        // 注册子进程关闭事件
        this.processFfmpeg.on('exit', (code, signal) => {});
        // 注册子进程错误事件
        this.processFfmpeg.on('error', error => console.log(error));
      }
    });
  }

  public stop(): void {
    this.processFfmpeg?.kill('SIGINT');
    this.fluentFfmpeg?.kill('SIGKILL');
  }

  public pause(): void {
    this.processFfmpeg?.kill('SIGSTOP');
    this.fluentFfmpeg?.kill('SIGSTOP');
  }

  public resume(): void {
    this.processFfmpeg?.kill('SIGCONT');
    this.fluentFfmpeg?.kill('SIGCONT');
  }

  /**
   * @description  生成FluentFfmpeg
   * @author zhangzhe
   * @date 2020-04-10
   * @param {string} url
   * @returns {ffmpeg.FfmpegCommand}
   * @memberof FfmpegCore
   */
  public setFluentFfmpeg(url: string): ffmpeg.FfmpegCommand {
    this.fluentFfmpeg = this.ffmpeg(url);
    return this.fluentFfmpeg;
  }

  private formatInfo(data: ffmpeg.FfprobeData): InfoFormat {
    const { format = {}, streams = [] } = data;
    const { size = 0, filename = '' } = format;

    const videoStream: ffmpeg.FfprobeStream =
      streams.filter(
        stream =>
          stream.codec_type === 'video' && stream.duration !== this.placeHolder
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
    return new Promise((resolve: (value: FfprobeData) => void, reject) => {
      this.ffmpeg.ffprobe(url, async (err, data: ffmpeg.FfprobeData) => {
        if (!err) {
          const formatData: InfoFormat = this.formatInfo(data);
          const ffprobeData = { ...data, formatData };
          /** 文件名 */
          const { fileName } = formatData;
          const screenshot = await this.getScreenShot(url, fileName);
          resolve({ ...ffprobeData, screenshot });
        }
        reject(err);
      });
    });
  }

  public getScreenShot(url: string, fileName: string): Promise<GenerateName> {
    return new Promise((resolve: (value: GenerateName) => void) => {
      const useFileName = `${fileName}.png`;
      const fileInfo = generateName(
        useFileName,
        path.resolve(tempPaths.thumbnails, `./${useFileName}`)
      );
      this.setFluentFfmpeg(url)
        .screenshot({
          timestamps: [0],
          folder: tempPaths.thumbnails,
          filename: fileInfo.name
        })
        .on('end', () => {
          resolve(fileInfo);
        })
        .on('error', () => {
          resolve({});
        });
    });
  }
  // public test(url: string) {
  //   this.fluentFfmpeg
  //     .input(url)
  //     .output(`/Users/zhangzhe/electron/ffmpegDemo/output.mp4`)
  //     .run();

  // this.spawnFfmpeg([
  //   '-i',
  //   url,
  //   '-r',
  //   '24',
  //   `/Users/zhangzhe/electron/ffmpegDemo/output${Math.random() * 100}.mp4`
  // ]);
  // }
}

export default FfmpegCore;
