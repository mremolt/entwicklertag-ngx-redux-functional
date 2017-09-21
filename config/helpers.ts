import * as path from 'path';

const EVENT = process.env.npm_lifecycle_event || '';
const ROOT = path.resolve(__dirname, '..');

export function hasProcessFlag(flag: string): boolean {
  return process.argv.join('').indexOf(flag) > -1;
}

export function hasNpmFlag(flag: string): boolean {
  return EVENT.includes(flag);
}

export function isWebpackDevServer(): boolean {
  return !!process.argv[1] && !!/webpack-dev-server/.exec(process.argv[1]);
}

export function orderByList(list: string[]) {
  return function(chunk1: any, chunk2: any) {
    const index1 = list.indexOf(chunk1.names[0]);
    const index2 = list.indexOf(chunk2.names[0]);
    if (index2 === -1 || index1 < index2) {
      return -1;
    }
    if (index1 === -1 || index1 > index2) {
      return 1;
    }
    return 0;
  };
}

export const root = path.join.bind(path, ROOT);
