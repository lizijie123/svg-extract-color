# svg-extract-color

[![npm](https://img.shields.io/npm/v/@svg-extract-color/svg-extract-color-loader)](https://www.npmjs.com/package/@svg-extract-color/svg-extract-color-loader)

## 为什么需要 svg-extract-color

当我们使用了 SVG Sprite 时，我们希望能够通过use标签修改 SVG 的颜色。有些 SVG 可以通过为use标签传入color属性修改 SVG 颜色；有些 SVG 需要先将内部的所有fill与stroke属性删除，才能通过为use标签传入color属性修改 SVG 颜色；有些 SVG 即使将内部的所有fill与stroke属性删除，也无法通过为use标签传入color属性修改 SVG 颜色；

[上述情况示例](./examples/svg-sprite/index.html)

## 他是如何工作的

本loader需要与svg-sprite-loader搭配使用

编译阶段会将 SVG 中的所有颜色属性值会由原颜色替换为 CSS 变量调用形式 var(--color, 原颜色属性值) 。在运行时，我们在需要修改颜色的use标签中传入 CSS 变量即可修改颜色。

```html
<!-- 单独使用 svg-sprite-loader -->
<svg>
  <use xlink:href="#icon-plus" style="color: red" />
</svg>
<!-- 使用 svg-sprite-loader & svg-extract-color-loader -->
<svg>
  <use xlink:href="#icon-plus" style="--color: red" />
</svg>
```

## 安装

```shell
npm install @svg-extract-color/svg-extract-color-loader -D
# or
yarn add @svg-extract-color/svg-extract-color-loader -D
# or
pnpm install @svg-extract-color/svg-extract-color-loader -D
```

## 如何使用

本loader需要与[svg-sprite-loader](https://github.com/JetBrains/svg-sprite-loader)搭配使用

且目前只支持修改单色 SVG

```js
{
  test: /\.svg$/,
  use: [
    'svg-sprite-loader',
    '@svg-extract-color/svg-extract-color-loader',
  ],
}
```

### cssVariableName

cssVariableName 用于设置 SVG 中使用的 CSS 变量名，这会影响use标签中传入的 CSS 变量名，默认值为: `--color`

```js
options: {
  cssVariableName: '--svg-color'
}
```

```html
<svg>
  <use xlink:href="#icon-complex" style="--svg-color: red">
</svg>
```

## 示例

请参阅[svg-extract-color-loader示例](./examples/svg-extract-color-loader/README.md)文件夹
