let search='';
const bar=document.querySelector(".search-bar");
const btn=document.querySelector(".search-btn");
btn.addEventListener('click',()=>{
    search=bar.value;
    const encodedQuery = encodeURIComponent(search);
    const targetUrl = `https://vegamovies.gripe/?s=${encodedQuery}`;
    window.location.href = targetUrl;
});