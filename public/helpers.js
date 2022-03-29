const getCurrentDate = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const hour = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();

    const validate = (num) => (num > 9 ? num : `0${num}`);

    return `${validate(day)}/${validate(month)} ${validate(hour)}:${validate(
        min
    )}:${validate(sec)}`;
};

export const createMessage = (username, event, body) => {
    const msg = JSON.stringify({
        event,
        username,
        body,
        date: getCurrentDate(),
    });
    return msg;
};
