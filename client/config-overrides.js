
const webpack=require('webpack');
module.exports=function override(config){
    const fallback=config.resolve.fallback || {};

    Object.assign(fallback,{
        path: require.resolve("path-browserify"),
        stream: require.resolve("stream-browserify"),
        querystring: require.resolve("querystring-es3"),
        zlib: require.resolve("browserify-zlib"),
        crypto: require.resolve("crypto-browserify"),
        fs:false,
        http: require.resolve("stream-http"),
        net:false,
        async_hooks:false,
        vm:false,
        assert:require.resolve("assert/"),
        process: require.resolve('process/browser'),
    });
    config.resolve.fallback=fallback;
    config.plugins=(config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process:"process/browser"

        }),
    ])

    config.module.rules.unshift({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false, // disable the behavior
        },
      });
    return config;

}