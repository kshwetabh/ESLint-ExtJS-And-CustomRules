var fs = require("fs");

// const standAloneXMLFilePath = "standalone.xml";
// const webXMLVMSrcFilePath = "./src/main/webapp/WEB-INF/web.xml.vm";
// const webXMLVMDestFilePath = "/WEB-INF/web.xml";

var args = process.argv.slice(2);
const standAloneXMLFilePath = args[0];
const webXMLVMSrcFilePath = args[1];
const webXMLVMDestFilePath = args[2];

// destination.txt will be created or overwritten by default.
 fs.copyFile(webXMLVMSrcFilePath, webXMLVMDestFilePath, err => {
   if (err) throw err;
   console.log("web.xml.vm was copied to web.xml");
 });

fs.readFile(standAloneXMLFilePath, "utf8", function(err, data) {
  var updated = false;
  if (err) console.log(err);

  // Avoid caching JSPs. Changes all occurences of <jsp-config to <jsp-config development="true"
  if (data.indexOf('<jsp-config development="true"') < 0) {
    data = data.replace(/<jsp-config/g, function() {
      return '<jsp-config development="true"';
    });
    updated = true;
  }

  // Enable console log. Changes the first occurrence of <level name="OFF"/> to <level name="DEBUG"/>
  if (data.indexOf('<level name="OFF"') >= 0) {
    data = data.replace(/<level name="OFF"/g, function() {
      return '<level name="DEBUG"';
    });
    updated = true;
  }

  // Write back to standalone.xml file
  if (data) {
    fs.writeFile(standAloneXMLFilePath, data, "utf8", function(err) {
      if (err) return console.log(err);
    });
  }

  if (!updated) {
    console.log("Configuration is already in Dev mode");
  }
});
