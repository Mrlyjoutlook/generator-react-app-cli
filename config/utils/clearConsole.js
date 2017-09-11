/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * 使用的create-react-app utils clearConsole.js
 * https://github.com/facebookincubator/create-react-app/blob/master/packages/react-dev-utils/clearConsole.js
 */

'use strict';

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
  );
}

module.exports = clearConsole;
