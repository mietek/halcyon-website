---
title: Deploy to DigitalOcean
page-data:
- key: max-section-link-level
  value: 2
page-footer: |
  <script>deploy.mountAtElementById('deploy');</script>
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

<div class="flex">
<span id="account-field">_none_</span>
<a id="account-button" href="">Link</a>
</div>


#### Hostname

<div class="flex">
<input id="hostname-field" type="text" placeholder="hello-scotty-1984">
</div>


#### Size

<div id="size-div" class="flex">
<a class="size-button selected">$5/month</a>
<a class="size-button">$10/month</a>
<a class="size-button">$20/month</a>
<a class="size-button">$40/month</a>
<a class="size-button">$80/month</a>
<a class="size-button">$160/month</a>
<a class="size-button">$320/month</a>
<a class="size-button">$480/month</a>
<a class="size-button">$640/month</a>
</div>

<div class="pre-like">

[_**$5/month**_](https://digitalocean.com/pricing/)

_512 MB RAM, 1 CPU, 20 GB SSD disk, 1 TB transfer_

</div>


#### Region

<div id="region-div" class="flex">
<a class="region-button disabled">New York 1</a>
<a class="region-button selected">New York 2</a>
<a class="region-button">New York 3</a>
<a class="region-button">Amsterdam 1</a>
<a class="region-button">Amsterdam 2</a>
<a class="region-button">Amsterdam 3</a>
<a class="region-button">San Francisco</a>
<a class="region-button">Singapore</a>
<a class="region-button">London</a>
</div>


#### Image

<div id="image-div" class="flex">
<a class="image-button disabled">CentOS 7</a>
<a class="image-button selected">Ubuntu 14.04</a>
</div>


#### SSH keys

<div id="key-div" class="flex">
<a class="key-button selected">Ori</a>
</div>


<div class="flex">
<a id="deploy-button" href="">Deploy to DigitalOcean</a>
</div>
