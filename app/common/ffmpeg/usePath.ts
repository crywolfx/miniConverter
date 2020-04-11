import path from 'path';
import ffmpegStatic from 'ffmpeg-static';
import { chmod, mkdirs } from '../utils';
import { tempPaths, TempPaths } from '../remote';
// import ffprobeStatic from 'ffprobe-static';

export const productionPath = path.resolve(
  ffmpegStatic,
  '../common/ffmpeg/bin/ffmpeg'
);
export const developmentPath = path.resolve(
  __dirname,
  '../node_modules/ffmpeg-static/ffmpeg'
);

/**
 * ffmpeg static link
 */
export const mpegStaticPath =
  process.env.NODE_ENV === 'development' ? developmentPath : productionPath;

/**
 * @description 创建临时文件夹
 * @author zhangzhe
 * @date 2020-04-10
 * @param {{ [key: string]: string }} _tempPaths
 */
function createTempDir(_tempPaths: TempPaths): void {
  Object.keys(_tempPaths).forEach(key => {
    const tempPath = _tempPaths[key];
    mkdirs(tempPath, () => {
      // eslint-disable-next-line no-console
      console.log('临时文件夹创建成功');
    });
  });
}

/**
 * @description 处理ffmpeg静态文件权限
 * @author zhangzhe
 * @date 2020-04-10
 * @param {string} _productionPath
 */
function chmodFfmpeg(_productionPath: string): void {
  if (process.env.NODE_ENV === 'production') {
    chmod(_productionPath, '0777');
  }
}

(() => {
  chmodFfmpeg(productionPath);
  createTempDir(tempPaths);
})();
