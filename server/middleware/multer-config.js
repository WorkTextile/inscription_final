const multer = require('multer');

//résolution de l'extension de fichier
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif'
};

const storage = multer.diskStorage({
    // indique où enregistrer les fichier
    destination: (req, file, callback) => {
        callback(null, '../frontend/public/images');
    },
    // indique qu'il faut utiliser le nom d'origine du fichier, de remplacer les espaces par des _ 
    //et d'ajouter un timestamp comme nom de fichier pour le rendre le plus unique possible
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
        console.log(file)
    }
});

module.exports = multer({storage: storage}).single('file');