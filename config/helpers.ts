import * as path from 'path';

const EVENT = process.env.npm_lifecycle_event || '';
const ROOT = path.resolve(__dirname, '..');

export function hasProcessFlag(flag: string): boolean {
  return process.argv.join('').indexOf(flag) > -1;
}

export function hasNpmFlag(flag: string): boolean {
  console.log(EVENT, flag);
  return EVENT.includes(flag);
}

export function isWebpackDevServer(): boolean {
  return !!process.argv[1] && !!/webpack-dev-server/.exec(process.argv[1]);
}

export const root = path.join.bind(path, ROOT);
