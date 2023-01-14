var fs = require("fs")
const path = require("path")

exports.clearUploadsFolder = () => {
  console.log(__dirname)
  fs.readdir(path.join(__dirname, "..", "routes", "photos/"), (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(__dirname,"..", "routes", "photos", file), (err) => {
        if (err) throw err
      })
    }
  })
}
