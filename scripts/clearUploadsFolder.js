const fs = require("fs")
const path = require("path")

exports.clearUploadsFolder = () => {
  fs.readdir(path.join(__dirname, "..", "server", "photos/"), (err, files) => {
    if (err) throw err
    for (const file of files) {
      fs.unlink(path.join(__dirname,"..", "server", "photos", file), (err) => {
        if (err) throw err
      })
    }
  })
}
