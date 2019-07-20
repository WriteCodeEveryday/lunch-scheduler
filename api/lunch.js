import uuid from 'uuid';
import { retrieveEmployees } from '../utils/sql';
import { createGroups } from '../utils/groups';

module.exports = async (req, res) => {
    let id = uuid.v4();
    let data = await retrieveEmployees();
    res.send({
        id,
        groups: createGroups(data)
    });
}