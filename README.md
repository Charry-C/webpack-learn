### webpack学习笔记
通过本项目，熟悉了webpack的基础配置，了解到了vue-cli内置的webpack是如何运作打包的
### 关键概念
1. 入口entry
是一个构建项目模块依赖图的一个入口，webpack就是通过这个如果，寻找到的所有依赖模块并进行的打包
2. 出口output
这是webpack打包结果的需要输出文件的配置对象
在这里你可以配置：
  - path: 输出文件的路径
  - filename: 输出文件的名称
3. module
这个配置主要是用于配置loader的，由于webpack只能识别JavaScript和JSON文件，当我们在模块中引入了像css,scss这样的文件时，就需要loader来帮webpack加载这些webpack无法打包的东西，并将其编译成webpack可以读懂的东西，常见的loader如下：
  - style-loader：将 CSS 代码注入到 DOM 中
  - css-loader：解析 CSS 文件中的 @import 和 url() 语句
  - sass-loader：将 SCSS 或 Sass 文件编译为 CSS
  - babel-loader：将现代 JavaScript 代码（ES6+）转译为兼容旧浏览器的 JavaScript 代码
4. plugins
这是一个比loader更强大的配置，在这个配置中可以对资源进行管理，例如像Vue这样的单页面的项目是如何将那么多组件塞到一个页面的呢？原因就在于Vue中有一个`public/index.html`作为打包输出的html文件的模板，我们所有Vue写的东西实际上都会最终通过虚拟DOM转为真实DOM并加入到这个`public/index.html`模板中，然后打包的`bundle.js`也会注入到这个index.html中。要如何实现上面描述的功能，就需要用到一个插件：`HtmlWebpackPlugin`这个插件就可以实现每次打包都把`bundle.js`注入到这个`public/index.html`模板中，那么我们每次打包后的结果页面就是我们想要的页面了。