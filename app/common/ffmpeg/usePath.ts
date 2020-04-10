import path from 'path';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';

export const mpegStaticPath =
  process.env.NODE_ENV === 'development'
    ? path.resolve(__dirname, '../node_modules/ffmpeg-static/ffmpeg')
    : path.resolve(ffmpegStatic, '../common/ffmpeg/bin/ffmpeg');
