import { useQuery } from 'react-query'
import api from '../fetcher'
import type { PostRaw } from './types'

function getPosts () {
  return api.get<PostRaw[]>('posts',
    {
      params: {
        _embed: true,
        categories: 518,
      },
    },
  ).then(response => response.data)
}

export function usePosts () {
  const { isLoading, data = [], ...rest } = useQuery({
    queryKey: 'posts',
    queryFn: getPosts,
    select: (data) => data.map(post => ({
      thumbnail: post._embedded['wp:featuredmedia'][0]?.source_url,
      id: post.id,
      title: post.title.rendered,
      link: post.link,
    })),
  })

  return {
    posts: data,
    ...rest,
  }
}
