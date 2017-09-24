/**
|--------------------------------------------------
| 内置对象扩展
|--------------------------------------------------
*/

interface Window {
  Perf: any;
  INITIAL_STATE: object;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; // redux tools
}

/**
|--------------------------------------------------
| 模块，空间扩展
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| 全局扩展
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| 全局类型声明
|--------------------------------------------------
*/

declare const __DEV__: string;
declare const __PROD__: string;

/**
|--------------------------------------------------
| 全局模块声明
|--------------------------------------------------
*/
// declare namespace store {
//   export interface createStoreObject {
//     store: object;
//     runSaga(): void;
//   }
// }
