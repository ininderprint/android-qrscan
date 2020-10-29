import http from './http';

import { $storage } from './storage';
import { apiRoot, baseVersion } from '../config';
import { Platform } from 'react-native';

export const $service = function(name: string, func: string, ...args: any) {
  return new Promise<any>(async (resolve, reject) => {
    
  });
};
