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
