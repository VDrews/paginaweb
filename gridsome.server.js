// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const nodeExternals = require('webpack-node-externals')

const axios = require('axios');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.TWITTER_TOKEN

async function getThread(id) {
  const { data } = await axios.get(`https://api.twitter.com/2/tweets?ids=${id}&tweet.fields=author_id,conversation_id,created_at,in_reply_to_user_id,referenced_tweets,public_metrics&expansions=author_id,in_reply_to_user_id,referenced_tweets.id,attachments.media_keys&user.fields=name,username&media.fields=url`)

  let tweet = data.data[0]

  if (typeof data.includes.media !== 'undefined') {
    tweet.urls = data.includes.media.map(media => media.url)
  }

  if (typeof data.includes.tweets !== 'undefined') {
    return [...await getThread(data.includes.tweets[0].id), tweet]
  } else {
    return [
      tweet
    ]
  }
}

module.exports = function (api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          allowlist: [/^vuetify/]
        })
      ])
    }
  })

  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    const threadCollection = addCollection({
      typeName: "threadsList",
    });

    const tweets = [
      {
        id: '1506287844402376709',
        title: 'Creando un lector de noticias usando Twitter como CMS',
        title_en: 'Creating a news reader using Twitter as a CMS',
        author: 'Andriu Garcia'
      },
      {
        id: '1364649798717087750',
        title: 'Creando una Red Social para el COVID',
        title_en: 'Creating a Social Network for COVID',
        author: 'Andriu Garcia'
      },
      {
        id: '1298918949149605888',
        title: 'Trucos UX para diseñar un Curriculum',
        title_en: 'UX tips for designing a CV',
        author: 'Andriu Garcia'
      },
    ]

    for (tweet of tweets) {
      let node = await getThread(tweet.id)
      threadCollection.addNode({
        id: tweet.id + '_es',
        title: tweet.title,
        author: tweet.author,
        locale: 'es',
        content: node
      })

      let translatedNode = []

      for (const nodecontent of node) {
        const { data } = await axios.post("https://api-free.deepl.com/v2/translate", null, {
          params: {
            auth_key: process.env.DEEPL_AUTH_KEY,
            text: nodecontent.text,
            target_lang: 'en'
          }
        })

        translatedNode.push({
          ...nodecontent,
          text: data.translations[0].text
        })

      }


      console.log(tweet.title, translatedNode[0].text)
      threadCollection.addNode({
        id: tweet.id + '_en',
        title: tweet.title_en,
        author: tweet.author,
        locale: 'en',
        content: translatedNode
      })
    }

  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
