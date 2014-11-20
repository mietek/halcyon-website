---
title: “Hello, world!” examples
page-class: add-section-toc
page-head: |
  <style>
    header a.link-examples {
      color: #3f96f0;
    }
  </style>
---


Example applications
====================

Ready to deploy with a single command.


_hello-happstack_
-----------------

> ---------------------|---
> Source:              | [_hello-happstack_](https://github.com/mietek/hello-happstack/)
> Framework:           | [Happstack](http://happstack.com/) Lite 7.3.5
> Dependencies:        | [44](https://github.com/mietek/hello-happstack/blob/master/cabal.config)
> Sandbox size:        | 64MB
> App size:            | 12MB

<pre class="textmate-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Happstack.Lite</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port_ <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
        config <span class="keyword keyword_operator keyword_operator_haskell">=</span> defaultServerConfig { port <span class="keyword keyword_operator keyword_operator_haskell">=</span> port_ }
    serve (<span class="support support_constant support_constant_haskell">Just</span> config) <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      ok <span class="keyword keyword_operator keyword_operator_haskell">$</span> toResponse <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span></span></code></pre>


_hello-mflow_
-------------

> ---------------------|---
> Source:              | [_hello-mflow_](https://github.com/mietek/hello-mflow/)
> Framework:           | [MFlow](https://github.com/agocorona/MFlow/) 0.4.5.9
> Dependencies:        | [106](https://github.com/mietek/hello-mflow/blob/master/cabal.config) and _cpphs_ 1.18.6
> Sandbox size:        | 152MB
> App size:            | 20MB

<pre class="textmate-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">MFlow.Wai.Blaze.Html.All</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span>
    runNavigation <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>hello<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> transientNav <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      page <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">++></span> empty</span></code></pre>


_hello-miku_
------------

> ---------------------|---
> Source:              | [_hello-miku_](https://github.com/mietek/hello-miku/)
> Framework:           | [_miku_](https://github.com/nfjinjing/miku/) 2014.5.19
> Dependencies:        | [59](https://github.com/mietek/hello-miku/blob/master/cabal.config)
> Sandbox size:        | 84MB
> App size:            | 13MB

<pre class="textmate-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Network.Miku</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Hack2.Handler.SnapServer</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port_ <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
    runWithConfig (<span class="constant constant_other constant_other_haskell">ServerConfig</span> port_) <span class="keyword keyword_operator keyword_operator_haskell">.</span> miku <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      get <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>/<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> (text <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span>)</span></code></pre>


_hello-scotty_
--------------

> ---------------------|---
> Source:              | [_hello-scotty_](https://github.com/mietek/hello-scotty/)
> Framework:           | [Scotty](https://github.com/scotty-web/scotty/) 0.9.0
> Dependencies:        | [74](https://github.com/mietek/hello-scotty/blob/master/cabal.config)
> Sandbox size:        | 83MB
> App size:            | 12MB

<pre class="textmate-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Web.Scotty</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
    scotty port <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      get <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>/<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> text <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span></span></code></pre>


_hello-simple_
--------------

> ---------------------|---
> Source:              | [_hello-simple_](https://github.com/mietek/hello-simple/)
> Framework:           | [Simple](http://simple.cx/) 0.10.0.2
> Dependencies:        | [70](https://github.com/mietek/hello-simple/blob/master/cabal.config)
> Sandbox size:        | 100MB
> App size:            | 7MB

<pre class="textmate-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Network.Wai.Handler.Warp</span></span>
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


_hello-snap_
------------

> ---------------------|---
> Source:              | [_hello-snap_](https://github.com/mietek/hello-snap/)
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> Dependencies:        | [42](https://github.com/mietek/hello-snap/blob/master/cabal.config)
> Sandbox size:        | 69MB
> App size:            | 11MB

<pre class="textmate-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Snap.Core</span></span>
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


_hello-spock_
-------------

> ---------------------|---
> Source:              | [_hello-spock_](https://github.com/mietek/hello-spock/)
> Framework:           | [Spock](https://github.com/agrafix/Spock/) 0.7.4.0
> Dependencies:        | [80](https://github.com/mietek/hello-spock/blob/master/cabal.config)
> Sandbox size:        | 107MB
> App size:            | 12MB

<pre class="textmate-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>
<span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Web.Spock.Safe</span></span>

<span class="meta meta_function meta_function_type-declaration meta_function_type-declaration_haskell"><span class="entity entity_name entity_name_function entity_name_function_haskell">main</span> <span class="keyword keyword_other keyword_other_double-colon keyword_other_double-colon_haskell">::</span> <span class="support support_type support_type_prelude support_type_prelude_haskell">IO</span> <span class="support support_constant support_constant_unit support_constant_unit_haskell">()</span>
</span>main <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="keyword keyword_control keyword_control_haskell">do</span>
    env <span class="keyword keyword_operator keyword_operator_haskell">&lt;-</span> getEnvironment
    <span class="keyword keyword_other keyword_other_haskell">let</span> port <span class="keyword keyword_operator keyword_operator_haskell">=</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">maybe</span> <span class="constant constant_numeric constant_numeric_haskell">8080</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">read</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> <span class="support support_function support_function_prelude support_function_prelude_haskell">lookup</span> <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>PORT<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> env
    runSpock port <span class="keyword keyword_operator keyword_operator_haskell">$</span> spockT <span class="support support_function support_function_prelude support_function_prelude_haskell">id</span> <span class="keyword keyword_operator keyword_operator_haskell">$</span>
      get <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>/<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span> <span class="keyword keyword_operator keyword_operator_haskell">$</span> text <span class="string string_quoted string_quoted_double string_quoted_double_haskell"><span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_begin punctuation_definition_string_begin_haskell">"</span>Hello, world!<span class="punctuation punctuation_definition punctuation_definition_string punctuation_definition_string_end punctuation_definition_string_end_haskell">"</span></span></span></code></pre>


_hello-wai_
-----------

> ---------------------|---
> Source:              | [_hello-wai_](https://github.com/mietek/hello-wai/)
> Framework:           | [WAI](https://hackage.haskell.org/package/wai/) 3.0.2
> Dependencies:        | [38](https://github.com/mietek/hello-wai/blob/master/cabal.config)
> Sandbox size:        | 45MB
> App size:            | 6MB

<pre class="textmate-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">Network.HTTP.Types</span></span>
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


_hello-wheb_
------------

> ---------------------|---
> Source:              | [_hello-wheb_](https://github.com/mietek/hello-wheb/)
> Framework:           | [Wheb](https://github.com/hansonkd/Wheb-Framework/) 0.3.1.0
> Dependencies:        | [98](https://github.com/mietek/hello-wheb/blob/master/cabal.config)
> Sandbox size:        | 146MB
> App size:            | 10MB

<pre class="textmate-source"><code><span class="source source_haskell"><span class="meta meta_import meta_import_haskell"><span class="keyword keyword_other keyword_other_haskell">import</span> <span class="support support_other support_other_module support_other_module_haskell">System.Environment</span></span>
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


_hello-yesod_
-------------

> ---------------------|---
> Source:              | [_hello-yesod_](https://github.com/mietek/hello-yesod/)
> Framework:           | [Yesod](http://yesodweb.com/) 1.4.0
> Dependencies:        | [145](https://github.com/mietek/hello-yesod/blob/master/cabal.config)
> Sandbox size:        | 250MB
> App size:            | 25MB

<pre class="textmate-source"><code><span class="source source_haskell"><span class="meta meta_preprocessor meta_preprocessor_haskell">{-# <span class="keyword keyword_other keyword_other_preprocessor keyword_other_preprocessor_haskell">LANGUAGE</span> QuasiQuotes #-}</span>
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
