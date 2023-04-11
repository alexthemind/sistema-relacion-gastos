const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = (env,arg) => {

    const mode = arg.mode;
    const isProduction = mode === 'production' ? true : false;

    const rulesForJavascript = {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-react',
                        {
                            runtime: 'automatic'
                        }
                    ]
                ]
            }
        }
    }
    const rulesForStyles = {
        test: /\.css$/,
        use: ['style-loader','css-loader']
    }
    const rulesForImages = {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const rules = [
        rulesForJavascript,
        rulesForStyles,
        rulesForImages
    ];

    return {
        entry: path.join(__dirname,'src','public','index.js'),
        output: {
            filename: isProduction != false ? '[name].[contenthash].js' : '[name].js',
            path: path.resolve(__dirname,'build'),
            publicPath: '/'
        },
        devServer: {
            open: false,
            port: 8080,
            compress: true,
            historyApiFallback: true,
        },
        module: {
            rules: rules
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.join(__dirname,'src','public','index.html') })
        ]
    }

}