---
title: Deploy application
page-data:
- key: max-section-link-level
  value: 2
---


Deploy application
==================

#### DigitalOcean account

<div class="flex">
<span id="account-field">_none_</span>
<a id="account-button" href="">Link</a>
</div>


---

#### _git_ URL

<div class="flex">
<input id="source-field" type="url" placeholder="https://github.com/mietek/hello-scotty" value="https://github.com/mietek/howistart">
</div>


### How I Start

Collection of software development tutorials


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


#### Hostname

<div class="flex">
<input id="hostname-field" type="text" placeholder="hello-scotty-1984">
</div>


#### Size

<div id="size-div" class="flex">
<a class="size-button disabled">512 MB</a>
<a class="size-button disabled">1 GB</a>
<a class="size-button disabled">2 GB</a>
<a class="size-button disabled">4 GB</a>
<a class="size-button disabled">8 GB</a>
<a class="size-button disabled">16 GB</a>
<a class="size-button disabled">32 GB</a>
<a class="size-button disabled">48 GB</a>
<a class="size-button disabled">64 GB</a>
</div>


#### Region

<div id="region-div" class="flex">
<a class="region-button">New York 1</a>
<a class="region-button">New York 2</a>
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
<a class="image-field disabled">CentOS 7</a>
<a class="image-field disabled">Ubuntu 14.04</a>
</div>


#### SSH keys

<div id="key-div" class="flex">
<a class="key-button disabled">_none_</a>
</div>


<div class="flex">
<a id="deploy-button" href="">Deploy **How I Start** to DigitalOcean</a>
</div>


<script>
function nay(error) {
  console.log('   *** ERROR:', error);
};

addEventListener('load', function () {
  deploy.resetInterface();
  document.getElementById('hostname-field').value = deploy.getRandomHostname();
  var accessToken = deploy.getAccessToken();
  if (accessToken === undefined) {
    return;
  }
  var accountButton = document.getElementById('account-button');
  accountButton.classList.add('disabled');
  accountButton.removeAttribute('href');
  deploy.getAccount(function (account) {
    document.getElementById('account-field').textContent = account.email;
    accountButton.classList.remove('disabled');
    accountButton.href = '';
    deploy.getAccountKeys(function (keys) {
      // if (keys[0] && keys[0].id) {
      //   deploy.httpPostJson('https://api.digitalocean.com/v2/droplets', {
      //     'name':               'example-droplet',
      //     'region':             'nyc3',
      //     'size':               '512mb',
      //     'image':              'ubuntu-14-04-x64',
      //     'ssh-keys':           [keys[0].id],
      //     'backups':            false,
      //     'ipv6':               false,
      //     'user_data':          null,
      //     'private_networking': false
      //   }, function (resp) {
      //     console.log(resp['droplet']);
      //   }, nay);
      // }
    }, nay);
  }, nay);
});
</script>

<script async src="//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react.js"></script>
