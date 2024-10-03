function getTimeStr(time){
    const hour = parseInt(time /3600);
    let remainingSecond = parseInt(time % 3600);
    let remainingMinute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;

    return `${hour} hour ${remainingMinute} minute ${remainingSecond} second ago`;
}

console.log(getTimeStr(450));