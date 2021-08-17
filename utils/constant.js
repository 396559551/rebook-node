const UPLOAD_PATH = 'E:\\nginx-1.21.0\\myrebook\\upload\\upload-book'
const UPLOAD_URL = 'E:\\nginx-1.21.0\\myrebook\\upload\\upload-book'
const OLD_UPLOAD_URL = 'E:\\nginx-1.21.0\\myrebook\\upload\\epub'
module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  CODE_TOKEN_EXPIRED:-2,
  debug: true,
  PWD_SALT: 'admin_imooc_node',
  PRIVATE_KEY:'admin_imooc_miyao',
  JWT_EXPIRED: '1h',
  UPLOAD_PATH,
  UPLOAD_URL,
  OLD_UPLOAD_URL,
  MIME_TYPE_EPUB: 'application/epub+zip'
}
