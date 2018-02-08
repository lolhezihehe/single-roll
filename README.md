# single-roll
### 单行文本滚动

Include files:
```html
<link rel="stylesheet" href="./css/single-scroll.css">
<script src="./js/single-roll.js"></script>
```

Create HTML elements:

```html
<div id="single-roll">
    <li>single line text rolling</li>
    <li>
        <a href="https://www.baidu.com/">link to baidu</a>
    </li>
</div>
```

Basic:
```js
$('#single-roll').singleRoll();
```
or
```js
$('#single-roll').singleRoll({
    notice: true,
    ellipsis: true,
    close: true
});
```

### Options
-------
#### notice:
- Type: `Boolean`
- Default: `false`

#### ellipsis:
- Type: `Boolean`
- Default: `false`

#### close:
- Type: `Boolean`
- Default: `false`