var express = require('express');
var upload = require('express-fileupload');
var cxValidator = require('cx-typescript');

var app = express();
app.use(upload());

app.post('/validate', (req, res) => {
  if (req.files) {
    var file = req.files.cxfile;
    if (file) {
      const pointSplit = file.name.split('.');
      const fileExtension = pointSplit[pointSplit.length - 1];
      if (fileExtension !== 'cx') {
        return res.status(400).send({
          error: 'wrong file format',
          description: `The loaded file needs to have the .cx file extension. Your file currently has the extension: ${fileExtension}`,
        });
      } else {
        const megaFactor = 1000 * 1000; // MB
        const sizeLimit = 10; // MB
        currentFileSize = Number((file.size / megaFactor).toFixed(2));

        if (currentFileSize.size > sizeLimit * megaFactor) {
          return res.status(400).send({
            error: 'file too large',
            description: `Maximum allowed file size ${sizeLimit} MB`,
          });
        } else {
          const fileTxt = file.data.toString();
          const fileErrors = cxValidator.Validator.validateCxData(fileTxt);
          return res.status(200).send(fileErrors);
        }
      }
    }
  } else {
    return res.status(400).send('invalid request file name,request file name should be "cxfile" ');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
