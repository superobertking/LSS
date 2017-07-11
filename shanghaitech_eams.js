/*
 * @Author: robertking
 * @Date:   2017-07-11 20:02:43
 * @Last Modified by:   robertking
 * @Last Modified time: 2017-07-11 20:51:12
 */

/* === Usage ===
    1. Login to the EAMS (currently only tested for ShanghaiTech).
    2. Fill the `selectNos` array with the course numbers you want to select.
    3. Copy the following script to the browser console.
    4. Press `Enter`(return) key, and boom, keep calm and wait.
*/

// [FILL ME]
var selectNos = ['EE111.04', 'CSKI1002.01', 'CS140.01'];
// Fill the array with the course numbers you want to select

// Get `course.id` for the `course.no`
var selectIds = [];
lessonJSONs.forEach(lesson => {
    for (idx in selectNos) {
        if (lesson.no == selectNos[idx]) {
            selectIds.push(lesson.id);
            break;
        }
    }
});

// var selected = Array(selectIds.length).fill(false);
var retires = 0;
var pos = 0;

// Loop with a timer (default 2000ms)
function loop() {
    setTimeout(function() {
        $.ajax({
            type: 'POST',
            url: 'http://eams.shanghaitech.edu.cn/eams/stdElectCourse!batchOperator.action?profileId=387',
            data: { 'optype': true, 'operator0': selectIds[pos] + ':true:0' },
            success: function(data) {
                let res = data.match(/.*<\/br>|请不要过快点击/g).map((l) => l.replace(/<.*?>/g, '').trim());
                retires++;
                if (data.indexOf('失败') > 0 || data.indexOf('请不要过快点击') > 0) {
                    console.log('[x] Failed', retires, res);
                    pos = (pos + 1) % selectIds.length;
                    loop();
                } else {
                    console.log('[√] Succeed', retires, res);
                    selectIds.splice(pos, 1);
                    if (selectIds.length > 0) {
                        pos %= selectIds.length;
                        loop();
                    }
                }
            },
            error: function(xhr, textStatus, error) {
                retires++;
                pos = (pos + 1) % selectIds.length;
                console.log('[x] Error', retires, xhr.statusText, textStatus, error);
                loop();
            }
        });
    }, 2000);
}

loop()
