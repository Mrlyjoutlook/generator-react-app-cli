/// <reference path="./utils/index.d.ts" />

/**
|--------------------------------------------------
| 全局声明
|--------------------------------------------------
*/
declare const __DEV__: string;
declare const __PROD__: string;

/**
|--------------------------------------------------
| 全局扩展
|--------------------------------------------------
*/
interface Window {
  Perf: any;
  INITIAL_STATE: object;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; // redux tools
}

