import fs from 'fs';
import path from 'path';

export interface GenerateName {
  name?: string;
  fullPath?: string;
}

/**
 * @description 格式化文件大小
 * @author zhangzhe
 * @date 2020-04-08
 * @export
 * @param {number} limit
 * @returns {string}
 */
export function formatSize(limit: number): string {
  let size = '';
  if (limit < 1024) {
    // 如果小于1KB转化成B
    size = `${limit.toFixed(2)}B`;
  } else if (limit < 1024 * 1024) {
    // 如果小于1MB转化成KB
    size = `${(limit / 1024).toFixed(2)}KB`;
  } else if (limit < 1024 * 1024 * 1024) {
    // 如果小于1GB转化成MB
    size = `${(limit / (1024 * 1024)).toFixed(2)}MB`;
  } else {
    // 其他转化成GB
    size = `${(limit / (1024 * 1024 * 1024)).toFixed(2)}GB`;
  }
  const sizeStr = `${size}`;
  const len = sizeStr.indexOf('.');
  const dec = sizeStr.substr(len + 1, 2);
  if (dec === '00') {
    // 当小数点后为00时 去掉小数部分
    return sizeStr.substring(0, len) + sizeStr.substr(len + 3, 2);
  }
  return sizeStr;
}

/**
 * @description 设置文件权限
 * @author zhangzhe
 * @date 2020-04-10
 * @export
 * @param {string} realPath 绝对地址
 * @param {string} mod 权限
 * @returns {Promise<string>}
 */
export function chmod(realPath: string, mod: string): Promise<string> {
  return new Promise(
    (
      resolve: (value: string) => void,
      reject: (value: NodeJS.ErrnoException) => void
    ) => {
      fs.stat(realPath, (err, stats) => {
        if (!err) {
          if (stats.mode !== 33279) {
            fs.chmod(realPath, mod, chmodError => {
              if (!chmodError) {
                resolve('success');
              } else {
                reject(chmodError);
              }
            });
          }
        } else {
          reject(err);
        }
      });
    }
  );
}

/**
 * @description 递归异步创建文件夹
 * @author zhangzhe
 * @date 2020-04-10
 * @export
 * @param {string} dirname
 * @param {{ (): void }} callback
 */
export function mkdirs(dirname: string, callback: { (): void }) {
  fs.exists(dirname, exists => {
    if (exists) {
      callback();
    } else {
      mkdirs(path.dirname(dirname), () => {
        fs.mkdir(dirname, callback);
      });
    }
  });
}

/**
 * @description 递归同步创建文件夹
 * @author zhangzhe
 * @date 2020-04-10
 * @export
 * @param {string} dirname
 * @returns {boolean}
 */
export function mkdirsSync(dirname: string): boolean {
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
  return false;
}

/**
 * @description 检查文件是否存在
 * @author zhangzhe
 * @date 2020-04-10
 * @export
 * @param {string} filePath 文件路径 eg: a/b/c/d.txt
 * @returns {Promise<boolean>}
 */
export function isFileExisted(filePath: string): Promise<boolean> {
  return new Promise((resolve: (value: boolean) => void, reject) => {
    fs.access(filePath, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * @description 检查文件是否存在 同步
 * @author zhangzhe
 * @date 2020-04-10
 * @export
 * @param {string} _path
 * @returns {boolean}
 */
export function isFileExistedSync(_path: string): boolean {
  try {
    fs.accessSync(_path);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * @description 生成文件名
 * @author zhangzhe
 * @date 2020-04-10
 * @export
 * @param {string} [originName=''] 原文件名 eg: 1.text
 * @param {string} filePath 完整文件路径 eg: /a/b/v/1.txt
 * @returns
 */
export function generateName(originName = '', filePath = ''): GenerateName {
  let name = originName;
  let fullPath = filePath;
  if (isFileExistedSync(filePath)) {
    const nameArr: string[] = originName.split('.');
    const type = nameArr.pop();
    name = `${nameArr.join('.')}_convert.${type}`;
    fullPath = path.resolve(filePath, `./${name}`);
  }
  return { name, fullPath };
}
