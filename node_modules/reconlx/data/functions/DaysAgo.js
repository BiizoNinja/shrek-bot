function DaysAgo(date) {
    if(!date) throw new ReferenceError('reconlx => "date" is not defined')
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

module.exports = DaysAgo;