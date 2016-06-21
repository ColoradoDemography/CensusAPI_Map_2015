var path = require('path');
var webpack = require('webpack');

webpack.optimize.UglifyJsPlugin({ output: {comments: false} });
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
    entry:  {
      app: './src/common/js/app.js',
      vendor: ['./src/lib/js/easy-button.js','./src/lib/js/la.test.js','./src/lib/js/bootstrap-slider.js','./src/lib/js/leaflet-search.js','./src/lib/js/leaflet-spin.js','./src/lib/js/stupidtable.js','./src/lib/js/table2CSV.js','./src/lib/js/bootstrap-switch.js','./src/lib/js/jquery.history.js']
    },
    output: {
        path:     'dest',
      publicPath: 'dest',
        filename: 'app.min.js',
    },
    externals: {
        "leaflet": "L",
        "google": "google",
        "jquery": "jQuery",
        "d3": "d3",
        "ss": "ss"
    },
    module: {
    preLoaders: [
       {
         test: /\.js$/, 
         include: path.join(__dirname, './src/common/js'),
         loader: 'eslint', 
         exclude: /node_modules/ 
       }
      
        ],
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, './src/common/js'),
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ["es2015"],  
        }
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
    ]
  },
  plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new FlowStatusWebpackPlugin()
    ],
eslint: {  
    configFile: '.eslintrc'
},
  worker: {
		output: {
			filename: "/hash.worker.js"
		}
	}

};


// webpack-dev-server --host 0.0.0.0 --port 8080 --watch --inline --content-base /home/nitrous/public_html/CO_Grants/
// http://red-meteor-147235.nitrousapp.com:8080/webpack-dev-server/

