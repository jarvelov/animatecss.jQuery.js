# animatecss.jquery.js

A jQuery plugin to animate any element using [animate.css (by daneden)](https://daneden.github.io/animate.css/) classes. Chain multiple animations and add extra css properties for the duration of the animations.

[Github](https://github.com/jarvelov/animatecss.jquery.js)

[Project url](https://tobias.jarvelov.se/portfolio/animatecss.jquery.js/)

## Example

[jsfiddle](https://jsfiddle.net/jarvelov/sef7rdcg/)

## Dependencies

 * jQuery (> 1.8)
 * [animate.css](https://daneden.github.io/animate.css/)

## Installation

`bower install animatecss.jquery.js`

## Usage

Full example in `example.html`

```html

<link rel="stylesheet" href="animate.css">

<script src="jquery.js"></script>
<script src="animatecss.jquery.js"></script>

<script>
  $('input.animate-me').animateCss({
    animations: ['fadeOut', 'fadeIn'],
    css: {
      backgroundColor: '#ffffff',
      borderColor: '#66afe9',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(102,175,233, 0.6)'
    },
    cssDelay: 300
  })
</script>
```

## Changelog
```
  v1.01 (2016-05-05): Convert to bower package
  v1.0 (2016-05-05): Initial release
```