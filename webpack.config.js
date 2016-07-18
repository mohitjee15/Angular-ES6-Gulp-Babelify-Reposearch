module.exports = {
    entry: './src/main.js',
    output: {
        path: 'dist',
        filename: 'bundle.js',
        devtool: 'source-map'
    },
    devServer: {
        inline: true,
        contentBase: './dist',
        port: 3000
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                presets: ['es2015']
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    }
};