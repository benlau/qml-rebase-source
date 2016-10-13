var fs = require('fs');

if (process.argv.length <= 2) {
    console.log("node qml-rebase-source.js file.ui.qml");
    return;
}

var file = process.argv[2];

var contents = fs.readFileSync(file, 'utf8').toString();
var lines = contents.split("\n");

var properties = {}

lines.forEach(function(line) {
    var rx = /^ *property +string ([a-zA-Z0-9]+) *: *\"([a-zA-Z0-9\\/_.]+)\"/;

    var match = rx.exec(line);
    if (match != null) {
        properties[match[1]] = match[2];
    }
});

var changed = false;

lines = lines.map(function(line) {
    var rx = /^ *source *: *\"([a-zA-Z0-9\\/_.]+)\"/;

    var match = rx.exec(line);

    if (match == null) {
        return line;
    }

    var value = match[1];
    for (var key in properties) {
        var path = properties[key];
        if (value.indexOf(path) == 0) {
            line = line.replace("\"" + path, key + " + \"");
            changed = true;
            break;
        }
    }
    return line;
});;

if (changed) {
    fs.writeFileSync(file, lines.join("\n"));
    console.log("Done");
} else {
    console.log("Nothing changed");
}
