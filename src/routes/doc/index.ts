const user = require('./definitionsData/user.json');
const task = require('./definitionsData/task.json');

export default {
    ...user,
    ...task,
};
