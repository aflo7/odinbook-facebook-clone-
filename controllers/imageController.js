const fs = require('fs');
const path = require('path');
const { clearUploadsFolder } = require('../scripts/clearUploadsFolder');
const { User } = require('../models/schema');

exports.update_profile_photo = (req, res, next) => {
  const img = {
    data: fs.readFileSync(
      path.join(__dirname, '..', 'server', 'photos', req.file.filename)
    ),
    contentType: 'image/png'
  };

  User.findById(req.user._id, (err, foundUser) => {
    if (err) return res.render('error');
    foundUser.nonFacebookUserImg = img;
    try {
      clearUploadsFolder();
    } catch (error) {
      return res.status(500).render('error');
    }
    foundUser.save(function (err, result) {
      if (err) return res.render('error');
      return res.redirect('/profile');
    });
  });
};
