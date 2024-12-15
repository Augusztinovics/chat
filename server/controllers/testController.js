
function testController(req, res) {
    console.log(req);
    res.json({message:'test done'});
}

module.exports = testController;