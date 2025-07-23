module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/cicd-demo/'
    : '/',
  outputDir: 'dist'
}
