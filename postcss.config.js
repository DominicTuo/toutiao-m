module.exports = {
    plugins: {
        // 作用：把px转换成rem
      'postcss-pxtorem': {
        //  使用函数配置rootvalue实现vant和设计稿的兼容
        rootValue({ file }){
            console.log('处理的文件',file);
            return file.indexOf('vant') !== -1 ? 37.5 : 75
        },
        // 配置要转换的css属性
        propList: ['*'],
      },
    },
  };