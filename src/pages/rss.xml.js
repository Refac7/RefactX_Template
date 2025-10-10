import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE } from '~/config'

export async function GET(context) {
  const posts = await getCollection('posts')

  const sortedPosts = posts.sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf())

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
      customData: `<author>${post.data.author || SITE.author}</author>`,
      updatedDate: post.data.updatedDate,
    })),
    stylesheet: '/rss/styles.xsl',
  })
}
