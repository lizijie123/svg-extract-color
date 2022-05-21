# svg-sprite

## 前置知识

### 嵌入 SVG 到 HTML 文档中有哪些方式

* svg
* use(The use element takes nodes from within the SVG document, and duplicates them somewhere else.)

### 如何使用 use 标签

```html
<svg style="display: none;">
  <symbol id="ic">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.58521 3.45646L2.24812 2.79355L5.66666 6.21209L9.08521 2.79355L9.74812 3.45646L5.66666 7.53792L1.58521 3.45646Z" fill="#CCCCCC"/>
  </symbol>
  <symbol id="id">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.58521 3.45646L2.24812 2.79355L5.66666 6.21209L9.08521 2.79355L9.74812 3.45646L5.66666 7.53792L1.58521 3.45646Z" fill="#CCCCCC"/>
  </symbol>
</svg>

<svg>
  <use xlink:href="#ic" color="green" />
</svg>
<svg>
  <use xlink:href="#ic" color="blue" />
</svg>
<svg>
  <use xlink:href="#ic" color="red" />
</svg>
```

## [通过use标签的color属性修改SVG图标颜色示例](./index.html)
