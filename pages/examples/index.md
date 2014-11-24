---
title: Example applications
page-class: rule-before-h3 tweak-listings
page-data:
- key: max-back-link-level
  value: 3
page-head: |
  <style>
    header a.link-examples {
      color: #3f96f0;
    }
  </style>
---


Example applications { .with-toc }
====================

**Work in progress.  All available information is up-to-date.**

<div><nav>
<ul class="toc menu open">
<li><a href="#circuithub">CircuitHub</a></li>
<li><a href="#howistart">How I Start</a></li>
<li><a href="#haskell-lang">Haskell Language</a></li>
<li><a href="#tryhaskell">Try Haskell</a></li>
<li><a href="#tryidris">Try Idris</a></li>
<li><a href="#trypurescript">Try PureScript</a></li>
<li><a href="#tryhaste">Try Haste</a></li>
<li><a href="#gitit">Gitit</a></li>
<li><a href="#hello-world-shootout">“Hello, world!” shootout</a></li>
</ul>
</nav></div>


#### Notes

Deploying any of the example applications by restoring an install archive is expected to take less than 30 seconds.

_First build_ refers to deploying with no sandbox or application archives available to be restored.  All archives created during the first build are used for subsequent builds and deploys.

Times measured on a [DigitalOcean](https://digitalocean.com/) instance with 8GB RAM, 4 logical cores, and SSD storage, running Ubuntu 14.04 LTS (x86_64).

Build logs trimmed for clarity.


CircuitHub
----------

> ---------------------|---
> Website:             | [CircuitHub](https://circuithub.com/)
> Author:              | [CircuitHub team](https://circuithub.com/about/team)
> Framework:           | [Yesod](http://yesodweb.com/) 1.2.19
> Source code:         | _private_
> Status:              | _live_

Electronics manufacturing service, built for hardware startups.

Using Halcyon since June 2014, via [Haskell on Heroku](https://haskellonheroku.com/).

<div class="tweet">
<blockquote class="twitter-tweet" lang="en" data-conversation="none"><p><a href="https://twitter.com/mietek">@mietek</a> Great work, great project!</p>&mdash; CircuitHub (@CircuitHub) <a href="https://twitter.com/CircuitHub/status/528883979265781760">November 2, 2014</a></blockquote>
</div>

<!-- #### First build log

<div class="toggle">
<a class="toggle-button" data-target="circuithub-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="circuithub-deploy"><code># halcyon deploy circuithub-api
</code></pre>
</div>

**TODO** -->


How I Start
-----------

> ---------------------|---
> Website:             | [How I Start](https://howistart.org/)
> Author:              | [Tristan Sloughter](https://github.com/howistart/howistart.org/)
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> Source code:         | [_howistart.org_](https://github.com/mietek/howistart.org/)
> Status:              | _live_

Mix between a collection of development tutorials and [The Setup](http://usesthis.com/).

Using Halcyon since July 2014, via [Haskell on Heroku](https://haskellonheroku.com/).


<!-- #### First build log

<div class="toggle">
<a class="toggle-button" data-target="howistart-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="howistart-deploy"><code># halcyon deploy <a href="https://github.com/mietek/howistart.org/">https://github.com/mietek/howistart.org#halcyon</a>
</code></pre>
</div>

**TODO** -->


Haskell Language
----------------

> ---------------------|---
> Website:             | [Haskell Language](http://haskell-lang.org/)
> Author:              | [Chris Done](https://github.com/chrisdone/tryhaskell/)
> Framework:           | [Yesod](http://yesodweb.com/) 1.4.3
> Source code:         | [_hl_](https://github.com/mietek/hl/)
> Status:              | _not ready_

Introduction to Haskell, featuring [Try Haskell](#try-haskell).


<!-- ### First build log

<div class="toggle">
<a class="toggle-button" data-target="haskell-lang-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="haskell-lang-deploy"><code># halcyon deploy <a href="https://github.com/mietek/hl/">https://github.com/mietek/hl#halcyon</a>
</code></pre>
</div>-->

**TODO**


Try Haskell
-----------

> ---------------------|---
> Website:             | [Try Haskell](http://tryhaskell.org/)
> Author:              | [Chris Done](https://github.com/chrisdone/tryhaskell/)
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> Source code:         | [_tryhaskell_](https://github.com/mietek/tryhaskell/)
> Status:              | _ready_

Interactive Haskell tutorial, powered by [_mueval_](https://github.com/gwern/mueval/), and featured in [Haskell Language](#haskell-language).


<!-- #### First build log

<div class="toggle">
<a class="toggle-button" data-target="tryhaskell-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="tryhaskell-deploy"><code># halcyon deploy <a href="https://github.com/mietek/tryhaskell/">https://github.com/mietek/tryhaskell#halcyon</a>
</code></pre>
</div>

**TODO** -->


Try Idris
---------

> ---------------------|---
> Website:             | [Try Idris](http://tryidris.org/)
> Author:              | [Brian McKenna](https://github.com/puffnfresh/tryidris/)
> Framework:           | [Scotty](https://github.com/scotty-web/scotty/) 0.9.0
> Source code:         | [_tryidris_](https://github.com/mietek/tryidris/)
> Status:              | _ready_

[Idris](http://idris-lang.org/) compiler on a webpage.

<div class="tweet">
<blockquote class="twitter-tweet" lang="en" data-cards="hidden"><p><a href="https://twitter.com/raichoo">@raichoo</a> new version, coming soon - thanks <a href="https://twitter.com/mietek">@mietek</a>! <a href="http://t.co/5G6zPGNpSJ">pic.twitter.com/5G6zPGNpSJ</a></p>&mdash; Brian McKenna (@puffnfresh) <a href="https://twitter.com/puffnfresh/status/521491105549144064">October 13, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>


<!-- #### First build log

<div class="toggle">
<a class="toggle-button" data-target="tryidris-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="tryidris-deploy"><code># halcyon deploy <a href="https://github.com/mietek/tryidris/">https://github.com/mietek/tryidris#halcyon</a>
</code></pre>
</div>

**TODO** -->


Try PureScript
--------------

> ---------------------|---
> Website:             | [Try PureScript](http://try.purescript.org/)
> Author:              | [Phil Freeman](https://github.com/purescript/trypurescript/)
> Framework:           | [Scotty](https://github.com/scotty-web/scotty/) 0.9.0
> Source code:         | [_trypurescript_](https://github.com/mietek/trypurescript/)
> Status:              | _ready_

[PureScript](http://purescript.org/) compiler on a webpage.

<div class="tweet">
<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/mietek">@mietek</a> &#39;s HaskellOnHeroku looks excellent <a href="http://t.co/qjFh5rKVE7">http://t.co/qjFh5rKVE7</a></p>&mdash; Phil Freeman (@paf31) <a href="https://twitter.com/paf31/status/527900905900085248">October 30, 2014</a></blockquote>
</div>


<!-- #### First build log

<div class="toggle">
<a class="toggle-button" data-target="trypurescript-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="trypurescript-deploy"><code># halcyon deploy <a href="https://github.com/mietek/trypurescript/">https://github.com/mietek/trypurescript#halcyon</a>
</code></pre>
</div>

**TODO** -->


Try Haste
---------

> ---------------------|---
> Website:             | [Try Haste](https://tryplayg.herokuapp.com/)
> Author:              | [Alberto G. Corona](https://github.com/agocorona/tryhplay/)
> Framework:           | [MFlow](https://github.com/agocorona/MFlow/) 0.4.5.9
> Source code:         | [_tryhplay_](https://github.com/mietek/tryhplay/)
> Status:              | _not ready_

[Haste](http://haste-lang.org/) development environment on a webpage.


<!-- #### First build log

<div class="toggle">
<a class="toggle-button" data-target="tryhaste-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="tryhaste-deploy"><code># halcyon deploy <a href="https://github.com/mietek/tryhplay/">https://github.com/mietek/tryhplay#halcyon</a>
</code></pre>
</div>-->

**TODO**


Gitit
-----

> ---------------------|---
> Website:             | [Gitit Demo](http://gitit.net/)
> Author:              | [John MacFarlane](https://github.com/jgm/gitit/)
> Framework:           | [Happstack](http://happstack.com/) 7.3.9
> Source code:         | [_gitit_](https://github.com/mietek/gitit/)
> Status:              | _ready_

Wiki with _git_ file storage.

<div class="tweet">
<blockquote class="twitter-tweet" lang="en" data-conversation="none"><p><a href="https://twitter.com/mietek">@mietek</a> Woo-hoo! I can login gitit using github account! It&#39;s really magic!!!!!! <a href="https://t.co/WH0HGre790">https://t.co/WH0HGre790</a></p>&mdash; Myu-Myu- ATS-tan! (@masterq_mogumog) <a href="https://twitter.com/masterq_mogumog/status/532183331148804096">November 11, 2014</a></blockquote>
</div>


<!-- #### First build log

<div class="toggle">
<a class="toggle-button" data-target="gitit-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="gitit-deploy"><code># halcyon deploy <a href="https://github.com/mietek/gitit/">https://github.com/mietek/gitit#halcyon</a>
</code></pre>
</div>

**TODO** -->


“Hello, world!” shootout { .with-toc }
------------------------

<div><nav>
<ul class="toc menu open">
<li><a href="#hello-happstack">_hello-happstack_</a></li>
<li><a href="#hello-mflow">_hello-mflow_</a></li>
<li><a href="#hello-miku">_hello-miku_</a></li>
<li><a href="#hello-scotty">_hello-scotty_</a></li>
<li><a href="#hello-simple">_hello-simple_</a></li>
<li><a href="#hello-snap">_hello-snap_</a></li>
<li><a href="#hello-spock">_hello-spock_</a></li>
<li><a href="#hello-wai">_hello-wai_</a></li>
<li><a href="#hello-wheb">_hello-wheb_</a></li>
<li><a href="#hello-yesod">_hello-yesod_</a></li>
</ul>
</nav></div>


### _hello-happstack_

> ---------------------|---
> Framework:           | [Happstack](http://happstack.com/) Lite 7.3.5
> First build time:    | 3m50s
> Dependencies:        | [44](https://github.com/mietek/hello-happstack/blob/master/cabal.config)
> Sandbox size:        | 64MB
> App size:            | 12MB
> Source code:         | [_hello-happstack_](https://github.com/mietek/hello-happstack/)

<div class="toggle">
<a class="toggle-button open" data-target="hello-happstack-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-happstack-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Happstack.Lite</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port_ <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
        config <span class="keyword keyword_operator keyword_operator_haskell">=</span> defaultServerConfig { port <span class="keyword keyword_operator keyword_operator_haskell">=</span> port_ }
    serve (<span class="support support_constant support_constant_haskell">Just</span> config) <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      ok <span class="keyword keyword_operator keyword_operator_haskell">$</span> toResponse <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span></span></code></pre>
</div>


#### First build log

<div class="toggle">
<a class="toggle-button" data-target="hello-happstack-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-happstack-deploy"><code># halcyon deploy <a href="https://github.com/mietek/hello-happstack/">https://github.com/mietek/hello-happstack</a>
-----> Cloning https://github.com/mietek/hello-happstack... done, 5f636e6
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-happstack-1.0</b>
       Source hash:                              <b>f586f68</b>
       Constraints hash:                         <b>5e34a95</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>
       External storage:                         <b>public</b>

-----> Restoring GHC layer
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal layer
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-11-17.tar.gz... done, 169MB

-----> Building sandbox layer
-----> Creating sandbox
       Writing a default package environment file to
       /app/sandbox/cabal.sandbox.config
       Creating a new sandbox at /app/sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed happstack-lite-7.3.5
-----> Sandbox built, 64MB
       Removing documentation from sandbox layer... done, 64MB
       Stripping sandbox layer... done, 55MB
-----> Archiving sandbox layer
       Creating halcyon-sandbox-5e34a95-hello-happstack-1.0.tar.gz... done, 8.8MB

-----> Configuring app
       Resolving dependencies...
       Configuring hello-happstack-1.0...
-----> Building app
       Building hello-happstack-1.0...
       Preprocessing executable 'hello-happstack' for hello-happstack-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/hello-happstack/hello-happstack-tmp/Main.o )
       Linking dist/build/hello-happstack/hello-happstack ...
-----> Built app, 12MB
       Stripping app... done, 8.7MB
-----> Archiving build
       Creating halcyon-build-hello-happstack-1.0.tar.gz... done, 1.8MB

-----> Preparing install
       Copying app
-----> Install prepared, 8.4MB
-----> Archiving install
       Creating halcyon-install-f586f68-hello-happstack-1.0.tar.gz... done, 1.7MB
-----> Installing app... done, 8.4MB

-----> App deployed:                             <b>hello-happstack-1.0</b>
</code></pre>
</div>


### _hello-mflow_

> ---------------------|---
> Framework:           | [MFlow](https://github.com/agocorona/MFlow/) 0.4.5.9
> First build time:    | 7m49s
> Dependencies:        | [106](https://github.com/mietek/hello-mflow/blob/master/cabal.config) and _cpphs_ 1.18.6
> Sandbox size:        | 152MB
> App size:            | 20MB
> Source code:         | [_hello-mflow_](https://github.com/mietek/hello-mflow/)

<div class="toggle">
<a class="toggle-button open" data-target="hello-mflow-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-mflow-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">MFlow.Wai.Blaze.Html.All</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span>
    runNavigation <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>hello<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> transientNav <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      page <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">++></span> empty</span></code></pre>
</div>


#### First build log

<div class="toggle">
<a class="toggle-button" data-target="hello-mflow-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-mflow-deploy"><code># halcyon deploy <a href="https://github.com/mietek/hello-mflow/">https://github.com/mietek/hello-mflow</a>
-----> Cloning https://github.com/mietek/hello-mflow... done, b017876
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-mflow-1.0</b>
       Source hash:                              <b>2ae4e5f</b>
       Constraints hash:                         <b>dc98a41</b>
       Magic hash:                               <b>8f018d2</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>
       Sandbox magic hash:                       <b>8f018d2</b>
       Sandbox extra apps:                       <b>cpphs-1.18.6</b>
       External storage:                         <b>public</b>

-----> Restoring GHC layer
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal layer
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-11-17.tar.gz... done, 169MB

-----> Building sandbox layer
-----> Creating sandbox
       Writing a default package environment file to
       /app/sandbox/cabal.sandbox.config
       Creating a new sandbox at /app/sandbox
-----> Deploying sandbox extra apps
       -----> Unpacking app
       -----> Deploying app
              Prefix:                                   <b>/app/sandbox</b>
              Label:                                    <b>cpphs-1.18.6</b>
              Source hash:                              <b>f93a89d</b>
              Constraints hash:                         <b>77178fc</b>
              GHC version:                              <b>7.8.3</b>
              Cabal version:                            <b>1.20.0.3</b>
              Cabal repository:                         <b>Hackage</b>
              External storage:                         <b>public</b>

       -----> Building sandbox layer
       -----> Creating sandbox
              Writing a default package environment file to
              /app/sandbox/cabal.sandbox.config
              Creating a new sandbox at /app/sandbox
       -----> Building sandbox
              Resolving dependencies...
              Notice: installing into a sandbox located at /app/sandbox
              Downloading text-1.2.0.0...
              Configuring text-1.2.0.0...
              Building text-1.2.0.0...
              Installed text-1.2.0.0
              Downloading polyparse-1.10...
              Configuring polyparse-1.10...
              Building polyparse-1.10...
              Installed polyparse-1.10
       -----> Sandbox built, 18MB
              Removing documentation from sandbox layer... done, 18MB
              Stripping sandbox layer... done, 15MB
       -----> Archiving sandbox layer
              Creating halcyon-sandbox-77178fc-cpphs-1.18.6.tar.gz... done, 2.6MB

       -----> Configuring app
              Resolving dependencies...
              Configuring cpphs-1.18.6...
       -----> Building app
              Building cpphs-1.18.6...
              Preprocessing library cpphs-1.18.6...
              ...
              In-place registering cpphs-1.18.6...
              Preprocessing executable 'cpphs' for cpphs-1.18.6...
              ...
              Linking dist/build/cpphs/cpphs ...
       -----> Built app, 7.2MB
              Stripping app... done, 6.1MB
       -----> Archiving build
              Creating halcyon-build-cpphs-1.18.6.tar.gz... done, 1.2MB

       -----> Preparing install
              Copying app
       -----> Install prepared, 3.3MB
       -----> Archiving install
              Creating halcyon-install-f93a89d-cpphs-1.18.6.tar.gz... done, 756KB
       -----> Installing app... done, 3.3MB
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed MFlow-0.4.5.9
-----> Sandbox built, 152MB
       Removing documentation from sandbox layer... done, 151MB
       Stripping sandbox layer... done, 130MB
-----> Archiving sandbox layer
       Creating halcyon-sandbox-dc98a41.8f018d2-hello-mflow-1.0.tar.gz... done, 23MB

-----> Configuring app
       Resolving dependencies...
       Configuring hello-mflow-1.0...
-----> Building app
       Building hello-mflow-1.0...
       Preprocessing executable 'hello-mflow' for hello-mflow-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/hello-mflow/hello-mflow-tmp/Main.o )
       Linking dist/build/hello-mflow/hello-mflow ...
-----> Built app, 20MB
       Stripping app... done, 15MB
-----> Archiving build
       Creating halcyon-build-hello-mflow-1.0.tar.gz... done, 3.3MB

-----> Preparing install
       Copying app
-----> Install prepared, 15MB
-----> Archiving install
       Creating halcyon-install-2ae4e5f-hello-mflow-1.0.tar.gz... done, 3.3MB
-----> Installing app... done, 15MB

-----> App deployed:                             <b>hello-mflow-1.0</b>
</code></pre>
</div>


### _hello-miku_

> ---------------------|---
> Framework:           | [_miku_](https://github.com/nfjinjing/miku/) 2014.5.19
> First build time:    | 5m12s
> Dependencies:        | [59](https://github.com/mietek/hello-miku/blob/master/cabal.config)
> Sandbox size:        | 84MB
> App size:            | 13MB
> Source code:         | [_hello-miku_](https://github.com/mietek/hello-miku/)

<div class="toggle">
<a class="toggle-button open" data-target="hello-miku-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-miku-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Network.Miku</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Hack2.Handler.SnapServer</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port_ <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
    runWithConfig (<span class="constant constant_other constant_other_haskell">ServerConfig</span> port_) <span class="keyword keyword_operator keyword_operator_haskell">.</span> miku <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      get <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>/<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> (text <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span>)</span></code></pre>
</div>


#### First build log

<div class="toggle">
<a class="toggle-button" data-target="hello-miku-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-miku-deploy"><code># halcyon deploy <a href="https://github.com/mietek/hello-miku/">https://github.com/mietek/hello-miku</a>
-----> Cloning https://github.com/mietek/hello-miku... done, cdfe7f8
-----> Deploying app
       Label:                                    <b>hello-miku-1.0</b>
       Source hash:                              <b>0adfaa5</b>
       Constraints hash:                         <b>3fa23e0</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>
       External storage:                         <b>public</b>

-----> Restoring GHC layer
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal layer
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-11-17.tar.gz... done, 169MB

-----> Building sandbox layer
-----> Creating sandbox
       Writing a default package environment file to
       /app/sandbox/cabal.sandbox.config
       Creating a new sandbox at /app/sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed miku-2014.5.19
-----> Sandbox built, 84MB
       Removing documentation from sandbox layer... done, 84MB
       Stripping sandbox layer... done, 72MB
-----> Archiving sandbox layer
       Creating halcyon-sandbox-3fa23e0-hello-miku-1.0.tar.gz... done, 12MB

-----> Configuring app
       Resolving dependencies...
       Configuring hello-miku-1.0...
-----> Building app
       Building hello-miku-1.0...
       Preprocessing executable 'hello-miku' for hello-miku-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/hello-miku/hello-miku-tmp/Main.o )
       Linking dist/build/hello-miku/hello-miku ...
-----> Built app, 13MB
       Stripping app... done, 11MB
-----> Archiving build
       Creating halcyon-build-hello-miku-1.0.tar.gz... done, 2.1MB

-----> Preparing install
       Copying app
-----> Install prepared, 11MB
-----> Archiving install
       Creating halcyon-install-0adfaa5-hello-miku-1.0.tar.gz... done, 2.1MB
-----> Installing app... done, 11MB

-----> App deployed:                             <b>hello-miku-1.0</b>
</code></pre>
</div>


### _hello-scotty_

> ---------------------|---
> Framework:           | [Scotty](https://github.com/scotty-web/scotty/) 0.9.0
> First build time:    | **TODO**
> Dependencies:        | [74](https://github.com/mietek/hello-scotty/blob/master/cabal.config)
> Sandbox size:        | 83MB
> App size:            | 12MB
> Source code:         | [_hello-scotty_](https://github.com/mietek/hello-scotty/)

<div class="toggle">
<a class="toggle-button open" data-target="hello-scotty-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-scotty-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Web.Scotty</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
    scotty port <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      get <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>/<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> text <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span></span></code></pre>
</div>


<!-- #### First build log

<div class="toggle">
<a class="toggle-button" data-target="hello-scotty-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-scotty-deploy"><code># halcyon deploy <a href="https://github.com/mietek/hello-scotty/">https://github.com/mietek/hello-scotty</a>
</code></pre>
</div>

**TODO** -->


### _hello-simple_

> ---------------------|---
> Framework:           | [Simple](http://simple.cx/) 0.10.0.2
> First build time:    | **TODO**
> Dependencies:        | [70](https://github.com/mietek/hello-simple/blob/master/cabal.config)
> Sandbox size:        | 100MB
> App size:            | 7MB
> Source code:         | [_hello-simple_](https://github.com/mietek/hello-simple/)

<div class="toggle">
<a class="toggle-button open" data-target="hello-simple-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-simple-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Network.Wai.Handler.Warp</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Web.Simple</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">app</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> (<span class="storage storage_type storage_type_haskell">Application</span> <span class="keyword keyword_other keyword_other_arrow keyword_other_arrow_haskell">-></span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>) <span class="keyword keyword_other keyword_other_arrow keyword_other_arrow_haskell">-></span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>app runner <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    runner <span class="keyword keyword_operator keyword_operator_haskell">$</span> controllerApp <span class="constant constant_language constant_language_unit constant_language_unit_haskell">()</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
      routeTop <span class="keyword keyword_operator keyword_operator_haskell">$</span> respond <span class="keyword keyword_operator keyword_operator_haskell">$</span>
        ok <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>text/plain<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
    app (run port)</span></code></pre>
</div>


<!-- #### First build log

<div class="toggle">
<a class="toggle-button" data-target="hello-simple-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-simple-deploy"><code># halcyon deploy <a href="https://github.com/mietek/hello-simple/">https://github.com/mietek/hello-simple</a>
</code></pre>
</div>

**TODO** -->


### _hello-snap_

> ---------------------|---
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> First build time:    | 4m50s
> Dependencies:        | [42](https://github.com/mietek/hello-snap/blob/master/cabal.config)
> Sandbox size:        | 69MB
> App size:            | 11MB
> Source code:         | [_hello-snap_](https://github.com/mietek/hello-snap/)

<div class="toggle">
<a class="toggle-button open" data-target="hello-snap-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-snap-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Snap.Core</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Snap.Http.Server</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
        config <span class="keyword keyword_operator keyword_operator_haskell">=</span> setPort port
               <span class="keyword keyword_operator keyword_operator_haskell">.</span> setAccessLog <span class="constant constant_other constant_other_haskell">ConfigNoLog</span>
               <span class="keyword keyword_operator keyword_operator_haskell">.</span> setErrorLog <span class="constant constant_other constant_other_haskell">ConfigNoLog</span>
               <span class="keyword keyword_operator keyword_operator_haskell">$</span> defaultConfig
    httpServe config <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      ifTop <span class="keyword keyword_operator keyword_operator_haskell">$</span> writeBS <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span></span></code></pre>
</div>


#### First build log

<div class="toggle">
<a class="toggle-button" data-target="hello-snap-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-snap-deploy"><code># halcyon deploy <a href="https://github.com/mietek/hello-snap/">https://github.com/mietek/hello-snap</a>
-----> Cloning https://github.com/mietek/hello-snap... done, bd5d822
-----> Deploying app
       Label:                                    <b>hello-snap-1.0</b>
       Source hash:                              <b>9d0aa61</b>
       Constraints hash:                         <b>4531dbe</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>
       External storage:                         <b>public</b>

-----> Restoring GHC layer
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal layer
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-11-17.tar.gz... done, 169MB

-----> Building sandbox layer
-----> Creating sandbox
       Writing a default package environment file to
       /app/sandbox/cabal.sandbox.config
       Creating a new sandbox at /app/sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed snap-core-0.9.6.3
-----> Sandbox built, 69MB
       Removing documentation from sandbox layer... done, 68MB
       Stripping sandbox layer... done, 59MB
-----> Archiving sandbox layer
       Creating halcyon-sandbox-4531dbe-hello-snap-1.0.tar.gz... done, 9.9MB

-----> Configuring app
       Resolving dependencies...
       Configuring hello-snap-1.0...
-----> Building app
       Building hello-snap-1.0...
       Preprocessing executable 'hello-snap' for hello-snap-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/hello-snap/hello-snap-tmp/Main.o )
       Linking dist/build/hello-snap/hello-snap ...
-----> Built app, 11MB
       Stripping app... done, 9.1MB
-----> Archiving build
       Creating halcyon-build-hello-snap-1.0.tar.gz... done, 1.9MB

-----> Preparing install
       Copying app
-----> Install prepared, 8.9MB
-----> Archiving install
       Creating halcyon-install-9d0aa61-hello-snap-1.0.tar.gz... done, 1.8MB
-----> Installing app... done, 8.9MB

-----> App deployed:                             <b>hello-snap-1.0</b>
</code></pre>
</div>


### _hello-spock_

> ---------------------|---
> Framework:           | [Spock](https://github.com/agrafix/Spock/) 0.7.4.0
> First build time:    | 5m12s
> Dependencies:        | [80](https://github.com/mietek/hello-spock/blob/master/cabal.config)
> Sandbox size:        | 107MB
> App size:            | 12MB
> Source code:         | [_hello-spock_](https://github.com/mietek/hello-spock/)

<div class="toggle">
<a class="toggle-button open" data-target="hello-spock-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-spock-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Web.Spock.Safe</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
    runSpock port <span class="keyword keyword_operator keyword_operator_haskell">$</span> spockT <span class="support support_function support_function_prelude support_function_prelude_haskell">id</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      get <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>/<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> text <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span></span></code></pre>
</div>


#### First build log

<div class="toggle">
<a class="toggle-button" data-target="hello-spock-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-spock-deploy"><code># halcyon deploy <a href="https://github.com/mietek/hello-spock/">https://github.com/mietek/hello-spock</a>
-----> Cloning https://github.com/mietek/hello-spock... done, 9ff86ed
-----> Deploying app
       Label:                                    <b>hello-spock-1.0</b>
       Source hash:                              <b>0f869b0</b>
       Constraints hash:                         <b>d716519</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>
       External storage:                         <b>public</b>

-----> Restoring GHC layer
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal layer
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-11-17.tar.gz... done, 169MB

-----> Building sandbox layer
-----> Creating sandbox
       Writing a default package environment file to
       /app/sandbox/cabal.sandbox.config
       Creating a new sandbox at /app/sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed Spock-0.7.4.0
-----> Sandbox built, 107MB
       Removing documentation from sandbox layer... done, 106MB
       Stripping sandbox layer... done, 91MB
-----> Archiving sandbox layer
       Creating halcyon-sandbox-d716519-hello-spock-1.0.tar.gz... done, 15MB

-----> Configuring app
       Resolving dependencies...
       Configuring hello-spock-1.0...
-----> Building app
       Building hello-spock-1.0...
       Preprocessing executable 'hello-spock' for hello-spock-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/hello-spock/hello-spock-tmp/Main.o )
       Linking dist/build/hello-spock/hello-spock ...
-----> Built app, 12MB
       Stripping app... done, 9.2MB
-----> Archiving build
       Creating halcyon-build-hello-spock-1.0.tar.gz... done, 2.1MB

-----> Preparing install
       Copying app
-----> Install prepared, 8.7MB
-----> Archiving install
       Creating halcyon-install-0f869b0-hello-spock-1.0.tar.gz... done, 2.0MB
-----> Installing app in /app... done, 8.7MB

-----> App deployed:                             <b>hello-spock-1.0</b>
</code></pre>
</div>


### _hello-wai_

> ---------------------|---
> Framework:           | [WAI](https://hackage.haskell.org/package/wai/) 3.0.2
> First build time:    | 4m20s
> Dependencies:        | [38](https://github.com/mietek/hello-wai/blob/master/cabal.config)
> Sandbox size:        | 45MB
> App size:            | 6MB
> Source code:         | [_hello-wai_](https://github.com/mietek/hello-wai/)

<div class="toggle">
<a class="toggle-button open" data-target="hello-wai-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-wai-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Network.HTTP.Types</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Network.Wai</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Network.Wai.Handler.Warp</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">app</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="storage storage_type storage_type_haskell">Application</span>
</span>app _ respond <span class="keyword keyword_operator keyword_operator_haskell">=</span>
    respond <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      responseLBS status200
        [(<span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Content-Type<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span><span class="punctuation punctuation_separator punctuation_separator_comma punctuation_separator_comma_haskell">,</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>text/plain<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span>)]
        <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
    run port app</span></code></pre>
</div>


#### First build log

<div class="toggle">
<a class="toggle-button" data-target="hello-wai-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-wai-deploy"><code># halcyon deploy <a href="https://github.com/mietek/hello-wai/">https://github.com/mietek/hello-wai</a>
-----> Cloning https://github.com/mietek/hello-wai... done, eb087bc
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-wai-1.0</b>
       Source hash:                              <b>3c97959</b>
       Constraints hash:                         <b>799b066</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>
       External storage:                         <b>public</b>

-----> Restoring GHC layer
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal layer
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-11-17.tar.gz... done, 169MB

-----> Building sandbox layer
-----> Creating sandbox
       Writing a default package environment file to
       /app/sandbox/cabal.sandbox.config
       Creating a new sandbox at /app/sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed wai-3.0.2
-----> Sandbox built, 45MB
       Removing documentation from sandbox layer... done, 44MB
       Stripping sandbox layer... done, 38MB
-----> Archiving sandbox layer
       Creating halcyon-sandbox-799b066-hello-wai-1.0.tar.gz... done, 6.4MB

-----> Configuring app
       Resolving dependencies...
       Configuring hello-wai-1.0...
-----> Building app
       Building hello-wai-1.0...
       Preprocessing executable 'hello-wai' for hello-wai-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/hello-wai/hello-wai-tmp/Main.o )
       Linking dist/build/hello-wai/hello-wai ...
-----> Built app, 5.9MB
       Stripping app... done, 4.8MB
-----> Archiving build
       Creating halcyon-build-hello-wai-1.0.tar.gz... done, 1.1MB

-----> Preparing install
       Copying app
-----> Install prepared, 4.5MB
-----> Archiving install
       Creating halcyon-install-3c97959-hello-wai-1.0.tar.gz... done, 1.1MB
-----> Installing app... done, 4.5MB

-----> App deployed:                             <b>hello-wai-1.0</b>
</code></pre>
</div>


### _hello-wheb_

> ---------------------|---
> Framework:           | [Wheb](https://github.com/hansonkd/Wheb-Framework/) 0.3.1.0
> First build time:    | 5m37s
> Dependencies:        | [98](https://github.com/mietek/hello-wheb/blob/master/cabal.config)
> Sandbox size:        | 146MB
> App size:            | 10MB
> Source code:         | [_hello-wheb_](https://github.com/mietek/hello-wheb/)

<div class="toggle">
<a class="toggle-button open" data-target="hello-wheb-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-wheb-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Web.Wheb</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> (<span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="keyword keyword_operator keyword_operator_haskell">::</span> <span class="constant constant_other constant_other_haskell">Int</span>) <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span>
             <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
    opts <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> genMinOpts <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
      addGET <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>.<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> rootPat <span class="keyword keyword_operator keyword_operator_haskell">$</span> (text <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span>)
      addSetting' <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>port<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> port
    runWhebServer opts</span></code></pre>
</div>


#### First build log

<div class="toggle">
<a class="toggle-button" data-target="hello-wheb-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-wheb-deploy"><code># halcyon deploy <a href="https://github.com/mietek/hello-wheb/">https://github.com/mietek/hello-wheb</a>
-----> Cloning https://github.com/mietek/hello-wheb... done, 521623f
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-wheb-1.0</b>
       Source hash:                              <b>1688650</b>
       Constraints hash:                         <b>cd0692c</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>
       External storage:                         <b>public</b>

-----> Restoring GHC layer
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal layer
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-11-17.tar.gz... done, 169MB

-----> Building sandbox layer
-----> Creating sandbox
       Writing a default package environment file to
       /app/sandbox/cabal.sandbox.config
       Creating a new sandbox at /app/sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed Wheb-0.3.1.0
-----> Sandbox built, 146MB
       Removing documentation from sandbox layer... done, 145MB
       Stripping sandbox layer... done, 128MB
-----> Archiving sandbox layer
       Creating halcyon-sandbox-cd0692c-hello-wheb-1.0.tar.gz... done, 22MB

-----> Configuring app
       Resolving dependencies...
       Configuring hello-wheb-1.0...
-----> Building app
       Building hello-wheb-1.0...
       Preprocessing executable 'hello-wheb' for hello-wheb-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/hello-wheb/hello-wheb-tmp/Main.o )
       Linking dist/build/hello-wheb/hello-wheb ...
-----> Built app, 9.8MB
       Stripping app... done, 7.4MB
-----> Archiving build
       Creating halcyon-build-hello-wheb-1.0.tar.gz... done, 1.7MB

-----> Preparing install
       Copying app
-----> Install prepared, 7.0MB
-----> Archiving install
       Creating halcyon-install-1688650-hello-wheb-1.0.tar.gz... done, 1.6MB
-----> Installing app in /app... done, 7.0MB

-----> App deployed:                             <b>hello-wheb-1.0</b>
</code></pre>
</div>


### _hello-yesod_

> ---------------------|---
> Framework:           | [Yesod](http://yesodweb.com/) 1.4.0
> First build time:    | 8m47s
> Dependencies:        | [145](https://github.com/mietek/hello-yesod/blob/master/cabal.config)
> Sandbox size:        | 250MB
> App size:            | 25MB
> Source code:         | [_hello-yesod_](https://github.com/mietek/hello-yesod/)

<div class="toggle">
<a class="toggle-button open" data-target="hello-yesod-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-yesod-source"><code><span class="source source_haskell"><span class="meta meta_preprocessor meta_preprocessor_haskell">{-# <span class="keyword keyword_other keyword_other_preprocessor keyword_other_preprocessor_haskell">LANGUAGE</span> QuasiQuotes #-}</span>
<span class="meta meta_preprocessor meta_preprocessor_haskell">{-# <span class="keyword keyword_other keyword_other_preprocessor keyword_other_preprocessor_haskell">LANGUAGE</span> TemplateHaskell #-}</span>
<span class="meta meta_preprocessor meta_preprocessor_haskell">{-# <span class="keyword keyword_other keyword_other_preprocessor keyword_other_preprocessor_haskell">LANGUAGE</span> TypeFamilies #-}</span>

<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Yesod</span></span>

<span class="keyword keyword_other keyword_other_haskell">data</span> <span class="constant constant_other constant_other_haskell">Hello</span> <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="constant constant_other constant_other_haskell">Hello</span>

mkYesod <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> [parseRoutes<span class="keyword keyword_operator keyword_operator_haskell">|/</span> <span class="constant constant_other constant_other_haskell">HomeR</span> <span class="constant constant_other constant_other_haskell">GET</span><span class="keyword keyword_operator keyword_operator_haskell">|</span>]

<span class="meta meta_declaration meta_declaration_instance meta_declaration_instance_haskell"><span class="keyword keyword_other keyword_other_haskell">instance</span> <span class="storage storage_type storage_type_haskell">Yesod</span> <span class="storage storage_type storage_type_haskell">Hello</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">getHomeR</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="storage storage_type storage_type_haskell">Handler</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">String</span>
</span>getHomeR <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">return</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
    warp port <span class="constant constant_other constant_other_haskell">Hello</span></span></code></pre>
</div>


#### First build log

<div class="toggle">
<a class="toggle-button" data-target="hello-yesod-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-yesod-deploy"><code># halcyon deploy <a href="https://github.com/mietek/hello-yesod/">https://github.com/mietek/hello-yesod</a>
-----> Cloning https://github.com/mietek/hello-yesod... done, 073431c
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-yesod-1.0</b>
       Source hash:                              <b>5ad16e2</b>
       Constraints hash:                         <b>4ba3d77</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>
       External storage:                         <b>public</b>

-----> Restoring GHC layer
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal layer
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-11-17.tar.gz... done, 169MB

-----> Building sandbox layer
-----> Creating sandbox
       Writing a default package environment file to
       /app/sandbox/cabal.sandbox.config
       Creating a new sandbox at /app/sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed yesod-1.4.0
-----> Sandbox built, 250MB
       Removing documentation from sandbox layer... done, 249MB
       Stripping sandbox layer... done, 216MB
-----> Archiving sandbox layer
       Creating halcyon-sandbox-4ba3d77-hello-yesod-1.0.tar.gz... done, 38MB

-----> Configuring app
       Resolving dependencies...
       Configuring hello-yesod-1.0...
-----> Building app
       Building hello-yesod-1.0...
       Preprocessing executable 'hello-yesod' for hello-yesod-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/hello-yesod/hello-yesod-tmp/Main.o )
       ...
       Loading package yesod-1.4.0 ... linking ... done.

       Main.hs:10:1: Warning:
           Defined but not used: type constructor or class ‘Widget’

       Main.hs:10:1: Warning: Defined but not used: ‘resourcesHello’
       Linking dist/build/hello-yesod/hello-yesod ...
-----> Built app, 25MB
       Stripping app... done, 20MB
-----> Archiving build
       Creating halcyon-build-hello-yesod-1.0.tar.gz... done, 3.9MB

-----> Preparing install
       Copying app
-----> Install prepared, 19MB
-----> Archiving install
       Creating halcyon-install-5ad16e2-hello-yesod-1.0.tar.gz... done, 3.8MB
-----> Installing app in /app... done, 19MB

-----> App deployed:                             <b>hello-yesod-1.0</b>
</code></pre>
</div>


<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
