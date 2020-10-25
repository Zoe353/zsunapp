

const staticHTMLURL = 'https://static-links-page.signalnerve.workers.dev'


/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response to
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get('content-type')

  if (contentType.includes('application/json')) {
    const body = await response.json()
    return JSON.stringify(body)
  } else if (contentType.includes('application/text')) {
    const body = await response.text()
    return body
  } else if (contentType.includes('text/html')) {
    const body = await response.text()
    return body
  } else {
    const body = await response.text()
    return body
  }
}

/**
 * fetchPostJson sends a POST request with data in JSON and
 * and reads in the response body. Use await fetchPostJson(..)
 * in an async function to get the response body
 * @param {string} url the URL to send the request to
 * @param {BodyInit} body the JSON data to send in the request
 */
async function fetchPostJson(url, body = {}) {
  const init = {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  }

  const response = await fetch(url, init)
  const results = await gatherResponse(response)
  const retBody = Object.assign(someDefaultJSONToRespond, { results })
  return JSON.stringify(retBody)
}

/**
 * fetchGetHtml sends a GET request expecting html
 * Use await fetchGetHtml(..) in an async function to get the HTML
 * @param {string} url the URL to send the request to
 */
async function fetchGetHtml(url) {
  const init = {
    method: 'Get',
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }

  const response = await fetch(url)
  const respBody = await gatherResponse(response)
  return respBody
}

/**
 * define array of links, social links and social icons
 *  */

links = [{"name": "apple", "url": "https://en.wikipedia.org/wiki/Apple"},
         {"name": "orange", "url": "https://en.wikipedia.org/wiki/Orange_(fruit)"},
         {"name": "grape", "url": "https://en.wikipedia.org/wiki/Grape"}]

social_links = ["https://www.linkedin.com/in/zhimin-sun-1b98a1193/", "https://github.com/Zoe353"]
social_icons = ["https://simpleicons.org/icons/linkedin.svg","https://simpleicons.org/icons/github.svg"]




addEventListener('fetch', async event => {
  const { url, method } = event.request

  // Set respBody and init according to the route
  // and method of the incoming request
  if (url.endsWith('/links')){
    respBody = JSON.stringify(links)
  }else{
    
    respBody = fetchGetHtml(staticHTMLURL)
  }

  // Turn the the respBody string into a Response
  // return this response to the requester
  event.respondWith(
    (async function() {
      const body = await respBody

      if(url.endsWith('/links')){
        const init = {
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
        }
        return new Response(body, init)
      }else{

        const rewriter = new HTMLRewriter()
          .on('div#links', new AttributeRewriter('a'))
          .on('div#profile', new AttributeRewriter('style'))
          .on('img#avatar', new AttributeRewriter('src'))
          .on('h1#name', new AttributeRewriter('text'))
          .on('div#social', new AttributeRewriter('style'))
          .on('title', new AttributeRewriter())
          .on('body', new AttributeRewriter('style'))
         
          
        init = {
          headers: {
            'content-type': 'text/html;charset=UTF-8',
          },
        }
        res = new Response(body, init)
        transres = rewriter.transform(res)
        return transres
      }
      
    })()
  )
})


class AttributeRewriter{
  constructor(attributeName) {
    this.attributeName = attributeName
  }
 
  async element(element) {
   
      const attribute = element.getAttribute(this.attributeName)
      
      if(element.getAttribute('id') == 'profile'){
         element.setAttribute(
          this.attributeName,
          attribute.replace('display: none', ' '))
      }else if (element.getAttribute('id') == 'links'){
        for(var i in links){
          element.append("<a href=" + links[i]['url'] +">" ,{ html: true })
          element.append(links[i]['name'])
          element.append("</a>",{ html: true })
        }
      }
      else if(element.getAttribute('id') == 'avatar'){
          element.setAttribute(
          this.attributeName, 'https://avatars3.githubusercontent.com/u/57512523?s=400&u=68eaf359f978644a532e126842bbf4e93dbb780f&v=4')
      }else if(element.getAttribute('id') == 'name'){
        element.append("Zhimin Sun")
      }else if(element.getAttribute('id') == 'social'){
        element.setAttribute(
          this.attributeName,
          attribute.replace('display: none', ' '))
        for(var i in social_links){
          element.append("<a href=" + social_links[i] +">" ,{ html: true })
          element.append("<svg>", {html: true})
          element.append("<img src=" + social_icons[i] + ">", {html: true})
          element.append("</svg>", {html: true})
          element.append("</a>",{ html: true })
        }
        
      }else if(element.tagName == 'body'){
        element.setAttribute(
          this.attributeName,"background-color: #455A64")
      }
  }

  text(text){
    if(text.text.includes("Lots of links") && !text.removed){
      text.replace("Zhimin Sun")
    }
  }
}
