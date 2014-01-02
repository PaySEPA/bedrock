      {{! Avoid extra whitespace between elements for proper inline layout }}

      {{if pageLayout == "normal"}}
      <hr/>
      {{/if}}
      <footer class="footer row">
        {{if pageLayout != "error"}}
        <div class="span12">
          <ul>
            {{if pageLayout == "normal"}}
            <li><a href="/">Home</a></li><!--
            --><li><a href="/about">About</a></li><!--
            --><li><a href="/help">Help</a></li><!--
            --><li><a href="/docs">API</a></li><!--
            --><li><a href="/legal#tos">Terms of Service</a></li><!--
            --><li><a href="/legal#pp">Privacy Policy</a></li><!--
            --><li><a href="/contact">Contact</a></li><!--
            -->{{if contact.blog}}<li><!--
              --><a href="${contact.blog.url}">Blog</a><!--
            --></li>{{/if}}
            {{else}}
            <li><a href="/help">Help</a></li><!--
            --><li><a href="/legal#tos">Terms of Service</a></li><!--
            --><li><a href="/legal#pp">Privacy Policy</a></li>
            {{/if}}
          </ul>
        </div>
        {{/if}}
        <div class="span12">
          <ul>
            <li><!--
              -->Copyright &#169; 2013
              <span about="http://digitalbazaar.com/contact#company"
                typeof="vcard:VCard com:Business gr:BusinessEntity"
                property="rdfs:label vcard:fn gr:legalName"><a href="http://digitalbazaar.com/">Digital Bazaar, Inc.</a></span>
                All rights reserved.<!--
            --></li>
          </ul>
        </div>
      </footer>
    </div>

    {{! Analytics }}
    {{if googleAnalytics.enabled}}
      <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', '${googleAnalytics.account}']);
        _gaq.push(['_trackPageview']);
            (function() {
          var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
          ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
      </script>
    {{/if}}

  </body>
</html>