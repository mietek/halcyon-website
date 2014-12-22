---
title: Deploy to DigitalOcean
page-data:
- key: max-section-link-level
  value: 2
page-footer: |
  <script>widgets.initDigitalOcean();</script>
---


Deploy to DigitalOcean
======================

This page can be used to deploy a Haskell application from a _git_ repository to a new DigitalOcean droplet.


### Source code

<div class="flex">
<input id="source-field" type="url" placeholder="https://github.com/mietek/hello-scotty" value="https://github.com/mietek/howistart">
</div>

<div class="pre-like">

[_**How I Start**_](http://howistart.org/)

_Collection of software development tutorials_

</div>


#### Environment variables

<div class="flex">
<input class="variable-name-input" type="text" placeholder="variable name" value="REQUIRED_VARIABLE" disabled>
<input class="variable-value-input" type="text" placeholder="required value">
<a class="variable-button disabled">Remove</a>
</div>
<div class="flex">
<input class="variable-name-input" type="text" placeholder="variable name" value="example">
<input class="variable-value-input" type="text" placeholder="optional value" value="example">
<a class="variable-button" href="">Remove</a>
</div>
<div class="flex">
<input class="variable-name-input" type="text" placeholder="variable name" value="">
<input class="variable-value-input" type="text" placeholder="optional value">
<a class="variable-button" href="">Remove</a>
</div>
<div class="flex justify-end">
<a id="add-variable-button" href="">Add</a>
</div>


### DigitalOcean account

<div id="account-widget"></div>


#### Hostname

<div class="flex">
<input id="hostname-field" type="text" placeholder="hello-scotty-1984">
</div>


#### Size

<div id="size-widget"></div>
<div id="size-legend"></div>


#### Image

<div id="image-widget"></div>


#### Region

<div id="region-widget"></div>


#### SSH keys

<div id="keys-widget"></div>


<div class="flex">
<a id="deploy-button" href="">Deploy to DigitalOcean</a>
</div>
