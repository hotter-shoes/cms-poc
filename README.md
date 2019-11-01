# Amplience - React Proof of Concept

Hotter's homepage recreated using Amplience CMS.

Content recreated
* Banner
* Hotspot
* USP
* Mega Menu
* Article Page

https://wiki.salmon.com/display/HOTT/Amplience+Proof+of+Concept

## Install

`npm install`

## Start

`npm start`

## Highlighted Features
Integrates with Amplience APIs using helper functions 
[/src/lib/amplience.helper.js](./src/lib/amplience.helper.js)

AmplienceSlot functional component takes renderable component and amplience slot id and returns renderable component with amplience api data as props [/src/components/amplienceSlot.js](./src/components/amplienceSlot.js)

Whilst AmplienceSlot is executing the `fetch` for data, an optional loading inidicator is used [/src/components/loadingIndicator.js](./src/components/loadingIndicator.js)

Article pages take markdown content from Amplience, convert it to html and inject it into the DOM _dangerously_. Internal link clicks are captured and handled in a way which prevents the app from doing a full refresh. External links open a new window. [/src/components/article/article.js](/src/components/article/article.js)

Markdown uses github's CSS (this will need to be adapted for V9) [/src/css/github-markdown.css](./src/css/github-markdown.css)

PropTypes are inconsistently used, USP component is most complete.