let isChrome=false,isSafari=false,isChromeMoblie=false;
window.onload = ()=>{
    getData('https://www.dcard.tw/_api/posts?popular=true')
    if(navigator.userAgent.indexOf("Chrome") !== -1){
        if(navigator.userAgent.indexOf("Android") !== -1)
            isChromeMoblie = true
        else
            isChrome = true
    }
    else if(navigator.userAgent.indexOf("Safari") !== -1){
        isSafari = true
    }
    document.onscroll = renew
    // document.getElementById('to-top').onclick = ()=>{
    //     window.scroll({
    //         top: 0,
    //         left: 0,
    //         behavior: 'smooth'
    //       });
    // }
}

let last_id;
const getData = (url)=>{
    fetch(url)
    .then(
        res=>res.json()
    ).then(
        posts=>{
            last_id = posts[posts.length - 1].id
            return`${posts.map(post=>`<div class="card">${post.excerpt}</div>`).join('')}`
        }
    ).then(
        html=>{document.getElementById('container').innerHTML+=html}
    )
}
// infinity scroll
const renew = () =>{
    let root = document.documentElement
    if(root.scrollTop === root.scrollHeight - root.clientHeight && isChrome 
        || document.body.scrollTop === document.body.scrollHeight - root.clientHeight && isSafari
        || (root.scrollTop === root.scrollHeight - root.clientHeight ||root.scrollTop + 56 === root.scrollHeight - root.clientHeight) && isChromeMoblie){
        getData(`https://www.dcard.tw/_api/posts?popular=true&before=${last_id}`)
    }
}