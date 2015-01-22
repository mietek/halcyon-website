---
title: Shootout
page-class: tweak-listings
page-head: |
  <style>
    header a.link-shootout {
      color: #3f96f0;
    }
  </style>
---


Halcyon shootout { .with-toc }
================

Halcyon is a system for installing [Haskell](https://haskell.org/) apps and development tools, including [GHC](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/) and [Cabal](https://haskell.org/cabal/users-guide/).

These examples are intended to compare build times and sizes across most Haskell web frameworks.


<div><nav><ul class="toc menu open">
<li><a href="#results">Results</a></li>
<li><a href="#hello-apiary"><i>hello-apiary</i></a></li>
<li><a href="#hello-happstack"><i>hello-happstack</i></a></li>
<li><a href="#hello-mflow"><i>hello-mflow</i></a></li>
<li><a href="#hello-miku"><i>hello-miku</i></a></li>
<li><a href="#hello-scotty"><i>hello-scotty</i></a></li>
<li><a href="#hello-servant"><i>hello-servant</i></a></li>
<li><a href="#hello-simple"><i>hello-simple</i></a></li>
<li><a href="#hello-snap"><i>hello-snap</i></a></li>
<li><a href="#hello-spock"><i>hello-spock</i></a></li>
<li><a href="#hello-wai"><i>hello-wai</i></a></li>
<li><a href="#hello-wheb"><i>hello-wheb</i></a></li>
<li><a href="#hello-yesod"><i>hello-yesod</i></a></li>
</ul></nav></div>

All example apps can be installed in one command on most recent Linux distributions, including CentOS 7, Debian 7, Fedora 20, and Ubuntu 14.04.

Additionally, all example apps can be deployed in one click to [DigitalOcean](https://digitalocean.com) or [Heroku](https://heroku.com/).


Results
-------

<div class="chart" id="shootout-chart"></div>

<aside>
<a class="micro face joe-nelson" href="https://twitter.com/begriffs/status/522811714325475329"></a>
<blockquote>_“Check out [Miëtek’s](/#about) [Haskell on Heroku](https://haskellonheroku.com/) buildpack — it dynamically selects a pre-made Cabal sandbox for build speed.”_</blockquote>
<p>[— Joe Nelson](https://twitter.com/begriffs/status/522811714325475329), [inspiration](https://begriffs.com/posts/2013-08-22-haskell-on-heroku-omg-lets-get-this.html) for [Haskell on Heroku](https://haskellonheroku.com/)</p>
</aside>

#### Comments

The test simulates installing each example for the first time, by forcing Halcyon to rebuild the sandbox and the app from scratch.  GHC and Cabal are restored from local cache.

The times given are _mean [low, high]_, calculated across 10 test runs.  Each test run consists of building all examples on an 8 GB DigitalOcean droplet, running Ubuntu 14.04.

The raw results are available as a [CSV file](https://gist.github.com/mietek/c37e9fba6290a96a926e).  To reproduce the results, use the included test script:

```
$ halcyon/test shootout --bench
...
hello-yesod,10,521,535,537,251MB,25MB
```

The output of the test script includes:

- App name
- GHC and Cabal restore time
- Sandbox build time
- App build time
- App install time
- Sandbox size
- App size


_hello-apiary_
-----------------

> ---------------------|---
> Framework:           | [_apiary_](https://hackage.haskell.org/package/apiary) 1.2.3
> Server:              | [_warp_](https://hackage.haskell.org/package/warp) 3.0.5.2
> Dependencies:        | [54](https://github.com/mietek/hello-apiary/blob/master/.halcyon/constraints) and _alex_ 3.1.4
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-apiary_](https://github.com/mietek/hello-apiary)


#### `Main.hs`

<div class="toggle">
<a class="toggle-button open" data-target="hello-apiary-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-apiary-source"><code><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Network.Wai.Handler.Warp</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Web.Apiary</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Web.Apiary.Heroku</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span>
  runHeroku run def <span class="keyword keyword_operator keyword_operator_haskell">$</span>
    action <span class="keyword keyword_operator keyword_operator_haskell">$</span> bytes <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span></span></code></pre>
</div>


#### Extra dependencies

- _alex_, as a [sandbox extra app](/reference/#halcyon_sandbox_extra_apps), with version constraints


### Usage

```
$ PORT=8080 hello-apiary
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-apiary-log" href="" title="Toggle">Toggle</a>
``` { #hello-apiary-log .toggle }
$ halcyon install https://github.com/mietek/hello-apiary
-----> Cloning https://github.com/mietek/hello-apiary... done, ed5b011
-----> Installing hello-apiary-1.0
-----> Determining constraints
       Label:                                    **hello-apiary-1.0**
       Prefix:                                   **/app**
       Source hash:                              **a53c031**
       Constraints hash:                         **958ff13**
       Magic hash:                               **22287c8**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**
       Sandbox magic hash:                       **1dd8630**
       Sandbox extra apps:                       **alex-3.1.4**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Installing sandbox extra apps
       -----> Unpacking app
       -----> Installing alex-3.1.4
              Label:                                    **alex-3.1.4**
              Prefix:                                   **/app/sandbox**
              Source hash:                              **ba3f51d**
              External storage:                         **public**
              GHC version:                              **7.8.4**

       -----> Restoring install directory
              Extracting halcyon-install-ba3f51d-alex-3.1.4.tar.gz... done, 2.5MB
       -----> Installing app to /app/sandbox
       -----> Installed alex-3.1.4
-----> Building sandbox
       ...
       Installed apiary-1.2.3
       Installed warp-3.0.5.2
-----> Sandbox built, 76MB
       Removing documentation from sandbox directory... done, 76MB
       Stripping sandbox directory... done, 65MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-958ff13.1dd8630-hello-apiary-1.0.tar.gz... done, 11MB

-----> Configuring app
-----> Building app
       Building hello-apiary-1.0...
       Preprocessing executable 'hello-apiary' for hello-apiary-1.0...
       ...
       Linking dist/build/hello-apiary/hello-apiary ...
-----> App built, 9.6MB
       Stripping app... done, 7.3MB
-----> Archiving build directory
       Creating halcyon-build-hello-apiary-1.0.tar.gz... done, 1.6MB

-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 7.0MB
-----> Archiving install directory
       Creating halcyon-install-a53c031-hello-apiary-1.0.tar.gz... done, 1.6MB
-----> Installing app to /app
-----> Installed hello-apiary-1.0

-----> App installed:                            **hello-apiary-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-apiary">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-apiary">Deploy to Heroku</a>


_hello-happstack_
-----------------

> ---------------------|---
> Framework:           | [_happstack-lite_](https://hackage.haskell.org/package/happstack-lite) 7.3.6
> Server:              | [_happstack-server_](https://hackage.haskell.org/package/happstack-server) 7.4.0
> Dependencies:        | [43](https://github.com/mietek/hello-happstack/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-happstack_](https://github.com/mietek/hello-happstack)


#### `Main.hs`

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


### Usage

```
$ PORT=8080 hello-happstack
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-happstack-log" href="" title="Toggle">Toggle</a>
``` { #hello-happstack-log .toggle }
$ halcyon install https://github.com/mietek/hello-happstack
-----> Cloning https://github.com/mietek/hello-happstack... done, c3b755e
-----> Installing hello-happstack-1.0
-----> Determining constraints
       Label:                                    **hello-happstack-1.0**
       Prefix:                                   **/app**
       Source hash:                              **ed46b35**
       Constraints hash:                         **3b0b768**
       Magic hash:                               **52d0f07**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       ...
       Installed happstack-lite-7.3.6
       Installed happstack-server-7.4.0
-----> Sandbox built, 65MB
       Removing documentation from sandbox directory... done, 64MB
       Stripping sandbox directory... done, 55MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-3b0b768-hello-happstack-1.0.tar.gz... done, 8.8MB

-----> Configuring app
-----> Building app
       Building hello-happstack-1.0...
       Preprocessing executable 'hello-happstack' for hello-happstack-1.0...
       ...
       Linking dist/build/hello-happstack/hello-happstack ...
-----> App built, 12MB
       Stripping app... done, 8.7MB
-----> Archiving build directory
       Creating halcyon-build-hello-happstack-1.0.tar.gz... done, 1.8MB

-----> Preparing install directory
-----> Install directory prepared, 8.4MB
-----> Archiving install directory
       Creating halcyon-install-ed46b35-hello-happstack-1.0.tar.gz... done, 1.7MB
-----> Installing app to /app
-----> Installed hello-happstack-1.0

-----> App installed:                            **hello-happstack-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-happstack">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-happstack">Deploy to Heroku</a>


_hello-mflow_
-------------

> ---------------------|---
> Framework:           | [MFlow](https://hackage.haskell.org/package/MFlow) 0.4.5.9
> Server:              | [_warp_](https://hackage.haskell.org/package/warp) 3.0.5.2
> Dependencies:        | [108](https://github.com/mietek/hello-mflow/blob/master/.halcyon/constraints) and _cpphs_ 1.18.8
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-mflow_](https://github.com/mietek/hello-mflow)


#### `Main.hs`

<div class="toggle">
<a class="toggle-button open" data-target="hello-mflow-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-mflow-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">MFlow.Wai.Blaze.Html.All</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span>
    runNavigation <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>hello<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> transientNav <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      page <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">++></span> empty</span></code></pre>
</div>


#### Extra dependencies

- _cpphs_, as a [sandbox extra app](/reference/#halcyon_sandbox_extra_apps), with version constraints


### Usage

```
$ PORT=8080 hello-mflow
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-mflow-log" href="" title="Toggle">Toggle</a>
``` { #hello-mflow-log .toggle }
$ halcyon install https://github.com/mietek/hello-mflow
-----> Cloning https://github.com/mietek/hello-mflow... done, 5354489
-----> Installing hello-mflow-1.0
-----> Determining constraints
       Label:                                    **hello-mflow-1.0**
       Prefix:                                   **/app**
       Source hash:                              **59defe3**
       Constraints hash:                         **5997705**
       Magic hash:                               **cbba333**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**
       Sandbox magic hash:                       **5ff190e**
       Sandbox extra apps:                       **cpphs-1.18.8**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Installing sandbox extra apps
       -----> Unpacking app
       -----> Installing cpphs-1.18.8
              Label:                                    **cpphs-1.18.8**
              Prefix:                                   **/app/sandbox**
              Source hash:                              **15d7c8e**
              External storage:                         **public**
              GHC version:                              **7.8.4**

       -----> Restoring install directory
              Extracting halcyon-install-15d7c8e-cpphs-1.18.8.tar.gz... done, 3.3MB
       -----> Installing app to /app/sandbox
       -----> Installed cpphs-1.18.8
-----> Building sandbox
       ...
       Installed MFlow-0.4.5.9
       Installed warp-3.0.5.2
-----> Sandbox built, 155MB
       Removing documentation from sandbox directory... done, 154MB
       Stripping sandbox directory... done, 133MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-5997705.5ff190e-hello-mflow-1.0.tar.gz... done, 23MB

-----> Configuring app
-----> Building app
       Building hello-mflow-1.0...
       Preprocessing executable 'hello-mflow' for hello-mflow-1.0...
       ...
       Linking dist/build/hello-mflow/hello-mflow ...
-----> App built, 21MB
       Stripping app... done, 15MB
-----> Archiving build directory
       Creating halcyon-build-hello-mflow-1.0.tar.gz... done, 3.4MB

-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 15MB
-----> Archiving install directory
       Creating halcyon-install-59defe3-hello-mflow-1.0.tar.gz... done, 3.3MB
-----> Installing app to /app
-----> Installed hello-mflow-1.0

-----> App installed:                            **hello-mflow-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-mflow">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-mflow">Deploy to Heroku</a>


_hello-miku_
------------

> ---------------------|---
> Framework:           | [_miku_](https://hackage.haskell.org/package/miku) 2014.11.17
> Server:              | [_snap-server_](https://hackage.haskell.org/package/snap-server) 0.9.4.6
> Dependencies:        | [59](https://github.com/mietek/hello-miku/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-miku_](https://github.com/mietek/hello-miku)


#### `Main.hs`

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


### Usage

```
$ PORT=8080 hello-miku
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-miku-log" href="" title="Toggle">Toggle</a>
``` { #hello-miku-log .toggle }
$ halcyon install https://github.com/mietek/hello-miku
-----> Cloning https://github.com/mietek/hello-miku... done, 972d7a1
-----> Installing hello-miku-1.0
-----> Determining constraints
       Label:                                    **hello-miku-1.0**
       Prefix:                                   **/app**
       Source hash:                              **95a0bb1**
       Constraints hash:                         **ffba4e6**
       Magic hash:                               **835b052**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       ...
       Installed miku-2014.11.17
       Installed snap-server-0.9.4.6
-----> Sandbox built, 85MB
       Removing documentation from sandbox directory... done, 84MB
       Stripping sandbox directory... done, 73MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-ffba4e6-hello-miku-1.0.tar.gz... done, 13MB

-----> Configuring app
-----> Building app
       Building hello-miku-1.0...
       Preprocessing executable 'hello-miku' for hello-miku-1.0...
       ...
       Linking dist/build/hello-miku/hello-miku ...
-----> App built, 13MB
       Stripping app... done, 11MB
-----> Archiving build directory
       Creating halcyon-build-hello-miku-1.0.tar.gz... done, 2.2MB

-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 11MB
-----> Archiving install directory
       Creating halcyon-install-95a0bb1-hello-miku-1.0.tar.gz... done, 2.1MB
-----> Installing app to /app
-----> Installed hello-miku-1.0

-----> App installed:                            **hello-miku-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-miku">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-miku">Deploy to Heroku</a>


_hello-scotty_
--------------

> ---------------------|---
> Framework:           | [_scotty_](https://hackage.haskell.org/package/scotty) 0.9.1
> Server:              | [_warp_](https://hackage.haskell.org/package/warp) 3.0.5.2
> Dependencies:        | [76](https://github.com/mietek/hello-scotty/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-scotty_](https://github.com/mietek/hello-scotty)


#### `Main.hs`

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


### Usage

```
$ PORT=8080 hello-scotty
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-scotty-log" href="" title="Toggle">Toggle</a>
``` { #hello-scotty-log .toggle }
$ halcyon install https://github.com/mietek/hello-scotty
-----> Cloning https://github.com/mietek/hello-scotty... done, 03726cf
-----> Installing hello-scotty-1.0
-----> Determining constraints
       Label:                                    **hello-scotty-1.0**
       Prefix:                                   **/app**
       Source hash:                              **1840ee2**
       Constraints hash:                         **6e85aa0**
       Magic hash:                               **a4671fe**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       ...
       Installed scotty-0.9.1
       Installed warp-3.0.5.2
-----> Sandbox built, 84MB
       Removing documentation from sandbox directory... done, 84MB
       Stripping sandbox directory... done, 73MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-6e85aa0-hello-scotty-1.0.tar.gz... done, 12MB

-----> Configuring app
-----> Building app
       Building hello-scotty-1.0...
       Preprocessing executable 'hello-scotty' for hello-scotty-1.0...
       ...
       Linking dist/build/hello-scotty/hello-scotty ...
-----> App built, 12MB
       Stripping app... done, 9.4MB
-----> Archiving build directory
       Creating halcyon-build-hello-scotty-1.0.tar.gz... done, 2.1MB

-----> Preparing install directory
-----> Install directory prepared, 9.0MB
-----> Archiving install directory
       Creating halcyon-install-1840ee2-hello-scotty-1.0.tar.gz... done, 2.0MB
-----> Installing app to /app
-----> Installed hello-scotty-1.0

-----> App installed:                            **hello-scotty-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-scotty">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-scotty">Deploy to Heroku</a>


_hello-servant_
---------------

> ---------------------|---
> Framework:           | [_servant_](https://hackage.haskell.org/package/servant) 0.2.1
> Server:              | [_warp_](https://hackage.haskell.org/package/warp) 3.0.5.2
> Dependencies:        | [101](https://github.com/mietek/hello-servant/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-servant_](https://github.com/mietek/hello-servant)


#### `Main.hs`

<div class="toggle">
<a class="toggle-button open" data-target="hello-servant-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-servant-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Data.Proxy</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Data.Text</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Network.Wai.Handler.Warp</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Servant</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>

<span class="keyword keyword_other keyword_other_haskell">type</span> <span class="constant constant_other constant_other_haskell">Hello</span> <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="constant constant_other constant_other_haskell">Get</span> <span class="constant constant_other constant_other_haskell">Text</span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">server</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="storage storage_type storage_type_haskell">Server</span> <span class="storage storage_type storage_type_haskell">Hello</span>
</span>server <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">return</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">proxy</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="storage storage_type storage_type_haskell">Proxy</span> <span class="storage storage_type storage_type_haskell">Hello</span>
</span>proxy <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="constant constant_other constant_other_haskell">Proxy</span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
    run port <span class="keyword keyword_operator keyword_operator_haskell">$</span> serve proxy server
</span></code></pre>
</div>


### Usage

```
$ PORT=8080 hello-servant
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-servant-log" href="" title="Toggle">Toggle</a>
``` { #hello-servant-log .toggle }
$ halcyon install https://github.com/mietek/hello-servant
-----> Cloning https://github.com/mietek/hello-servant... done, a09253c
-----> Installing hello-servant-1.0
-----> Determining constraints
       Label:                                    **hello-servant-1.0**
       Prefix:                                   **/app**
       Source hash:                              **25e7222**
       Constraints hash:                         **e138d6f**
       Magic hash:                               **47e5824**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       ...
       Installed servant-0.2.1
       Installed warp-3.0.5.2
-----> Sandbox built, 160MB
       Removing documentation from sandbox directory... done, 159MB
       Stripping sandbox directory... done, 140MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-e138d6f-hello-servant-1.0.tar.gz... done, 24MB

-----> Configuring app
-----> Building app
       Building hello-servant-1.0...
       Preprocessing executable 'hello-servant' for hello-servant-1.0...
       ...
       Linking dist/build/hello-servant/hello-servant ...
-----> App built, 11MB
       Stripping app... done, 8.6MB
-----> Archiving build directory
       Creating halcyon-build-hello-servant-1.0.tar.gz... done, 1.9MB

-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 8.1MB
-----> Archiving install directory
       Creating halcyon-install-25e7222-hello-servant-1.0.tar.gz... done, 1.8MB
-----> Installing app to /app
-----> Installed hello-servant-1.0

-----> App installed:                            **hello-servant-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-servant">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-servant">Deploy to Heroku</a>


_hello-simple_
--------------

> ---------------------|---
> Framework:           | [_simple_](https://hackage.haskell.org/package/simple) 0.10.1
> Server:              | [_warp_](https://hackage.haskell.org/package/warp) 3.0.5.2
> Dependencies:        | [72](https://github.com/mietek/hello-simple/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-simple_](https://github.com/mietek/hello-simple)


#### `Main.hs`

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


### Usage

```
$ PORT=8080 hello-simple
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-simple-log" href="" title="Toggle">Toggle</a>
``` { #hello-simple-log .toggle }
$ halcyon install https://github.com/mietek/hello-simple
-----> Cloning https://github.com/mietek/hello-simple... done, f83c2d6
-----> Installing hello-simple-1.0
-----> Determining constraints
       Label:                                    **hello-simple-1.0**
       Prefix:                                   **/app**
       Source hash:                              **631778f**
       Constraints hash:                         **bcf8074**
       Magic hash:                               **044b315**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       ...
       Installed simple-0.10.1
       Installed warp-3.0.5.2
-----> Sandbox built, 102MB
       Removing documentation from sandbox directory... done, 102MB
       Stripping sandbox directory... done, 89MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-bcf8074-hello-simple-1.0.tar.gz... done, 16MB

-----> Configuring app
-----> Building app
       Building hello-simple-1.0...
       Preprocessing executable 'hello-simple' for hello-simple-1.0...
       ...
       Linking dist/build/hello-simple/hello-simple ...
-----> App built, 6.6MB
       Stripping app... done, 5.3MB
-----> Archiving build directory
       Creating halcyon-build-hello-simple-1.0.tar.gz... done, 1.2MB

-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 4.9MB
-----> Archiving install directory
       Creating halcyon-install-631778f-hello-simple-1.0.tar.gz... done, 1.1MB
-----> Installing app to /app
-----> Installed hello-simple-1.0

-----> App installed:                            **hello-simple-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-simple">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-simple">Deploy to Heroku</a>


_hello-snap_
------------

> ---------------------|---
> Framework:           | [_snap-core_](https://hackage.haskell.org/package/snap-core) 0.9.6.4
> Server:              | [_snap-server_](https://hackage.haskell.org/package/snap-server) 0.9.4.6
> Dependencies:        | [42](https://github.com/mietek/hello-snap/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-snap_](https://github.com/mietek/hello-snap)


#### `Main.hs`

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


### Usage

```
$ PORT=8080 hello-snap
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-snap-log" href="" title="Toggle">Toggle</a>
``` { #hello-snap-log .toggle }
$ halcyon install https://github.com/mietek/hello-snap
-----> Cloning https://github.com/mietek/hello-snap... done, d42760d
-----> Installing hello-snap-1.0
-----> Determining constraints
       Label:                                    **hello-snap-1.0**
       Prefix:                                   **/app**
       Source hash:                              **52c0b22**
       Constraints hash:                         **861fd5c**
       Magic hash:                               **c6abdb6**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       ...
       Installed snap-core-0.9.6.4
       Installed snap-server-0.9.4.6
-----> Sandbox built, 75MB
       Removing documentation from sandbox directory... done, 75MB
       Stripping sandbox directory... done, 65MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-861fd5c-hello-snap-1.0.tar.gz... done, 11MB

-----> Configuring app
-----> Building app
       Building hello-snap-1.0...
       Preprocessing executable 'hello-snap' for hello-snap-1.0...
       ...
       Linking dist/build/hello-snap/hello-snap ...
-----> App built, 12MB
       Stripping app... done, 9.4MB
-----> Archiving build directory
       Creating halcyon-build-hello-snap-1.0.tar.gz... done, 1.9MB

-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 9.2MB
-----> Archiving install directory
       Creating halcyon-install-52c0b22-hello-snap-1.0.tar.gz... done, 1.9MB
-----> Installing app to /app
-----> Installed hello-snap-1.0

-----> App installed:                            **hello-snap-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-snap">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-snap">Deploy to Heroku</a>


_hello-spock_
-------------

> ---------------------|---
> Framework:           | [Spock](https://hackage.haskell.org/package/Spock) 0.7.7.0
> Server:              | [_warp_](https://hackage.haskell.org/package/warp) 3.0.5.2
> Dependencies:        | [78](https://github.com/mietek/hello-spock/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-spock_](https://github.com/mietek/hello-spock)


#### `Main.hs`

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


### Usage

```
$ PORT=8080 hello-spock
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-spock-log" href="" title="Toggle">Toggle</a>
``` { #hello-spock-log .toggle }
$ halcyon install https://github.com/mietek/hello-spock
-----> Cloning https://github.com/mietek/hello-spock... done, da0cb83
-----> Installing hello-spock-1.0
-----> Determining constraints
       Label:                                    **hello-spock-1.0**
       Prefix:                                   **/app**
       Source hash:                              **d225ab3**
       Constraints hash:                         **1e0b9d9**
       Magic hash:                               **1066fc1**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       ...
       Installed Spock-0.7.7.0
       Installed warp-3.0.5.2
-----> Sandbox built, 94MB
       Removing documentation from sandbox directory... done, 93MB
       Stripping sandbox directory... done, 80MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-1e0b9d9-hello-spock-1.0.tar.gz... done, 14MB

-----> Configuring app
-----> Building app
       Building hello-spock-1.0...
       Preprocessing executable 'hello-spock' for hello-spock-1.0...
       ...
       Linking dist/build/hello-spock/hello-spock ...
-----> App built, 12MB
       Stripping app... done, 9.4MB
-----> Archiving build directory
       Creating halcyon-build-hello-spock-1.0.tar.gz... done, 2.1MB

-----> Preparing install directory
-----> Install directory prepared, 8.9MB
-----> Archiving install directory
       Creating halcyon-install-d225ab3-hello-spock-1.0.tar.gz... done, 2.0MB
-----> Installing app to /app
-----> Installed hello-spock-1.0

-----> App installed:                            **hello-spock-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-spock">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-spock">Deploy to Heroku</a>


_hello-wai_
-----------

> ---------------------|---
> Framework:           | [_wai_](https://hackage.haskell.org/package/wai/) 3.0.2.2
> Server:              | [_warp_](https://hackage.haskell.org/package/warp) 3.0.5.2
> Dependencies:        | [41](https://github.com/mietek/hello-wai/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-wai_](https://github.com/mietek/hello-wai)


#### `Main.hs`

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


### Usage

```
$ PORT=8080 hello-wai
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-wai-log" href="" title="Toggle">Toggle</a>
``` { #hello-wai-log .toggle }
$ halcyon install https://github.com/mietek/hello-wai
-----> Cloning https://github.com/mietek/hello-wai... done, d9ac7e3
-----> Installing hello-wai-1.0
-----> Determining constraints
       Label:                                    **hello-wai-1.0**
       Prefix:                                   **/app**
       Source hash:                              **71254c9**
       Constraints hash:                         **0a5566d**
       Magic hash:                               **5e25587**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       ...
       Installed wai-3.0.2.2
       Installed warp-3.0.5.2
-----> Sandbox built, 47MB
       Removing documentation from sandbox directory... done, 46MB
       Stripping sandbox directory... done, 40MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-0a5566d-hello-wai-1.0.tar.gz... done, 6.7MB

-----> Configuring app
-----> Building app
       Building hello-wai-1.0...
       Preprocessing executable 'hello-wai' for hello-wai-1.0...
       ...
       Linking dist/build/hello-wai/hello-wai ...
-----> App built, 6.2MB
       Stripping app... done, 5.0MB
-----> Archiving build directory
       Creating halcyon-build-hello-wai-1.0.tar.gz... done, 1.2MB

-----> Preparing install directory
-----> Install directory prepared, 4.7MB
-----> Archiving install directory
       Creating halcyon-install-71254c9-hello-wai-1.0.tar.gz... done, 1.1MB
-----> Installing app to /app
-----> Installed hello-wai-1.0

-----> App installed:                            **hello-wai-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-wai">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-wai">Deploy to Heroku</a>


_hello-wheb_
------------

> ---------------------|---
> Framework:           | [Wheb](https://hackage.haskell.org/package/Wheb) 0.3.1.0
> Server:              | [_warp_](https://hackage.haskell.org/package/warp) 3.0.5.2
> Dependencies:        | [100](https://github.com/mietek/hello-wheb/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-wheb_](https://github.com/mietek/hello-wheb)


#### `Main.hs`

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


### Usage

```
$ PORT=8080 hello-wheb
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-wheb-log" href="" title="Toggle">Toggle</a>
``` { #hello-wheb-log .toggle }
$ halcyon install https://github.com/mietek/hello-wheb
-----> Cloning https://github.com/mietek/hello-wheb... done, 416c5e4
-----> Installing hello-wheb-1.0
-----> Determining constraints
       Label:                                    **hello-wheb-1.0**
       Prefix:                                   **/app**
       Source hash:                              **8447f36**
       Constraints hash:                         **7716502**
       Magic hash:                               **e9c0c7f**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       ...
       Installed Wheb-0.3.1.0
       Installed warp-3.0.5.2
-----> Sandbox built, 148MB
       Removing documentation from sandbox directory... done, 147MB
       Stripping sandbox directory... done, 129MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-7716502-hello-wheb-1.0.tar.gz... done, 23MB

-----> Configuring app
-----> Building app
       Building hello-wheb-1.0...
       Preprocessing executable 'hello-wheb' for hello-wheb-1.0...
       ...
       Linking dist/build/hello-wheb/hello-wheb ...
-----> App built, 11MB
       Stripping app... done, 7.6MB
-----> Archiving build directory
       Creating halcyon-build-hello-wheb-1.0.tar.gz... done, 1.7MB

-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 7.1MB
-----> Archiving install directory
       Creating halcyon-install-8447f36-hello-wheb-1.0.tar.gz... done, 1.7MB
-----> Installing app to /app
-----> Installed hello-wheb-1.0

-----> App installed:                            **hello-wheb-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-wheb">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-wheb">Deploy to Heroku</a>


_hello-yesod_
-------------

> ---------------------|---
> Framework:           | [_yesod_](https://hackage.haskell.org/package/yesod) 1.4.1.3
> Server:              | [_warp_](https://hackage.haskell.org/package/warp) 3.0.5.2
> Dependencies:        | [148](https://github.com/mietek/hello-yesod/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | …
> App size:            | …
> Source code:         | [_hello-yesod_](https://github.com/mietek/hello-yesod)


#### `Main.hs`

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


### Usage

```
$ PORT=8080 hello-yesod
```


#### Installation

<div class="toggle">
<a class="toggle-button" data-target="hello-yesod-log" href="" title="Toggle">Toggle</a>
``` { #hello-yesod-log .toggle }
$ halcyon install https://github.com/mietek/hello-yesod
-----> Cloning https://github.com/mietek/hello-yesod... done, b77c84f
-----> Installing hello-yesod-1.0
-----> Determining constraints
       Label:                                    **hello-yesod-1.0**
       Prefix:                                   **/app**
       Source hash:                              **b8bfb6b**
       Constraints hash:                         **92699b8**
       Magic hash:                               **a943a2f**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC directory

-----> Using existing Cabal directory

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       ...
       Installed yesod-1.4.1.3
       Installed warp-3.0.5.2
-----> Sandbox built, 255MB
       Removing documentation from sandbox directory... done, 253MB
       Stripping sandbox directory... done, 220MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-92699b8-hello-yesod-1.0.tar.gz... done, 39MB

-----> Configuring app
-----> Building app
       Building hello-yesod-1.0...
       Preprocessing executable 'hello-yesod' for hello-yesod-1.0...
       ...
       Loading package yesod-1.4.1.3 ... linking ... done.
       Loading package warp-3.0.5.2 ... linking ... done.

       Main.hs:10:1: Warning:
           Defined but not used: type constructor or class ‘Widget’

       Main.hs:10:1: Warning: Defined but not used: ‘resourcesHello’
       Linking dist/build/hello-yesod/hello-yesod ...
-----> App built, 25MB
       Stripping app... done, 20MB
-----> Archiving build directory
       Creating halcyon-build-hello-yesod-1.0.tar.gz... done, 3.9MB

-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 19MB
-----> Archiving install directory
       Creating halcyon-install-b8bfb6b-hello-yesod-1.0.tar.gz... done, 3.8MB
-----> Installing app to /app
-----> Installed hello-yesod-1.0

-----> App installed:                            **hello-yesod-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-yesod">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-yesod">Deploy to Heroku</a>


<script src="https://www.google.com/jsapi"></script>
<script>
var rawResults = [
  ['hello-apiary',9,296,305,306,'76MB','9.6MB'],
  ['hello-happstack',10,250,256,258,'65MB','12MB'],
  ['hello-mflow',10,425,434,437,'155MB','21MB'],
  ['hello-miku',11,348,356,358,'85MB','13MB'],
  ['hello-scotty',10,348,356,358,'84MB','12MB'],
  ['hello-servant',11,385,393,395,'160MB','11MB'],
  ['hello-simple',11,362,369,371,'102MB','6.6MB'],
  ['hello-snap',10,320,326,327,'75MB','12MB'],
  ['hello-spock',11,365,376,378,'94MB','12MB'],
  ['hello-wai',11,248,253,254,'47MB','6.2MB'],
  ['hello-wheb',8,439,447,449,'148MB','11MB'],
  ['hello-yesod',11,684,698,700,'255MB','25MB']
];
var results = {};
rawResults.forEach(function (rawRow) {
  var name = rawRow[0];
  if (!(name in results)) {
    results[name] = {
      envTimes: [],
      sandboxTimes: [],
      appTimes: [],
      installTimes: [],
      sandboxSize: null,
      appSize: null
    };
  }
  results[name].envTimes.push(rawRow[1]);
  results[name].sandboxTimes.push(rawRow[2] - rawRow[1]);
  results[name].appTimes.push(rawRow[4] - rawRow[2]);
  results[name].installTimes.push(rawRow[4]);
  results[name].sandboxSize = rawRow[5];
  results[name].appSize = rawRow[6];
});
google.load("visualization", "1", { packages: ["corechart"] });
google.setOnLoadCallback(drawChart);
function mean(array) {
  return array.reduce(function (a, b) {
    return a + b;
  }) / array.length;
}
function low(array) {
  return Math.min.apply(null, array);
}
function high(array) {
  return Math.max.apply(null, array);
}
function fix(float) {
  return Math.round(float * 100) / 100;
}
function drawChart() {
  var data = new google.visualization.DataTable();
  var envName, sandboxName, appName;
  if (cannot.getLayout() === 'small') {
    envName = 'GHC and Cabal';
    sandboxName = 'Sandbox';
    appName = 'App';
  } else {
    envName = 'Restoring GHC and Cabal';
    sandboxName = 'Building sandbox';
    appName = 'Building and installing app';
  }
  data.addColumn('string', 'Name');
  data.addColumn('number', envName);
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'string', role: 'tooltip' });
  data.addColumn('number', sandboxName);
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'string', role: 'tooltip' });
  data.addColumn('number', appName);
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'string', role: 'tooltip' });
  Object.keys(results).forEach(function (name) {
    var result = results[name];
    var installMean = mean(result.installTimes);
    var installLow = low(result.installTimes);
    var installHigh = high(result.installTimes);
    var installValue = fix(installMean) + 's';
    if (installLow !== installHigh) {
      installValue += ' [' + installLow + 's, ' + installHigh + 's]';
    }
    var installTip = 'Total: ' + installValue;
    var envMean = mean(result.envTimes);
    var envLow = low(result.envTimes);
    var envHigh = high(result.envTimes);
    var envTip = 'Restoring GHC and Cabal: ' + fix(envMean) + 's';
    if (envLow !== envHigh) {
      envTip += ' [' + envLow + 's, ' + envHigh + 's]';
    }
    envTip += '\n' + installTip;
    var sandboxMean = mean(result.sandboxTimes);
    var sandboxLow = low(result.sandboxTimes);
    var sandboxHigh = high(result.sandboxTimes);
    var sandboxTip = 'Building sandbox: ' + fix(sandboxMean) + 's';
    if (sandboxLow !== sandboxHigh) {
      sandboxTip += ' [' + sandboxLow + 's, ' + sandboxHigh + 's]';
    }
    sandboxTip += '\n' + installTip;
    var appMean = mean(result.appTimes);
    var appLow = low(result.appTimes);
    var appHigh = high(result.appTimes);
    var appTip = 'Building and installing app: ' + fix(appMean) + 's';
    if (appLow !== appHigh) {
      appTip += ' [' + appLow + 's, ' + appHigh + 's]';
    }
    appTip += '\n' + installTip;
    data.addRow([name, envMean, envLow, envHigh, envTip, sandboxMean, sandboxLow, sandboxHigh, sandboxTip, appMean, appLow, appHigh, appTip]);
    var installTimeCell = '#' + name + ' tr:nth-of-type(4) td:nth-of-type(2)';
    var sandboxSizeCell = '#' + name + ' tr:nth-of-type(5) td:nth-of-type(2)';
    var appSizeCell = '#' + name + ' tr:nth-of-type(6) td:nth-of-type(2)';
    document.querySelectorAll(installTimeCell)[0].firstChild.nodeValue = installValue;
    document.querySelectorAll(sandboxSizeCell)[0].firstChild.nodeValue = result.sandboxSize;
    document.querySelectorAll(appSizeCell)[0].firstChild.nodeValue = result.appSize;
  });
  var options = {
    chartArea: {
      left: '33.33333333%',
      top: '4.545454545%',
      width: '100%',
      height: '90.90909091%'
    },
    colors: ['#6d6661', '#3f96f0', '#9e9792'],
    dataOpacity: 0.8,
    fontName: 'concourse-t3',
    fontSize: cannot.getFontSize() * 3/4,
    hAxis: {
      baselineColor: '#9e9792',
      format: '#s',
      gridlines: { color: '#cec7c2' },
      minValue: 0,
      maxValue: 600,
      textStyle: { color: '#6d6661' },
      viewWindowMode: 'maximized'
    },
    isStacked: true,
    legend: {
      position: 'top',
      textStyle: { color: '#6d6661' }
    },
    tooltip: {
      textStyle: { color: '#6d6661' },
      trigger: 'selection'
    },
    vAxis: {
      textStyle: {
        color: '#6d6661',
        italic: true
      }
    }
  };
  options.hAxis.ticks = [0, 120, 240, 360, 480, 600];
  var chart = new google.visualization.BarChart(document.getElementById('shootout-chart'));
  chart.draw(data, options);
}
addEventListener('load', function () {
  addEventListener('resize', drawChart);
});
</script>
