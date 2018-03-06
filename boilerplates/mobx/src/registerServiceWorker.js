/**
 * 判断是否是本地服务器
 */
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);


/**
 * 注册入口
 * @param {Funtion} updateCallBack 更新回调函数，第一次注册不会触发，后面更新会触发
 */
export default function register(updateCallBack) {
  // 生产环境，浏览器支持service worker
  if (__PROD__ && 'serviceWorker' in navigator) {
    const publicUrl = new URL('/', window.location.origin);
    // 不同源情况下service work不支持
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = '/service-worker.js';

      if (!isLocalhost) {
        // Is not local host. Just register service worker
        registerValidSW(swUrl, updateCallBack);
      } else {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, updateCallBack);
      }
    });
  }
}

/**
 * 注册service worker，校验是否为更新状态
 * @param {String} swUrl
 * @param {Funtion} updateCallBack
 */
function registerValidSW(swUrl, updateCallBack) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // 缓存已经更新，需刷新页面
              updateCallBack();
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, updateCallBack) {
  // 校验service worker是否被创建
  fetch(swUrl)
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // service worker发现，正常运行
        registerValidSW(swUrl, updateCallBack);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
