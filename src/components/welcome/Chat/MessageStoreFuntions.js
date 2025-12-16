export function saveMsgTimeToStore(msg) {
    if (!msg) return;
    if (!msg.send_time || !msg.group_id) return;
    let storeName = 'masg_time_' + msg.group_id;
    try {
        localStorage.setItem(storeName, msg.send_time);
    } catch (error) {
        console.log('Unable to set message time');
        console.log(error);
    }
};

export function checkMsgTime(msg) {
    if (!msg) return false;
    if (!msg.send_time || !msg.group_id) return false;
    let storeName = 'masg_time_' + msg.group_id;
    let existingData = localStorage.getItem(storeName);
    if (existingData) {
        try {
            let savedDate = new Date(existingData).getTime();
            let newDate = new Date(msg.send_time).getTime();
            return savedDate < newDate;
        } catch (error) {
            console.log(error);
            return true;
        }
    } else {
        return true;
    }
}