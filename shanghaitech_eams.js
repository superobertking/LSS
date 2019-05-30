/*
 * @Author: robertking
 * @Date:   2017-07-11 20:02:43
 * @Last Modified by:   robertking
 * @Last Modified time: 2019-05-30 14:14:57
 */

/* === Usage ===
  1. Login to the EAMS (currently only tested for ShanghaiTech).
  2. Fill the `selectNos` array with the course numbers you want to select.
  3. Copy the following script to the browser console.
  4. Press `Enter`(return) key, and boom, keep calm and wait.
*/

// [FILL ME]
var selectNos = ['EE111.04', 'CSKI1002.01', 'CS140.01'];
// Fill the array with the exact course numbers you want to select

// Get `course.id` for the `course.no`
var selectIds = [];
lessonJSONs.forEach(lesson => {
  for (idx in selectNos) {
    if (lesson.no === selectNos[idx]) {
      selectIds.push(lesson.id);
      selectNos.splice(idx, 1);
      break;
    }
  }
});
if (selectNos.length !== 0) {
  console.log("LSS Warning: lessons %s %s", JSON.stringify(selectNos), "not found");
}

// var selected = Array(selectIds.length).fill(false);
var retires = 0;
var pos = 0;

// Loop with a timer (default 2000ms)
var LSSHandle = setInterval(() => {
  if (selectIds.length === 0) {
    clearInterval(LSSHandle);
    console.log("LSS stoped successfully.");
    return;
  }
  $.ajax({
    type: 'POST',
    url: `http://eams.shanghaitech.edu.cn/eams/stdElectCourse!batchOperator.action?profileId=${electCourseTable.config.profileId}`,
    data: { optype: true, operator0: `${selectIds[pos]}:true:0` },
    async: false,
    success: (data) => {
      let result_reg = /.*<\/br>/g;
      let toofast_reg = /请不要过快点击|Please DO NOT click too quickly/g;
      let failed_reg = /失败|Failure/g;
      let res = (data.match(result_reg) || data.match(toofast_reg) || []).map((l) => l.replace(/<.*?>/g, '').trim());
      retires++;
      if ((data.match(failed_reg) || data.match(toofast_reg)) !== null) {
        console.log('[x] Failed', retires, res);
        pos = (pos + 1) % selectIds.length;
      } else {
        console.log('[√] Succeed', retires, res);
        selectIds.splice(pos, 1);
        if (selectIds.length > 0) {
          pos %= selectIds.length;
        }
      }
    },
    error: (xhr, textStatus, error) => {
      retires++;
      pos = (pos + 1) % selectIds.length;
      console.log('[x] Error', retires, xhr.statusText, textStatus, error);
    }
  });
}, 1500);

function stopLSS() {
  clearInterval(LSSHandle);
}
