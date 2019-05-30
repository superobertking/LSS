# LSS
Lesson Selecting Script

Select the courses automatically, use a timer of 1500ms to reduce post rates.

## EAMS @ ShanghaiTech University

`shanghaitech_eams.js`

A simple javascript program running in the web browser.

### Usage

1. Login to the EAMS (currently only tested for ShanghaiTech).

2. Open your browser console. (shortcut e.g. ctrl+shift+i or command+option+i)

3. Copy the (minified) script from [here](https://raw.githubusercontent.com/superobertking/LSS/master/shanghaitech_eams.min.js) to your browser console.

4. Fill the `selectNos` array with the course numbers you want to select.

   ```javascript
   var selectNos = ['EE111.04', 'CSKI1002.01', 'CS140.01'];
   ```

5. Press `Enter`(`return`) key, and boom, keep calm and wait.

6. To stop the loop, type `stopLSS()` in the browser console and press `Enter`(`return`).

### Screenshots

<img width="578" alt="shanghaitech_eams" src="https://user-images.githubusercontent.com/8351396/28070339-19a78eaa-667f-11e7-8e13-64989bff69a4.png">

### TODO

- Swap course feature
- Drop course feature

### Update

- 2019-05-30: Add support for English EAMS; add `stopLSS` functionality; add lesson not found warning.
- 2018-06-25: Use es2015 to support old browsers.
