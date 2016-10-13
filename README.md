It is a tiny script to update the source attributes within a QML file to be based on another property. It keep the source clean and easy for update.

Example:

If you update a QML file via Qt Quick Designer, it will use relative path by default.
The file may look like this:

```
Item {
  Image {
    source: "../../arts/img1.png"
  }

  Image {
    source: "../../arts/img2.png"
  }
}

```

For some reason, you may not like to manage a lot of relative path within a QML file.
To make it clean, you may add a "folder" attribute to this path:

Remarks: You may use any variable name other than "folder". But the attribute type must be string.

```
Item {

  property string folder: "../../";

  Image {
    source: "../../arts/img1.png"
  }

  Image {
    source: "../../arts/img2.png"
  }
}

```

Then run `node qml-rebase-source your.qml`.
It will become:

```

Item {

  property string folder: "../../arts/";

  Image {
    source: folder + "img1.png"
  }

  Image {
    source: folder + "img2.png"
  }
}
```

**Remarks: This script do not understand QML syntax. It use RegExp to parse and update. It is recommended to commit your source code before using this script. **