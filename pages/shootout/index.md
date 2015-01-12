---
title: “Hello, world!” shootout
page-class: tweak-listings
page-head: |
  <style>
    header a.link-shootout {
      color: #3f96f0;
    }
  </style>
---


“Hello, world!” shootout { .with-toc }
========================

Simple applications, intended to compare build times and sizes across most Haskell web frameworks.

<div><nav><ul class="toc menu open">
<li class="space"><a href="#shootout-results">Shootout results</a></li>
<li><a href="#hello-apiary"><i>hello-apiary</i></a></li>
<li><a href="#hello-happstack"><i>hello-happstack</i></a></li>
<li><a href="#hello-mflow"><i>hello-mflow</i></a></li>
<li><a href="#hello-miku"><i>hello-miku</i></a></li>
<li><a href="#hello-scotty"><i>hello-scotty</i></a></li>
<li><a href="#hello-simple"><i>hello-simple</i></a></li>
<li><a href="#hello-snap"><i>hello-snap</i></a></li>
<li><a href="#hello-spock"><i>hello-spock</i></a></li>
<li><a href="#hello-wai"><i>hello-wai</i></a></li>
<li><a href="#hello-wheb"><i>hello-wheb</i></a></li>
<li><a href="#hello-yesod"><i>hello-yesod</i></a></li>
</ul></nav></div>

For advanced applications, see the [examples](/examples/).

All examples can be installed in one command on regular machines running most recent Linux distributions.  [More…](/guide/#setting-up-a-machine)

Additionally, all examples can be deployed in one click to a new [DigitalOcean](https://digitalocean.com/) droplet, using the prototype [Haskell on DigitalOcean](https://halcyon.sh/deploy/) interface, or to the [Heroku](https://heroku.com/) web application platform, using the [Haskell on Heroku](https://haskellonheroku.com/) buildpack.


Shootout results
----------------

<div class="chart" id="shootout-chart"></div>


#### Comments

The time spent installing a Haskell application is dominated by building application dependencies.

Halcyon keeps application dependencies in a Cabal sandbox, and attempts to mitigate the impact of sandbox build times:

1. Once a sandbox directory is built, Halcyon archives it, and restores it during subsequent installations.

2. When building a new sandbox directory, Halcyon locates previously built sandboxes containing a subset of the required dependencies.  Each matching sandbox is assigned a score, and the highest scoring sandbox is used as a base for the new sandbox.

Moreover, Halcyon supports building the application incrementally, by archiving and restoring the build directory.  An installation involving an incremental build is expected to finish in under 30 seconds, plus actual build time.

If no build is needed, the application is restored from a previously archived install directory.  This allows installing most of the [example applications](/examples/) and shootout entries in under 10 seconds.


<aside>
<a class="micro face joe-nelson" href="https://twitter.com/begriffs/status/522811714325475329"></a>
<blockquote>_“Check out [Miëtek’s](#about) [Haskell on Heroku](https://haskellonheroku.com/) buildpack — it dynamically selects a pre-made Cabal sandbox for build speed.”_</blockquote>
<p>[— Joe Nelson](https://twitter.com/begriffs/status/522811714325475329), [inspiration](https://begriffs.com/posts/2013-08-22-haskell-on-heroku-omg-lets-get-this.html) for [Haskell on Heroku](https://haskellonheroku.com/)</p>
</aside>


### Methodology

The raw results are available as a [CSV file](https://gist.github.com/mietek/c37e9fba6290a96a926e).  To reproduce the results, perform a benchmark by using the included test script.

```
$ halcyon/test bench-shootout
...
hello-yesod,10,521,535,537,251MB,25MB
```

The columns included in the results are:

- Application name
- GHC and Cabal restore time
- Sandbox build time
- Application build time
- Application install time
- Sandbox size
- Application size

The test simulates installing each example for the first time, by forcing Halcyon to rebuild the sandbox and the application from scratch.  GHC and Cabal are restored from local cache.

The times given are _mean [low, high]_, calculated across 10 test runs.  Each test run consists of building all examples on an 8 GB DigitalOcean droplet, running Ubuntu 14.04.


_hello-apiary_
-----------------

> ---------------------|---
> Framework:           | [Apiary](https://github.com/philopon/apiary) 1.2.0
> Dependencies:        | [65](https://github.com/mietek/hello-apiary/blob/master/.halcyon/constraints) and _alex_ 3.1.3
> First build time:    | …
> Sandbox size:        | 81MB
> App size:            | 9.8MB
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

- _alex_, as a [sandbox extra app](/guide/#sandbox-extra-apps), with version constraints


### Usage

```
$ PORT=8080 hello-apiary
```

<div class="toggle">
<a class="toggle-button" data-target="hello-apiary-log" href="" title="Toggle">Toggle</a>
``` { #hello-apiary-log .toggle }
$ halcyon install https://github.com/mietek/hello-apiary
-----> Cloning https://github.com/mietek/hello-apiary... done, d97f2b3
-----> Determining constraints
-----> Installing app
       Label:                                    **hello-apiary-1.0**
       Source hash:                              **49d3c4f**
       Prefix:                                   **/app**
       Constraints hash:                         **f00c991**
       Magic hash:                               **075003b**
       External storage:                         **public**
       GHC version:                              **7.8.3**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**
       Sandbox magic hash:                       **ae3848d**
       Sandbox extra apps:                       **alex-3.1.3**

-----> Restoring GHC directory
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal directory
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-13.tar.gz... done, 174MB

-----> Building sandbox directory
-----> Creating sandbox
-----> Installing sandbox extra apps
       -----> Unpacking app
       -----> Installing app
              Label:                                    **alex-3.1.3**
              Source hash:                              **b3faab4**
              Prefix:                                   **/app/sandbox**
              External storage:                         **public**

       -----> Restoring install directory
              Extracting halcyon-install-b3faab4-alex-3.1.3.tar.gz... done, 2.5MB
       -----> Install directory restored
       -----> Installing app into /app/sandbox... done
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed apiary-1.2.0
-----> Sandbox built, 81MB
       Removing documentation from sandbox directory... done, 81MB
       Stripping sandbox directory... done, 70MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-f00c991.ae3848d-hello-apiary-1.0.tar.gz... done, 12MB

-----> Configuring app
-----> Building app
       Building hello-apiary-1.0...
       Preprocessing executable 'hello-apiary' for hello-apiary-1.0...
       ...
       Linking dist/build/hello-apiary/hello-apiary ...
-----> App built, 9.8MB
       Stripping app... done, 7.4MB
-----> Archiving build
       Creating halcyon-build-hello-apiary-1.0.tar.gz... done, 1.6MB

-----> Preparing install
       Including app
-----> Install prepared, 7.1MB
-----> Archiving install
       Creating halcyon-install-49d3c4f-hello-apiary-1.0.tar.gz... done, 1.6MB
-----> Installing app into /app... done

-----> App installed:                            **hello-apiary-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-apiary">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-apiary">Deploy to Heroku</a>


_hello-happstack_
-----------------

> ---------------------|---
> Framework:           | [Happstack](http://happstack.com/) Lite 7.3.5
> Dependencies:        | [44](https://github.com/mietek/hello-happstack/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | 65MB
> App size:            | 12MB
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

<div class="toggle">
<a class="toggle-button" data-target="hello-happstack-log" href="" title="Toggle">Toggle</a>
``` { #hello-happstack-log .toggle }
$ halcyon install https://github.com/mietek/hello-happstack
-----> Cloning https://github.com/mietek/hello-happstack... done, fa472e4
-----> Determining constraints
-----> Installing app
       Label:                                    **hello-happstack-1.0**
       Source hash:                              **fc844b0**
       Prefix:                                   **/app**
       Constraints hash:                         **c1c4c32**
       Magic hash:                               **5eba4ea**
       External storage:                         **public**
       GHC version:                              **7.8.3**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Restoring GHC directory
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal directory
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-13.tar.gz... done, 174MB

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed happstack-lite-7.3.5
-----> Sandbox built, 65MB
       Removing documentation from sandbox directory... done, 64MB
       Stripping sandbox directory... done, 55MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-c1c4c32-hello-happstack-1.0.tar.gz... done, 8.8MB

-----> Configuring app
-----> Building app
       Building hello-happstack-1.0...
       Preprocessing executable 'hello-happstack' for hello-happstack-1.0...
       ...
       Linking dist/build/hello-happstack/hello-happstack ...
-----> App built, 12MB
       Stripping app... done, 8.7MB
-----> Archiving build
       Creating halcyon-build-hello-happstack-1.0.tar.gz... done, 1.8MB

-----> Preparing install
       Including app
-----> Install prepared, 8.4MB
-----> Archiving install
       Creating halcyon-install-fc844b0-hello-happstack-1.0.tar.gz... done, 1.7MB
-----> Installing app into /app... done

-----> App installed:                            **hello-happstack-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-happstack">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-happstack">Deploy to Heroku</a>


_hello-mflow_
-------------

> ---------------------|---
> Framework:           | [MFlow](https://github.com/agocorona/MFlow) 0.4.5.9
> Dependencies:        | [106](https://github.com/mietek/hello-mflow/blob/master/.halcyon/constraints) and _cpphs_ 1.18.6
> First build time:    | …
> Sandbox size:        | 151MB
> App size:            | 20MB
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

- _cpphs_, as a [sandbox extra app](/guide/#sandbox-extra-apps), with version constraints


### Usage

```
$ PORT=8080 hello-mflow
```

<div class="toggle">
<a class="toggle-button" data-target="hello-mflow-log" href="" title="Toggle">Toggle</a>
``` { #hello-mflow-log .toggle }
$ halcyon install https://github.com/mietek/hello-mflow
-----> Cloning https://github.com/mietek/hello-mflow... done, ecf421a
-----> Determining constraints
-----> Installing app
       Label:                                    **hello-mflow-1.0**
       Source hash:                              **83ba62c**
       Prefix:                                   **/app**
       Constraints hash:                         **9eb1156**
       Magic hash:                               **015be62**
       External storage:                         **public**
       GHC version:                              **7.8.3**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**
       Sandbox magic hash:                       **0cda71a**
       Sandbox extra apps:                       **cpphs-1.18.6**

-----> Restoring GHC directory
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal directory
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-13.tar.gz... done, 174MB

-----> Building sandbox directory
-----> Creating sandbox
-----> Installing sandbox extra apps
       -----> Unpacking app
       -----> Installing app
              Label:                                    **cpphs-1.18.6**
              Source hash:                              **85c6517**
              Prefix:                                   **/app/sandbox**
              External storage:                         **public**

       -----> Restoring install directory
              Extracting halcyon-install-85c6517-cpphs-1.18.6.tar.gz... done, 3.2MB
       -----> Install directory restored
       -----> Installing app into /app/sandbox... done
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed MFlow-0.4.5.9
-----> Sandbox built, 151MB
       Removing documentation from sandbox directory... done, 150MB
       Stripping sandbox directory... done, 130MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-9eb1156.0cda71a-hello-mflow-1.0.tar.gz... done, 23MB

-----> Configuring app
-----> Building app
       Building hello-mflow-1.0...
       Preprocessing executable 'hello-mflow' for hello-mflow-1.0...
       ...
       Linking dist/build/hello-mflow/hello-mflow ...
-----> App built, 20MB
       Stripping app... done, 15MB
-----> Archiving build
       Creating halcyon-build-hello-mflow-1.0.tar.gz... done, 3.3MB

-----> Preparing install
       Including app
-----> Install prepared, 14MB
-----> Archiving install
       Creating halcyon-install-83ba62c-hello-mflow-1.0.tar.gz... done, 3.2MB
-----> Installing app into /app... done

-----> App installed:                            **hello-mflow-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-mflow">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-mflow">Deploy to Heroku</a>


_hello-miku_
------------

> ---------------------|---
> Framework:           | [_miku_](https://github.com/nfjinjing/miku) 2014.11.17
> Dependencies:        | [59](https://github.com/mietek/hello-miku/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | 84MB
> App size:            | 13MB
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

<div class="toggle">
<a class="toggle-button" data-target="hello-miku-log" href="" title="Toggle">Toggle</a>
``` { #hello-miku-log .toggle }
$ halcyon install https://github.com/mietek/hello-miku
-----> Cloning https://github.com/mietek/hello-miku... done, 1c95812
-----> Determining constraints
-----> Installing app
       Label:                                    **hello-miku-1.0**
       Source hash:                              **a8cbc37**
       Prefix:                                   **/app**
       Constraints hash:                         **957fb97**
       Magic hash:                               **4955c40**
       External storage:                         **public**
       GHC version:                              **7.8.3**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Restoring GHC directory
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal directory
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-13.tar.gz... done, 174MB

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed miku-2014.11.17
-----> Sandbox built, 84MB
       Removing documentation from sandbox directory... done, 84MB
       Stripping sandbox directory... done, 73MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-957fb97-hello-miku-1.0.tar.gz... done, 13MB

-----> Configuring app
-----> Building app
       Building hello-miku-1.0...
       Preprocessing executable 'hello-miku' for hello-miku-1.0...
       ...
       Linking dist/build/hello-miku/hello-miku ...
-----> App built, 13MB
       Stripping app... done, 11MB
-----> Archiving build
       Creating halcyon-build-hello-miku-1.0.tar.gz... done, 2.2MB

-----> Preparing install
       Including app
-----> Install prepared, 11MB
-----> Archiving install
       Creating halcyon-install-a8cbc37-hello-miku-1.0.tar.gz... done, 2.1MB
-----> Installing app into /app... done

-----> App installed:                            **hello-miku-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-miku">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-miku">Deploy to Heroku</a>


_hello-scotty_
--------------

> ---------------------|---
> Framework:           | [Scotty](https://github.com/scotty-web/scotty) 0.9.0
> Dependencies:        | [74](https://github.com/mietek/hello-scotty/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | 83MB
> App size:            | 12MB
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

<div class="toggle">
<a class="toggle-button" data-target="hello-scotty-log" href="" title="Toggle">Toggle</a>
``` { #hello-scotty-log .toggle }
$ halcyon install https://github.com/mietek/hello-scotty
-----> Cloning https://github.com/mietek/hello-scotty... done, 2412c2c
-----> Determining constraints
-----> Installing app
       Label:                                    **hello-scotty-1.0**
       Source hash:                              **9d43644**
       Prefix:                                   **/app**
       Constraints hash:                         **7535560**
       Magic hash:                               **26c4137**
       External storage:                         **public**
       GHC version:                              **7.8.3**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Restoring GHC directory
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal directory
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-13.tar.gz... done, 174MB

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed scotty-0.9.0
-----> Sandbox built, 83MB
       Removing documentation from sandbox directory... done, 82MB
       Stripping sandbox directory... done, 71MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-7535560-hello-scotty-1.0.tar.gz... done, 12MB

-----> Configuring app
-----> Building app
       Building hello-scotty-1.0...
       Preprocessing executable 'hello-scotty' for hello-scotty-1.0...
       ...
       Linking dist/build/hello-scotty/hello-scotty ...
-----> App built, 12MB
       Stripping app... done, 9.2MB
-----> Archiving build
       Creating halcyon-build-hello-scotty-1.0.tar.gz... done, 2.0MB

-----> Preparing install
       Including app
-----> Install prepared, 8.8MB
-----> Archiving install
       Creating halcyon-install-9d43644-hello-scotty-1.0.tar.gz... done, 2.0MB
-----> Installing app into /app... done

-----> App installed:                            **hello-scotty-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-scotty">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-scotty">Deploy to Heroku</a>


_hello-simple_
--------------

> ---------------------|---
> Framework:           | [Simple](http://simple.cx/) 0.10.0.2
> Dependencies:        | [70](https://github.com/mietek/hello-simple/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | 101MB
> App size:            | 6.4MB
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

<div class="toggle">
<a class="toggle-button" data-target="hello-simple-log" href="" title="Toggle">Toggle</a>
``` { #hello-simple-log .toggle }
$ halcyon install https://github.com/mietek/hello-simple
-----> Cloning https://github.com/mietek/hello-simple... done, 3dec3e1
-----> Determining constraints
-----> Installing app
       Label:                                    **hello-simple-1.0**
       Source hash:                              **7c42c3b**
       Prefix:                                   **/app**
       Constraints hash:                         **a63103a**
       Magic hash:                               **5b60565**
       External storage:                         **public**
       GHC version:                              **7.8.3**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Restoring GHC directory
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal directory
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-13.tar.gz... done, 174MB

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed simple-0.10.0.2
-----> Sandbox built, 101MB
       Removing documentation from sandbox directory... done, 100MB
       Stripping sandbox directory... done, 88MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-a63103a-hello-simple-1.0.tar.gz... done, 15MB

-----> Configuring app
-----> Building app
       Building hello-simple-1.0...
       Preprocessing executable 'hello-simple' for hello-simple-1.0...
       ...
       Linking dist/build/hello-simple/hello-simple ...
-----> App built, 6.4MB
       Stripping app... done, 5.1MB
-----> Archiving build
       Creating halcyon-build-hello-simple-1.0.tar.gz... done, 1.2MB

-----> Preparing install
       Including app
-----> Install prepared, 4.7MB
-----> Archiving install
       Creating halcyon-install-7c42c3b-hello-simple-1.0.tar.gz... done, 1.1MB
-----> Installing app into /app... done

-----> App installed:                            **hello-simple-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-simple">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-simple">Deploy to Heroku</a>


_hello-snap_
------------

> ---------------------|---
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> Dependencies:        | [42](https://github.com/mietek/hello-snap/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | 75MB
> App size:            | 12MB
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

<div class="toggle">
<a class="toggle-button" data-target="hello-snap-log" href="" title="Toggle">Toggle</a>
``` { #hello-snap-log .toggle }
$ halcyon install https://github.com/mietek/hello-snap
-----> Cloning https://github.com/mietek/hello-snap... done, b094ee3
-----> Determining constraints
-----> Installing app
       Label:                                    **hello-snap-1.0**
       Source hash:                              **bfb34c1**
       Prefix:                                   **/app**
       Constraints hash:                         **03695cd**
       Magic hash:                               **507dce2**
       External storage:                         **public**
       GHC version:                              **7.8.3**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Restoring GHC directory
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal directory
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-13.tar.gz... done, 174MB

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed snap-core-0.9.6.3
-----> Sandbox built, 75MB
       Removing documentation from sandbox directory... done, 75MB
       Stripping sandbox directory... done, 65MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-03695cd-hello-snap-1.0.tar.gz... done, 11MB

-----> Configuring app
-----> Building app
       Building hello-snap-1.0...
       Preprocessing executable 'hello-snap' for hello-snap-1.0...
       ...
       Linking dist/build/hello-snap/hello-snap ...
-----> App built, 12MB
       Stripping app... done, 9.4MB
-----> Archiving build
       Creating halcyon-build-hello-snap-1.0.tar.gz... done, 1.9MB

-----> Preparing install
       Including app
-----> Install prepared, 9.1MB
-----> Archiving install
       Creating halcyon-install-bfb34c1-hello-snap-1.0.tar.gz... done, 1.9MB
-----> Installing app into /app... done

-----> App installed:                            **hello-snap-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-snap">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-snap">Deploy to Heroku</a>


_hello-spock_
-------------

> ---------------------|---
> Framework:           | [Spock](https://github.com/agrafix/Spock) 0.7.5.1
> Dependencies:        | [79](https://github.com/mietek/hello-spock/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | 104MB
> App size:            | 12MB
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

<div class="toggle">
<a class="toggle-button" data-target="hello-spock-log" href="" title="Toggle">Toggle</a>
``` { #hello-spock-log .toggle }
$ halcyon install https://github.com/mietek/hello-spock
-----> Cloning https://github.com/mietek/hello-spock... done, 903811e
-----> Determining constraints
-----> Installing app
       Label:                                    **hello-spock-1.0**
       Source hash:                              **476305b**
       Prefix:                                   **/app**
       Constraints hash:                         **d33fb1e**
       Magic hash:                               **c6e8179**
       External storage:                         **public**
       GHC version:                              **7.8.3**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Restoring GHC directory
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal directory
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-13.tar.gz... done, 174MB

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed Spock-0.7.5.1
-----> Sandbox built, 104MB
       Removing documentation from sandbox directory... done, 103MB
       Stripping sandbox directory... done, 88MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-d33fb1e-hello-spock-1.0.tar.gz... done, 15MB

-----> Configuring app
-----> Building app
       Building hello-spock-1.0...
       Preprocessing executable 'hello-spock' for hello-spock-1.0...
       ...
       Linking dist/build/hello-spock/hello-spock ...
-----> App built, 12MB
       Stripping app... done, 9.2MB
-----> Archiving build
       Creating halcyon-build-hello-spock-1.0.tar.gz... done, 2.1MB

-----> Preparing install
       Including app
-----> Install prepared, 8.8MB
-----> Archiving install
       Creating halcyon-install-476305b-hello-spock-1.0.tar.gz... done, 2.0MB
-----> Installing app into /app... done

-----> App installed:                            **hello-spock-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-spock">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-spock">Deploy to Heroku</a>


_hello-wai_
-----------

> ---------------------|---
> Framework:           | [WAI](https://hackage.haskell.org/package/wai/) 3.0.2
> Dependencies:        | [38](https://github.com/mietek/hello-wai/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | 45MB
> App size:            | 6MB
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

<div class="toggle">
<a class="toggle-button" data-target="hello-wai-log" href="" title="Toggle">Toggle</a>
``` { #hello-wai-log .toggle }
$ halcyon install https://github.com/mietek/hello-wai
-----> Cloning https://github.com/mietek/hello-wai... done, 177928b
-----> Determining constraints
-----> Installing app
       Label:                                    **hello-wai-1.0**
       Source hash:                              **477b187**
       Prefix:                                   **/app**
       Constraints hash:                         **270c17b**
       Magic hash:                               **fb12fe6**
       External storage:                         **public**
       GHC version:                              **7.8.3**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Restoring GHC directory
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal directory
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-13.tar.gz... done, 174MB

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed wai-3.0.2
-----> Sandbox built, 45MB
       Removing documentation from sandbox directory... done, 44MB
       Stripping sandbox directory... done, 39MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-270c17b-hello-wai-1.0.tar.gz... done, 6.4MB

-----> Configuring app
-----> Building app
       Building hello-wai-1.0...
       Preprocessing executable 'hello-wai' for hello-wai-1.0...
       ...
       Linking dist/build/hello-wai/hello-wai ...
-----> App built, 6.0MB
       Stripping app... done, 4.8MB
-----> Archiving build
       Creating halcyon-build-hello-wai-1.0.tar.gz... done, 1.1MB

-----> Preparing install
       Including app
-----> Install prepared, 4.5MB
-----> Archiving install
       Creating halcyon-install-477b187-hello-wai-1.0.tar.gz... done, 1.1MB
-----> Installing app into /app... done

-----> App installed:                            **hello-wai-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-wai">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-wai">Deploy to Heroku</a>


_hello-wheb_
------------

> ---------------------|---
> Framework:           | [Wheb](https://github.com/hansonkd/Wheb-Framework) 0.3.1.0
> Dependencies:        | [98](https://github.com/mietek/hello-wheb/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | 146MB
> App size:            | 9.9MB
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

<div class="toggle">
<a class="toggle-button" data-target="hello-wheb-log" href="" title="Toggle">Toggle</a>
``` { #hello-wheb-log .toggle }
$ halcyon install https://github.com/mietek/hello-wheb
-----> Cloning https://github.com/mietek/hello-wheb... done, fb508d2
-----> Determining constraints
-----> Installing app
       Label:                                    **hello-wheb-1.0**
       Source hash:                              **4853ba3**
       Prefix:                                   **/app**
       Constraints hash:                         **410ca91**
       Magic hash:                               **96decc3**
       External storage:                         **public**
       GHC version:                              **7.8.3**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Restoring GHC directory
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal directory
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-13.tar.gz... done, 174MB

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed Wheb-0.3.1.0
-----> Sandbox built, 146MB
       Removing documentation from sandbox directory... done, 145MB
       Stripping sandbox directory... done, 128MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-410ca91-hello-wheb-1.0.tar.gz... done, 22MB

-----> Configuring app
-----> Building app
       Building hello-wheb-1.0...
       Preprocessing executable 'hello-wheb' for hello-wheb-1.0...
       ...
       Linking dist/build/hello-wheb/hello-wheb ...
-----> App built, 9.9MB
       Stripping app... done, 7.5MB
-----> Archiving build
       Creating halcyon-build-hello-wheb-1.0.tar.gz... done, 1.7MB

-----> Preparing install
       Including app
-----> Install prepared, 7.0MB
-----> Archiving install
       Creating halcyon-install-4853ba3-hello-wheb-1.0.tar.gz... done, 1.6MB
-----> Installing app into /app... done

-----> App installed:                            **hello-wheb-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-wheb">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-wheb">Deploy to Heroku</a>


_hello-yesod_
-------------

> ---------------------|---
> Framework:           | [Yesod](http://yesodweb.com/) 1.4.1.1
> Dependencies:        | [146](https://github.com/mietek/hello-yesod/blob/master/.halcyon/constraints)
> First build time:    | …
> Sandbox size:        | 251MB
> App size:            | 25MB
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

<div class="toggle">
<a class="toggle-button" data-target="hello-yesod-log" href="" title="Toggle">Toggle</a>
``` { #hello-yesod-log .toggle }
$ halcyon install https://github.com/mietek/hello-yesod
-----> Cloning https://github.com/mietek/hello-yesod... done, f51baad
-----> Determining constraints
-----> Installing app
       Label:                                    **hello-yesod-1.0**
       Source hash:                              **0169a27**
       Prefix:                                   **/app**
       Constraints hash:                         **141ed8a**
       Magic hash:                               **de65792**
       External storage:                         **public**
       GHC version:                              **7.8.3**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Restoring GHC directory
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Restoring Cabal directory
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-13.tar.gz... done, 174MB

-----> Building sandbox directory
-----> Creating sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed yesod-1.4.1.1
-----> Sandbox built, 251MB
       Removing documentation from sandbox directory... done, 250MB
       Stripping sandbox directory... done, 217MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-141ed8a-hello-yesod-1.0.tar.gz... done, 38MB

-----> Configuring app
-----> Building app
       Building hello-yesod-1.0...
       Preprocessing executable 'hello-yesod' for hello-yesod-1.0...
       ...
       Loading package yesod-1.4.1.1 ... linking ... done.

       Main.hs:10:1: Warning:
           Defined but not used: type constructor or class ‘Widget’

       Main.hs:10:1: Warning: Defined but not used: ‘resourcesHello’
       Linking dist/build/hello-yesod/hello-yesod ...
-----> App built, 25MB
       Stripping app... done, 20MB
-----> Archiving build
       Creating halcyon-build-hello-yesod-1.0.tar.gz... done, 3.9MB

-----> Preparing install
       Including app
-----> Install prepared, 19MB
-----> Archiving install
       Creating halcyon-install-0169a27-hello-yesod-1.0.tar.gz... done, 3.7MB
-----> Installing app into /app... done

-----> App installed:                            **hello-yesod-1.0**
```
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hello-yesod">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hello-yesod">Deploy to Heroku</a>


<script src="https://www.google.com/jsapi"></script>
<script>
var rawResults = [
  ['hello-apiary',8,291,298,299,'81MB','9.8MB'],
  ['hello-happstack',8,233,240,241,'65MB','12MB'],
  ['hello-mflow',9,349,359,361,'151MB','20MB'],
  ['hello-miku',6,301,308,309,'84MB','13MB'],
  ['hello-scotty',7,277,285,286,'83MB','12MB'],
  ['hello-simple',6,292,297,299,'101MB','6.4MB'],
  ['hello-snap',7,270,276,277,'75MB','12MB'],
  ['hello-spock',5,289,295,296,'104MB','12MB'],
  ['hello-wai',8,234,240,241,'45MB','6.0MB'],
  ['hello-wheb',6,316,324,326,'146MB','9.9MB'],
  ['hello-yesod',8,509,521,522,'251MB','25MB'],

  ['hello-apiary',6,254,259,260,'81MB','9.8MB'],
  ['hello-happstack',7,201,207,209,'65MB','12MB'],
  ['hello-mflow',7,319,328,330,'151MB','20MB'],
  ['hello-miku',6,282,290,291,'84MB','13MB'],
  ['hello-scotty',7,271,277,279,'83MB','12MB'],
  ['hello-simple',7,292,299,300,'101MB','6.4MB'],
  ['hello-snap',6,266,272,274,'75MB','12MB'],
  ['hello-spock',7,288,295,297,'104MB','12MB'],
  ['hello-wai',6,209,214,215,'45MB','6.0MB'],
  ['hello-wheb',7,302,309,311,'146MB','9.9MB'],
  ['hello-yesod',6,505,518,520,'251MB','25MB'],

  ['hello-apiary',9,268,274,275,'81MB','9.8MB'],
  ['hello-happstack',7,204,210,211,'65MB','12MB'],
  ['hello-mflow',8,324,334,336,'151MB','20MB'],
  ['hello-miku',8,288,295,296,'84MB','13MB'],
  ['hello-scotty',7,285,294,295,'83MB','12MB'],
  ['hello-simple',8,290,296,298,'101MB','6.4MB'],
  ['hello-snap',7,284,290,291,'75MB','12MB'],
  ['hello-spock',8,292,299,301,'104MB','12MB'],
  ['hello-wai',5,217,223,225,'45MB','6.0MB'],
  ['hello-wheb',8,317,324,325,'146MB','9.9MB'],
  ['hello-yesod',7,520,533,535,'251MB','25MB'],

  ['hello-apiary',7,299,305,307,'81MB','9.8MB'],
  ['hello-happstack',8,228,234,235,'65MB','12MB'],
  ['hello-mflow',8,325,333,335,'151MB','20MB'],
  ['hello-miku',8,306,313,314,'84MB','13MB'],
  ['hello-scotty',7,281,286,287,'83MB','12MB'],
  ['hello-simple',8,307,313,314,'101MB','6.4MB'],
  ['hello-snap',6,288,295,296,'75MB','12MB'],
  ['hello-spock',6,299,307,308,'104MB','12MB'],
  ['hello-wai',7,240,247,249,'45MB','6.0MB'],
  ['hello-wheb',9,355,364,365,'146MB','9.9MB'],
  ['hello-yesod',8,574,590,592,'251MB','25MB'],

  ['hello-apiary',9,302,309,310,'81MB','9.8MB'],
  ['hello-happstack',9,235,241,243,'65MB','12MB'],
  ['hello-mflow',8,361,371,373,'151MB','20MB'],
  ['hello-miku',7,338,347,349,'84MB','13MB'],
  ['hello-scotty',9,325,333,334,'83MB','12MB'],
  ['hello-simple',9,351,357,358,'101MB','6.4MB'],
  ['hello-snap',9,350,357,358,'75MB','12MB'],
  ['hello-spock',8,350,357,359,'104MB','12MB'],
  ['hello-wai',10,274,281,282,'45MB','6.0MB'],
  ['hello-wheb',7,360,369,370,'146MB','9.9MB'],
  ['hello-yesod',9,605,619,621,'251MB','25MB'],

  ['hello-apiary',9,305,312,314,'81MB','9.8MB'],
  ['hello-happstack',8,252,257,259,'65MB','12MB'],
  ['hello-mflow',7,352,360,362,'151MB','20MB'],
  ['hello-miku',9,357,363,365,'84MB','13MB'],
  ['hello-scotty',9,319,326,327,'83MB','12MB'],
  ['hello-simple',10,334,342,344,'101MB','6.4MB'],
  ['hello-snap',8,325,333,335,'75MB','12MB'],
  ['hello-spock',8,336,346,347,'104MB','12MB'],
  ['hello-wai',9,265,272,273,'45MB','6.0MB'],
  ['hello-wheb',8,353,362,364,'146MB','9.9MB'],
  ['hello-yesod',9,582,596,597,'251MB','25MB'],

  ['hello-apiary',7,285,293,294,'81MB','9.8MB'],
  ['hello-happstack',8,238,246,248,'65MB','12MB'],
  ['hello-mflow',6,360,370,372,'151MB','20MB'],
  ['hello-miku',10,337,344,345,'84MB','13MB'],
  ['hello-scotty',9,311,318,319,'83MB','12MB'],
  ['hello-simple',10,354,362,363,'101MB','6.4MB'],
  ['hello-snap',10,348,357,358,'75MB','12MB'],
  ['hello-spock',7,326,332,333,'104MB','12MB'],
  ['hello-wai',7,266,272,273,'45MB','6.0MB'],
  ['hello-wheb',8,353,362,364,'146MB','9.9MB'],
  ['hello-yesod',8,572,587,588,'251MB','25MB'],

  ['hello-apiary',8,300,307,309,'81MB','9.8MB'],
  ['hello-happstack',8,231,239,240,'65MB','12MB'],
  ['hello-mflow',8,339,346,347,'151MB','20MB'],
  ['hello-miku',6,309,314,315,'84MB','13MB'],
  ['hello-scotty',6,315,322,323,'83MB','12MB'],
  ['hello-simple',7,362,370,371,'101MB','6.4MB'],
  ['hello-snap',9,329,337,339,'75MB','12MB'],
  ['hello-spock',10,326,334,336,'104MB','12MB'],
  ['hello-wai',7,249,254,255,'45MB','6.0MB'],
  ['hello-wheb',10,350,358,360,'146MB','9.9MB'],
  ['hello-yesod',9,560,574,576,'251MB','25MB'],

  ['hello-apiary',8,294,303,304,'81MB','9.8MB'],
  ['hello-happstack',8,219,226,227,'65MB','12MB'],
  ['hello-mflow',8,339,348,350,'151MB','20MB'],
  ['hello-miku',7,301,308,310,'84MB','13MB'],
  ['hello-scotty',10,280,288,289,'83MB','12MB'],
  ['hello-simple',7,296,300,302,'101MB','6.4MB'],
  ['hello-snap',7,272,279,280,'75MB','12MB'],
  ['hello-spock',7,291,300,301,'104MB','12MB'],
  ['hello-wai',9,223,229,230,'45MB','6.0MB'],
  ['hello-wheb',8,319,325,326,'146MB','9.9MB'],
  ['hello-yesod',7,531,544,545,'251MB','25MB'],

  ['hello-apiary',9,260,265,266,'81MB','9.8MB'],
  ['hello-happstack',7,206,213,215,'65MB','12MB'],
  ['hello-mflow',8,334,343,344,'151MB','20MB'],
  ['hello-miku',8,288,295,296,'84MB','13MB'],
  ['hello-scotty',9,275,283,284,'83MB','12MB'],
  ['hello-simple',9,295,301,302,'101MB','6.4MB'],
  ['hello-snap',8,282,287,288,'75MB','12MB'],
  ['hello-spock',8,295,303,304,'104MB','12MB'],
  ['hello-wai',7,221,225,226,'45MB','6.0MB'],
  ['hello-wheb',8,323,330,332,'146MB','9.9MB'],
  ['hello-yesod',10,521,535,537,'251MB','25MB']
];
var results = {};
rawResults.forEach(function (rawRow) {
  var name = rawRow[0];
  if (!(name in results)) {
    results[name] = {
      envTimes: [],
      sandboxTimes: [],
      appTimes: [],
      installTimes: []
    };
  }
  results[name].envTimes.push(rawRow[1]);
  results[name].sandboxTimes.push(rawRow[2] - rawRow[1]);
  results[name].appTimes.push(rawRow[4] - rawRow[2]);
  results[name].installTimes.push(rawRow[4]);
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
    appName = 'Application';
  } else {
    envName = 'Restoring GHC and Cabal';
    sandboxName = 'Building sandbox';
    appName = 'Building and installing application';
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
    var appTip = 'Building and installing application: ' + fix(appMean) + 's';
    if (appLow !== appHigh) {
      appTip += ' [' + appLow + 's, ' + appHigh + 's]';
    }
    appTip += '\n' + installTip;
    data.addRow([name, envMean, envLow, envHigh, envTip, sandboxMean, sandboxLow, sandboxHigh, sandboxTip, appMean, appLow, appHigh, appTip]);
    var sel = '#' + name + ' tr:nth-of-type(3) td:nth-of-type(2)';
    document.querySelectorAll(sel)[0].firstChild.nodeValue = installValue;
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
  if (cannot.getLayout() === 'small') {
    options.hAxis.ticks = [0, 120, 240, 360, 480];
  } else {
    options.hAxis.ticks = [0, 60, 120, 180, 240, 300, 360, 420, 480, 540];
  }
  var chart = new google.visualization.BarChart(document.getElementById('shootout-chart'));
  chart.draw(data, options);
}
addEventListener('load', function () {
  addEventListener('resize', drawChart);
});
</script>
