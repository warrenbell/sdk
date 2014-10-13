var handlers = require("./handlers");

module.exports = function(installer, callback)
{
    handlers.uninstalls(installer);
    handlers.installs(installer);

    installer.execute(function(err, results) {
        callback(err, results);
    });
};
