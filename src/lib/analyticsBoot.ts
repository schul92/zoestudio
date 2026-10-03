// Inline <head> script (not bundled): runs before anything else so analytics events are queued from the first
// moment, even though gtag.js itself loads only after the visitor's first interaction.
//  • dataLayer + gtag stub, then `js`/`config` — any event pushed later lands after config, in order.
//  • gclid / gbraid / wbraid from the landing URL → sessionStorage, attached to leads for ad attribution.
//  • One delegated click listener for every link to our KakaoTalk channel: `kakao_click` each time, plus one
//    `generate_lead` (method: kakao) per session so Ads can count a KakaoTalk chat as a lead.
export function analyticsBoot(gaId: string | undefined): string {
  const cfg = gaId
    ? `g('js',new Date());g('config',${JSON.stringify(gaId)},{send_page_view:true,cookie_flags:'SameSite=None;Secure'});`
    : ''
  return `(function(){try{var w=window;w.dataLayer=w.dataLayer||[];var g=w.gtag=w.gtag||function(){w.dataLayer.push(arguments)};${cfg}
try{var q=new URLSearchParams(location.search),k=['gclid','gbraid','wbraid'],o={},n=0;for(var i=0;i<k.length;i++){var v=q.get(k[i]);if(v){o[k[i]]=v.slice(0,200);n++}}if(n){o.landing=location.pathname;sessionStorage.setItem('zl_ads',JSON.stringify(o))}}catch(e){}
document.addEventListener('click',function(e){var t=e.target,a=t&&t.closest?t.closest('a[href*="pf.kakao.com/_xhxdxmlX"]'):null;if(!a)return;var s=a.closest('[id]'),loc=a.getAttribute('data-kakao-loc')||(s&&s.id)||'page';g('event','kakao_click',{link_location:loc,lead_source:'kakao_chat',page_path:location.pathname});try{if(!sessionStorage.getItem('zl_kl')){sessionStorage.setItem('zl_kl','1');g('event','generate_lead',{method:'kakao',lead_source:'kakao_chat',currency:'USD',value:1,page_path:location.pathname})}}catch(e){}},true)}catch(e){}})();`
}
