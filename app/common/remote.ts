import { remote } from 'electron';
import path from 'path';

export interface TempPaths {
  readonly [key: string]: string;
  base: string;
  thumbnails: string;
  video: string;
}

export const { dialog } = remote;

export const { app } = remote;

export const tempPaths: TempPaths = {
  base: path.resolve(app.getPath('temp'), './m-converter/.temp/'),
  thumbnails: path.resolve(
    app.getPath('temp'),
    './m-converter/.temp/.thumbnails/'
  ),
  video: path.resolve(app.getPath('temp'), './m-converter/.temp/.video/')
};
