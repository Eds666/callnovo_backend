export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  //   console.log({ file });

  if (!file) return callback(new Error('Archivo vacio!!!'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtennsions = ['jpg', 'jpeg', 'png', 'gif'];

  if (validExtennsions.includes(fileExtension)) {
    return callback(null, true);
  }
  callback(null, false);
};
