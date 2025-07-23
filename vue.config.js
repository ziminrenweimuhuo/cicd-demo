module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/cicd-demo/prod/'
    : process.env.NODE_ENV === 'staging'
      ? '/cicd-demo/staging/'
      : process.env.NODE_ENV === 'test'
        ? '/cicd-demo/test/'
        : '/cicd-demo/dev/',
  outputDir: 'dist'
}
