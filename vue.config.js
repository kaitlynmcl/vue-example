module.exports = {
    publicPath: '/vue-example/',
    configureWebpack: {
        devServer: {
          headers: { "Access-Control-Allow-Origin": "*" }
        },
    }    
}