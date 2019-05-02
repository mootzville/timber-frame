// fetch url and return resolver <Promise>
async function grab (type, url) {
    "use strict";
    let request = await fetch(url);
    return request[type]();
}

// q&d script / style tags from strings
function tagify (type, text) {
    let tag = document.createElement(type);
    let txt = document.createTextNode(text);
    tag.appendChild(txt);
    return tag;
}

// Return a string of text wrapped in tags of type
function tagText (type, text) {
    return `<${type}>${text}</${type}>`;
}

// Empty the contents of a tag for rendering into
function flushChildren (parent) {
    let selector = document.querySelector(parent);
    selector.innerHTML = '';
    selector.textContent = ''; // check if this is redundant
}
// load a set of related css/html/js to a parent element
// CSS & JS are appended as elements (i.e. <style> & <script> tags)
// HTML is inserteed as text
function attach (unit, parent, flush = true) {
    let selector = document.querySelector(parent);
    if (flush) { flushChildren(parent); }
    if (unit.css)  { selector.appendChild(tagify('style', unit.css)); }
    if (unit.html) { selector.insertAdjacentHTML('beforeend', unit.html); }
    if (unit.js)   { selector.appendChild(tagify('script', unit.js)); }
}

// syntactic sugar function to fetch css/html/js, and load immediately in parent
function render (url, parent) {
    if (!parent) { parent = 'body' }
    grab('json', url).then((json)=>{ attach(json, parent) });
}


render('/index', 'body');