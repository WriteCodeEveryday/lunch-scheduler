import { storeEmployee } from '../utils/sql';

module.exports = (req, res) => {
    storeEmployee(req.body);
    res.send({
        status: 200,
        data: req.body
    })
}