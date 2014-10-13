var handlers = require("./handlers");

module.exports = function(installer, callback)
{
    handlers.uninstalls(installer);

    installer.execute(function(err, results) {
        callback(err, results);
    });
};
