// Inline <head> script (not bundled): runs before anything else so analytics events are queued from the first
// moment, even though gtag.js itself loads only after the visitor's first interaction.
//  • dataLayer + gtag stub, then `js`/`config` — any event pushed later lands after config, in order.
//  • Attribution: every arrival is recorded as a raw "touch" (click IDs, utm_*, external referrer host, landing
//    path, time). localStorage keeps, for 90 days, the first touch (zl_ft), the last non-direct touch (zl_lt),
//    the last ad click (zl_ck) and a visit count (zl_n). Leads attach them (src/lib/leadCapture.ts) and
//    src/lib/attribution.ts turns them into a channel name. Nothing personal is stored.
//  • One delegated click listener for every KakaoTalk / tel: / mailto: link: a GA event each time, one
//    `generate_lead` per session for KakaoTalk so Ads can count a chat as a lead, and one beacon per session and
//    kind to /api/lead-click, which emails the owner the visitor's source so a chat or call can be matched by time.
export function analyticsBoot(gaId: string | undefined): string {
  const cfg = gaId
    ? `g('js',new Date());g('config',${JSON.stringify(gaId)},{send_page_view:true,cookie_flags:'SameSite=None;Secure'});`
    : ''
  return `(function(){try{var w=window;w.dataLayer=w.dataLayer||[];var g=w.gtag=w.gtag||function(){w.dataLayer.push(arguments)};${cfg}
var J=JSON.stringify,get=function(k){try{var x=JSON.parse(localStorage.getItem(k));return x&&Date.now()-x.t<7776e6?x:null}catch(e){return null}};
try{var L=localStorage,S=sessionStorage,q=new URLSearchParams(location.search),o={t:Date.now(),lp:location.pathname.slice(0,200)},n=0,m={gclid:'gclid',gbraid:'gbraid',wbraid:'wbraid',fbclid:'fbclid',msclkid:'msclkid',utm_source:'us',utm_medium:'um',utm_campaign:'uc',utm_term:'ut',utm_content:'ucn'};for(var k in m){var v=q.get(k);if(v){o[m[k]]=v.slice(0,200);n++}}var h='';try{h=document.referrer?new URL(document.referrer).hostname:''}catch(e){}if(h&&h!==location.hostname&&!/(^|\\.)(zoelumos\\.com|stripe\\.com)$/.test(h)){o.ref=h.slice(0,100);n++}if(!S.getItem('zl_s')){S.setItem('zl_s','1');L.setItem('zl_n',String((+L.getItem('zl_n')||0)+1))}if(!get('zl_ft'))L.setItem('zl_ft',J(o));if(n)L.setItem('zl_lt',J(o));if(o.gclid||o.gbraid||o.wbraid)L.setItem('zl_ck',J(o))}catch(e){}
var beacon=function(kind,loc){try{var S=sessionStorage;if(S.getItem('zl_c_'+kind))return;S.setItem('zl_c_'+kind,'1');navigator.sendBeacon('/api/lead-click',J({kind:kind,loc:loc,page:location.pathname,first_touch:get('zl_ft'),last_touch:get('zl_lt'),ad_click:get('zl_ck'),visits:+localStorage.getItem('zl_n')||1}))}catch(e){}};
document.addEventListener('click',function(e){var t=e.target,a=t&&t.closest?t.closest('a[href]'):null;if(!a)return;var href=a.getAttribute('href')||'',s=a.closest('[id]'),loc=a.getAttribute('data-kakao-loc')||(s&&s.id)||'page',p=location.pathname;if(href.indexOf('pf.kakao.com/_xhxdxmlX')>-1){g('event','kakao_click',{link_location:loc,lead_source:'kakao_chat',page_path:p});try{if(!sessionStorage.getItem('zl_kl')){sessionStorage.setItem('zl_kl','1');g('event','generate_lead',{method:'kakao',lead_source:'kakao_chat',currency:'USD',value:1,page_path:p})}}catch(e){}beacon('kakao',loc)}else if(href.indexOf('tel:')===0){g('event','phone_click',{link_location:loc,page_path:p});beacon('phone',loc)}else if(href.indexOf('mailto:')===0){g('event','email_click',{link_location:loc,page_path:p});beacon('email',loc)}},true)}catch(e){}})();`
}
