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


“Hello, world!” shootout
========================

Simple applications, intended to compare build times and sizes across most Haskell web frameworks.

- [_hello-happstack_](#hello-happstack)
- [_hello-mflow_](#hello-mflow)
- [_hello-miku_](#hello-miku)
- [_hello-scotty_](#hello-scotty)
- [_hello-simple_](#hello-simple)
- [_hello-snap_](#hello-snap)
- [_hello-spock_](#hello-spock)
- [_hello-wai_](#hello-wai)
- [_hello-wheb_](#hello-wheb)
- [_hello-yesod_](#hello-yesod)

For more advanced applications, see the [examples](/examples/).


### Test results

<div class="chart" id="shootout-chart"></div>


#### Test methodology

Every time each example was deployed, the sandbox and the application were built from scratch.  Each run was repeated 10 times, and a [very small shell script](https://gist.github.com/mietek/8c24c84e84714de5b558) was used to collect the results.

The test simulates deploying an application for the first time, with no [sandbox layer](/guide/#sandbox-layer) archive, [build directory](/guide/#build-directory) archive, or [install directory](/guide/#install-directory) archive available to restore.  In normal operation, deploying each example is expected to take less than 10 seconds.

All times were measured on a [DigitalOcean](https://digitalocean.com/) instance with 8GB of memory, 4 logical cores, and SSD storage, running Ubuntu 14.04 LTS (`x86_64`).


_hello-happstack_
-----------------

> ---------------------|---
> Framework:           | [Happstack](http://happstack.com/) Lite 7.3.5
> Dependencies:        | [44](https://github.com/mietek/hello-happstack/blob/master/cabal.config)
> Mean first deploy time:   | …
> Sandbox size:        | 64MB
> App size:            | 12MB
> Source code:         | [_hello-happstack_](https://github.com/mietek/hello-happstack/)


### `Main.hs`

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


#### First deploy log

<div class="toggle">
<a class="toggle-button" data-target="hello-happstack-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-happstack-deploy"><code>$ halcyon deploy <a href="https://github.com/mietek/hello-happstack/">https://github.com/mietek/hello-happstack</a>
-----> Cloning https://github.com/mietek/hello-happstack... done, 5f636e6
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-happstack-1.0</b>
       Source hash:                              <b>f586f68</b>
       Constraints hash:                         <b>5e34a95</b>
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>

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
       ...
       Linking dist/build/hello-happstack/hello-happstack ...
-----> App built, 12MB
       Stripping app... done, 8.7MB
-----> Archiving build
       Creating halcyon-app-build-hello-happstack-1.0.tar.gz... done, 1.8MB

-----> Preparing install
       Copying app
-----> Install prepared, 8.4MB
-----> Archiving install
       Creating halcyon-app-install-f586f68-hello-happstack-1.0.tar.gz... done, 1.7MB
-----> Installing app into /app... done, 8.4MB

-----> App deployed:                             <b>hello-happstack-1.0</b>
</code></pre>
</div>


_hello-mflow_
-------------

> ---------------------|---
> Framework:           | [MFlow](https://github.com/agocorona/MFlow/) 0.4.5.9
> Dependencies:        | [106](https://github.com/mietek/hello-mflow/blob/master/cabal.config) and _cpphs_ 1.18.6
> Mean first deploy time:   | …
> Sandbox size:        | 152MB
> App size:            | 20MB
> Source code:         | [_hello-mflow_](https://github.com/mietek/hello-mflow/)


#### Notable features

Declares a build-time dependency on _cpphs_ by including the [`sandbox-extra-apps`](/reference/#halcyon_sandbox_extra_apps) and [`sandbox-extra-apps-constraints`](/reference/#halcyon_sandbox_extra_apps_constraints) magic files in the [`.halcyon-magic`](https://github.com/mietek/hello-mflow/tree/master/.halcyon-magic) directory.


### `Main.hs`

<div class="toggle">
<a class="toggle-button open" data-target="hello-mflow-source" href="" title="Toggle">Toggle</a>
<pre class="toggle open textmate-source" id="hello-mflow-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">MFlow.Wai.Blaze.Html.All</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span>
    runNavigation <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>hello<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> transientNav <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      page <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">++></span> empty</span></code></pre>
</div>


#### First deploy log

<div class="toggle">
<a class="toggle-button" data-target="hello-mflow-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-mflow-deploy"><code>$ halcyon deploy <a href="https://github.com/mietek/hello-mflow/">https://github.com/mietek/hello-mflow</a>
-----> Cloning https://github.com/mietek/hello-mflow... done, b017876
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-mflow-1.0</b>
       Source hash:                              <b>2ae4e5f</b>
       Constraints hash:                         <b>dc98a41</b>
       Magic hash:                               <b>8f018d2</b>
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>
       Sandbox magic hash:                       <b>8f018d2</b>
       Sandbox extra apps:                       <b>cpphs-1.18.6</b>

-----> Building sandbox layer
-----> Creating sandbox
       Writing a default package environment file to
       /app/sandbox/cabal.sandbox.config
       Creating a new sandbox at /app/sandbox
-----> Deploying sandbox extra apps
       -----> Unpacking app
       -----> Deploying app from install
              Prefix:                                   <b>/app/sandbox</b>
              Label:                                    <b>cpphs-1.18.6</b>
              Source hash:                              <b>f93a89d</b>
              External storage:                         <b>public</b>

       -----> Restoring install
              Extracting halcyon-install-f93a89d-cpphs-1.18.6.tar.gz... done, 3.2MB
       -----> Install restored
       -----> Installing app into /app/sandbox... done, 3.2MB
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
       ...
       Linking dist/build/hello-mflow/hello-mflow ...
-----> App built, 20MB
       Stripping app... done, 15MB
-----> Archiving build
       Creating halcyon-app-build-hello-mflow-1.0.tar.gz... done, 3.3MB

-----> Preparing install
       Copying app
-----> Install prepared, 15MB
-----> Archiving install
       Creating halcyon-app-install-2ae4e5f-hello-mflow-1.0.tar.gz... done, 3.3MB
-----> Installing app into /app... done, 15MB

-----> App deployed:                             <b>hello-mflow-1.0</b>
</code></pre>
</div>


_hello-miku_
------------

> ---------------------|---
> Framework:           | [_miku_](https://github.com/nfjinjing/miku/) 2014.5.19
> Dependencies:        | [59](https://github.com/mietek/hello-miku/blob/master/cabal.config)
> Mean first deploy time:   | …
> Sandbox size:        | 84MB
> App size:            | 13MB
> Source code:         | [_hello-miku_](https://github.com/mietek/hello-miku/)


### `Main.hs`

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


#### First deploy log

<div class="toggle">
<a class="toggle-button" data-target="hello-miku-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-miku-deploy"><code>$ halcyon deploy <a href="https://github.com/mietek/hello-miku/">https://github.com/mietek/hello-miku</a>
-----> Cloning https://github.com/mietek/hello-miku... done, cdfe7f8
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-miku-1.0</b>
       Source hash:                              <b>0adfaa5</b>
       Constraints hash:                         <b>3fa23e0</b>
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>

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
       ...
       Linking dist/build/hello-miku/hello-miku ...
-----> App built, 13MB
       Stripping app... done, 11MB
-----> Archiving build
       Creating halcyon-app-build-hello-miku-1.0.tar.gz... done, 2.1MB

-----> Preparing install
       Copying app
-----> Install prepared, 11MB
-----> Archiving install
       Creating halcyon-app-install-0adfaa5-hello-miku-1.0.tar.gz... done, 2.1MB
-----> Installing app into /app... done, 11MB

-----> App deployed:                             <b>hello-miku-1.0</b>
</code></pre>
</div>


_hello-scotty_
--------------

> ---------------------|---
> Framework:           | [Scotty](https://github.com/scotty-web/scotty/) 0.9.0
> Dependencies:        | [74](https://github.com/mietek/hello-scotty/blob/master/cabal.config)
> Mean first deploy time:   | …
> Sandbox size:        | 83MB
> App size:            | 12MB
> Source code:         | [_hello-scotty_](https://github.com/mietek/hello-scotty/)


### `Main.hs`

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


#### First deploy log

<div class="toggle">
<a class="toggle-button" data-target="hello-scotty-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-scotty-deploy"><code>$ halcyon deploy <a href="https://github.com/mietek/hello-scotty/">https://github.com/mietek/hello-scotty</a>
-----> Cloning https://github.com/mietek/hello-scotty... done, 030e912
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-scotty-1.0</b>
       Source hash:                              <b>e360666</b>
       Constraints hash:                         <b>7c013f9</b>
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>

-----> Building sandbox layer
-----> Creating sandbox
       Writing a default package environment file to
       /app/sandbox/cabal.sandbox.config
       Creating a new sandbox at /app/sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed scotty-0.9.0
-----> Sandbox built, 83MB
       Removing documentation from sandbox layer... done, 82MB
       Stripping sandbox layer... done, 71MB
-----> Archiving sandbox layer
       Creating halcyon-sandbox-7c013f9-hello-scotty-1.0.tar.gz... done, 12MB

-----> Configuring app
       Resolving dependencies...
       Configuring hello-scotty-1.0...
-----> Building app
       Building hello-scotty-1.0...
       Preprocessing executable 'hello-scotty' for hello-scotty-1.0...
       ...
       Linking dist/build/hello-scotty/hello-scotty ...
-----> App built, 12MB
       Stripping app... done, 9.1MB
-----> Archiving build
       Creating halcyon-app-build-hello-scotty-1.0.tar.gz... done, 2.0MB

-----> Preparing install
       Copying app
-----> Install prepared, 8.7MB
-----> Archiving install
       Creating halcyon-app-install-e360666-hello-scotty-1.0.tar.gz... done, 1.9MB
-----> Installing app into /app... done, 8.7MB

-----> App deployed:                             <b>hello-scotty-1.0</b>
</code></pre>
</div>


_hello-simple_
--------------

> ---------------------|---
> Framework:           | [Simple](http://simple.cx/) 0.10.0.2
> Dependencies:        | [70](https://github.com/mietek/hello-simple/blob/master/cabal.config)
> Mean first deploy time:   | …
> Sandbox size:        | 100MB
> App size:            | 7MB
> Source code:         | [_hello-simple_](https://github.com/mietek/hello-simple/)


### `Main.hs`

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


#### First deploy log

<div class="toggle">
<a class="toggle-button" data-target="hello-simple-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-simple-deploy"><code>$ halcyon deploy <a href="https://github.com/mietek/hello-simple/">https://github.com/mietek/hello-simple</a>
-----> Cloning https://github.com/mietek/hello-simple... done, 636e97b
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-simple-1.0</b>
       Source hash:                              <b>5c51416</b>
       Constraints hash:                         <b>90de8cd</b>
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>

-----> Building sandbox layer
-----> Creating sandbox
       Writing a default package environment file to
       /app/sandbox/cabal.sandbox.config
       Creating a new sandbox at /app/sandbox
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       ...
       Installed simple-0.10.0.2
-----> Sandbox built, 100MB
       Removing documentation from sandbox layer... done, 100MB
       Stripping sandbox layer... done, 88MB
-----> Archiving sandbox layer
       Creating halcyon-sandbox-90de8cd-hello-simple-1.0.tar.gz... done, 15MB

-----> Configuring app
       Resolving dependencies...
       Configuring hello-simple-1.0...
-----> Building app
       Building hello-simple-1.0...
       Preprocessing executable 'hello-simple' for hello-simple-1.0...
       ...
       Linking dist/build/hello-simple/hello-simple ...
-----> App built, 6.4MB
       Stripping app... done, 5.1MB
-----> Archiving build
       Creating halcyon-app-build-hello-simple-1.0.tar.gz... done, 1.2MB

-----> Preparing install
       Copying app
-----> Install prepared, 4.7MB
-----> Archiving install
       Creating halcyon-app-install-5c51416-hello-simple-1.0.tar.gz... done, 1.1MB
-----> Installing app into /app... done, 4.7MB

-----> App deployed:                             <b>hello-simple-1.0</b>
</code></pre>
</div>


_hello-snap_
------------

> ---------------------|---
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> Dependencies:        | [42](https://github.com/mietek/hello-snap/blob/master/cabal.config)
> Mean first deploy time:   | …
> Sandbox size:        | 69MB
> App size:            | 11MB
> Source code:         | [_hello-snap_](https://github.com/mietek/hello-snap/)


### `Main.hs`

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


#### First deploy log

<div class="toggle">
<a class="toggle-button" data-target="hello-snap-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-snap-deploy"><code>$ halcyon deploy <a href="https://github.com/mietek/hello-snap/">https://github.com/mietek/hello-snap</a>
-----> Cloning https://github.com/mietek/hello-snap... done, bd5d822
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-snap-1.0</b>
       Source hash:                              <b>9d0aa61</b>
       Constraints hash:                         <b>4531dbe</b>
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>

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
       ...
       Linking dist/build/hello-snap/hello-snap ...
-----> App built, 11MB
       Stripping app... done, 9.1MB
-----> Archiving build
       Creating halcyon-app-build-hello-snap-1.0.tar.gz... done, 1.9MB

-----> Preparing install
       Copying app
-----> Install prepared, 8.9MB
-----> Archiving install
       Creating halcyon-app-install-9d0aa61-hello-snap-1.0.tar.gz... done, 1.8MB
-----> Installing app into /app... done, 8.9MB

-----> App deployed:                             <b>hello-snap-1.0</b>
</code></pre>
</div>


_hello-spock_
-------------

> ---------------------|---
> Framework:           | [Spock](https://github.com/agrafix/Spock/) 0.7.4.0
> Dependencies:        | [80](https://github.com/mietek/hello-spock/blob/master/cabal.config)
> Mean first deploy time:   | …
> Sandbox size:        | 107MB
> App size:            | 12MB
> Source code:         | [_hello-spock_](https://github.com/mietek/hello-spock/)


### `Main.hs`

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


#### First deploy log

<div class="toggle">
<a class="toggle-button" data-target="hello-spock-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-spock-deploy"><code>$ halcyon deploy <a href="https://github.com/mietek/hello-spock/">https://github.com/mietek/hello-spock</a>
-----> Cloning https://github.com/mietek/hello-spock... done, 9ff86ed
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-spock-1.0</b>
       Source hash:                              <b>0f869b0</b>
       Constraints hash:                         <b>d716519</b>
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>

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
       ...
       Linking dist/build/hello-spock/hello-spock ...
-----> App built, 12MB
       Stripping app... done, 9.2MB
-----> Archiving build
       Creating halcyon-app-build-hello-spock-1.0.tar.gz... done, 2.1MB

-----> Preparing install
       Copying app
-----> Install prepared, 8.7MB
-----> Archiving install
       Creating halcyon-app-install-0f869b0-hello-spock-1.0.tar.gz... done, 2.0MB
-----> Installing app into /app... done, 8.7MB

-----> App deployed:                             <b>hello-spock-1.0</b>
</code></pre>
</div>


_hello-wai_
-----------

> ---------------------|---
> Framework:           | [WAI](https://hackage.haskell.org/package/wai/) 3.0.2
> Dependencies:        | [38](https://github.com/mietek/hello-wai/blob/master/cabal.config)
> Mean first deploy time:   | …
> Sandbox size:        | 45MB
> App size:            | 6MB
> Source code:         | [_hello-wai_](https://github.com/mietek/hello-wai/)


### `Main.hs`

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


#### First deploy log

<div class="toggle">
<a class="toggle-button" data-target="hello-wai-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-wai-deploy"><code>$ halcyon deploy <a href="https://github.com/mietek/hello-wai/">https://github.com/mietek/hello-wai</a>
-----> Cloning https://github.com/mietek/hello-wai... done, eb087bc
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-wai-1.0</b>
       Source hash:                              <b>3c97959</b>
       Constraints hash:                         <b>799b066</b>
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>

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
       ...
       Linking dist/build/hello-wai/hello-wai ...
-----> App built, 5.9MB
       Stripping app... done, 4.8MB
-----> Archiving build
       Creating halcyon-app-build-hello-wai-1.0.tar.gz... done, 1.1MB

-----> Preparing install
       Copying app
-----> Install prepared, 4.5MB
-----> Archiving install
       Creating halcyon-app-install-3c97959-hello-wai-1.0.tar.gz... done, 1.1MB
-----> Installing app into /app... done, 4.5MB

-----> App deployed:                             <b>hello-wai-1.0</b>
</code></pre>
</div>


_hello-wheb_
------------

> ---------------------|---
> Framework:           | [Wheb](https://github.com/hansonkd/Wheb-Framework/) 0.3.1.0
> Dependencies:        | [98](https://github.com/mietek/hello-wheb/blob/master/cabal.config)
> Mean first deploy time:   | …
> Sandbox size:        | 146MB
> App size:            | 10MB
> Source code:         | [_hello-wheb_](https://github.com/mietek/hello-wheb/)


### `Main.hs`

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


#### First deploy log

<div class="toggle">
<a class="toggle-button" data-target="hello-wheb-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-wheb-deploy"><code>$ halcyon deploy <a href="https://github.com/mietek/hello-wheb/">https://github.com/mietek/hello-wheb</a>
-----> Cloning https://github.com/mietek/hello-wheb... done, 521623f
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-wheb-1.0</b>
       Source hash:                              <b>1688650</b>
       Constraints hash:                         <b>cd0692c</b>
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>

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
       ...
       Linking dist/build/hello-wheb/hello-wheb ...
-----> App built, 9.8MB
       Stripping app... done, 7.4MB
-----> Archiving build
       Creating halcyon-app-build-hello-wheb-1.0.tar.gz... done, 1.7MB

-----> Preparing install
       Copying app
-----> Install prepared, 7.0MB
-----> Archiving install
       Creating halcyon-app-install-1688650-hello-wheb-1.0.tar.gz... done, 1.6MB
-----> Installing app into /app... done, 7.0MB

-----> App deployed:                             <b>hello-wheb-1.0</b>
</code></pre>
</div>


_hello-yesod_
-------------

> ---------------------|---
> Framework:           | [Yesod](http://yesodweb.com/) 1.4.0
> Dependencies:        | [145](https://github.com/mietek/hello-yesod/blob/master/cabal.config)
> Mean first deploy time:   | …
> Sandbox size:        | 250MB
> App size:            | 25MB
> Source code:         | [_hello-yesod_](https://github.com/mietek/hello-yesod/)


### `Main.hs`

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


#### First deploy log

<div class="toggle">
<a class="toggle-button" data-target="hello-yesod-deploy" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="hello-yesod-deploy"><code>$ halcyon deploy <a href="https://github.com/mietek/hello-yesod/">https://github.com/mietek/hello-yesod</a>
-----> Cloning https://github.com/mietek/hello-yesod... done, 073431c
-----> Deploying app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-yesod-1.0</b>
       Source hash:                              <b>5ad16e2</b>
       Constraints hash:                         <b>4ba3d77</b>
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>

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
       ...
       Loading package yesod-1.4.0 ... linking ... done.

       Main.hs:10:1: Warning:
           Defined but not used: type constructor or class ‘Widget’

       Main.hs:10:1: Warning: Defined but not used: ‘resourcesHello’
       Linking dist/build/hello-yesod/hello-yesod ...
-----> App built, 25MB
       Stripping app... done, 20MB
-----> Archiving build
       Creating halcyon-app-build-hello-yesod-1.0.tar.gz... done, 3.9MB

-----> Preparing install
       Copying app
-----> Install prepared, 19MB
-----> Archiving install
       Creating halcyon-app-install-5ad16e2-hello-yesod-1.0.tar.gz... done, 3.8MB
-----> Installing app into /app... done, 19MB

-----> App deployed:                             <b>hello-yesod-1.0</b>
</code></pre>
</div>


<script src="https://www.google.com/jsapi"></script>
<script>
var rawResults = [
  ['hello-happstack',5,189,193,194],
  ['hello-mflow',6,310,316,317],
  ['hello-miku',5,275,280,280],
  ['hello-scotty',5,263,267,268],
  ['hello-simple',5,276,280,281],
  ['hello-snap',6,267,272,273],
  ['hello-spock',6,284,289,290],
  ['hello-wai',6,197,201,201],
  ['hello-wheb',6,308,313,314],
  ['hello-yesod',5,490,499,501],
  ['hello-happstack',5,191,195,196],
  ['hello-mflow',6,310,317,318],
  ['hello-miku',6,276,281,281],
  ['hello-scotty',6,265,270,271],
  ['hello-simple',6,273,277,278],
  ['hello-snap',5,261,266,266],
  ['hello-spock',6,285,290,291],
  ['hello-wai',5,198,202,202],
  ['hello-wheb',5,310,316,316],
  ['hello-yesod',5,490,499,500],
  ['hello-happstack',6,190,195,195],
  ['hello-mflow',5,310,317,318],
  ['hello-miku',6,269,274,275],
  ['hello-scotty',5,263,268,268],
  ['hello-simple',5,279,283,284],
  ['hello-snap',6,261,266,267],
  ['hello-spock',6,283,288,288],
  ['hello-wai',5,198,202,203],
  ['hello-wheb',5,303,308,309],
  ['hello-yesod',5,504,513,515],
  ['hello-happstack',5,195,199,200],
  ['hello-mflow',6,309,316,317],
  ['hello-miku',6,280,285,286],
  ['hello-scotty',6,275,280,281],
  ['hello-simple',6,281,285,286],
  ['hello-snap',6,265,270,270],
  ['hello-spock',5,281,286,287],
  ['hello-wai',6,198,202,203],
  ['hello-wheb',6,311,316,317],
  ['hello-yesod',6,503,512,513],
  ['hello-happstack',5,193,197,198],
  ['hello-mflow',6,319,325,326],
  ['hello-miku',5,277,282,283],
  ['hello-scotty',5,262,267,268],
  ['hello-simple',5,283,287,288],
  ['hello-snap',5,269,275,276],
  ['hello-spock',6,308,315,316],
  ['hello-wai',7,215,219,219],
  ['hello-wheb',6,318,324,325],
  ['hello-yesod',6,507,516,518],
];
var results = {};
rawResults.forEach(function (rawRow) {
  var name = rawRow[0];
  if (!(name in results)) {
    results[name] = {
      envTimes: [],
      sandboxTimes: [],
      appTimes: [],
      deployTimes: []
    };
  }
  results[name].envTimes.push(rawRow[1]);
  results[name].sandboxTimes.push(rawRow[2] - rawRow[1]);
  results[name].appTimes.push(rawRow[4] - rawRow[2]);
  results[name].deployTimes.push(rawRow[4]);
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
  data.addColumn('string', 'Name');
  data.addColumn('number', 'Environment restore time');
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'string', role: 'tooltip' });
  data.addColumn('number', 'Sandbox build time');
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'string', role: 'tooltip' });
  data.addColumn('number', 'Application build and install time');
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'number', role: 'interval' });
  data.addColumn({ type: 'string', role: 'tooltip' });
  Object.keys(results).forEach(function (name) {
    var result = results[name];
    var deployMean = mean(result.deployTimes);
    var deployLow = low(result.deployTimes);
    var deployHigh = high(result.deployTimes);
    var deployValue = fix(deployMean) + 's';
    if (deployLow !== deployHigh) {
      deployValue += ' [' + deployLow + 's, ' + deployHigh + 's]';
    }
    var deployTip = 'Mean first deploy time: ' + deployValue;
    var envMean = mean(result.envTimes);
    var envLow = low(result.envTimes);
    var envHigh = high(result.envTimes);
    var envTip = 'Mean environment restore time: ' + fix(envMean) + 's';
    if (envLow !== envHigh) {
      envTip += ' [' + envLow + 's, ' + envHigh + 's]';
    }
    envTip += '\n' + deployTip;
    var sandboxMean = mean(result.sandboxTimes);
    var sandboxLow = low(result.sandboxTimes);
    var sandboxHigh = high(result.sandboxTimes);
    var sandboxTip = 'Mean sandbox build time: ' + fix(sandboxMean) + 's';
    if (sandboxLow !== sandboxHigh) {
      sandboxTip += ' [' + sandboxLow + 's, ' + sandboxHigh + 's]';
    }
    sandboxTip += '\n' + deployTip;
    var appMean = mean(result.appTimes);
    var appLow = low(result.appTimes);
    var appHigh = high(result.appTimes);
    var appTip = 'Mean application build and install time: ' + fix(appMean) + 's';
    if (appLow !== appHigh) {
      appTip += ' [' + appLow + 's, ' + appHigh + 's]';
    }
    appTip += '\n' + deployTip;
    data.addRow([name, envMean, envLow, envHigh, envTip, sandboxMean, sandboxLow, sandboxHigh, sandboxTip, appMean, appLow, appHigh, appTip]);
    var sel = '#' + name + ' tr:nth-of-type(3) td:nth-of-type(2)';
    document.querySelectorAll(sel)[0].firstChild.nodeValue = deployValue;
  });
  var options = {
    chartArea: {
      left: '33.33333333%',
      top: 0,
      width: '100%',
      height: '90%'
    },
    colors: ['#9e9792', '#3f96f0'],
    dataOpacity: 0.8,
    fontName: 'concourse-t3',
    fontSize: cannot.getFontSize() * 3/4,
    hAxis: {
      baselineColor: '#cec7c2',
      format: '#s',
      gridlines: { color: '#cec7c2' },
      minValue: 0,
      maxValue: 600,
      textStyle: { color: '#6d6661' },
      viewWindowMode: 'maximized'
    },
    isStacked: true,
    legend: {
      position: 'left',
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
