export default {
  install(app, options) {
    app.config.globalProperties.$isEmpty = (val) => {
      return !(
        val ||
        val === null ||
        val === undefined ||
        val === '' ||
        val === false ||
        val === 0 ||
        val === '0' ||
        String(val).toLowerCase() === 'false'
      )
    }

    app.config.globalProperties.$isSet = (val) => {
      return val && val !== ''
    }
  },
}
