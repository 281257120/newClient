const webpack = require('webpack')
module.exports = {


	configureWebpack:{
		externals: {
		    "BMap": "BMap"
		},
	  },
	//publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
	// baseUrl: process.env.NODE_ENV === 'production' ? '/static/dist/' : '/',   //从 Vue CLI 3.3 起已弃用，3.3以上请使用publicPath
	publicPath: process.env.NODE_ENV === 'production' ? 'https://16jbd.16souyun.com' : '/',

	filenameHashing: false,
	productionSourceMap: false,
	pages: {
		index: 'src/main.js',
		admin: 'src/admin/main.js'
	},
	devServer: {
		proxy: {
			'^/api': {
				target: 'https://16jbd.16souyun.com',
				ws: true,
				changeOrigin: true
			},
			'^/admin': {
				target: 'https://16jbd.16souyun.com',
				ws: true,
				changeOrigin: true
			},
			'^/storage': {
				target: 'https://16jbd.16souyun.com',
				ws: true,
				changeOrigin: true
			}
		},
		open: true,
		// host: '192.168.124.32',
		// host: ' 192.168.0.102',       //公司wifi
		// host:'192.168.0.102',        //公司本机
	},

}
