import { GetServerSideProps } from 'next'
import React from 'react'
import styled from 'styled-components'
import SearchResult from '@/components/SearchResult/SearchResult'
import TechPostCardList from '@/components/TechPostCardList/TechPostCardList'
import TechSideBar from '@/components/TechSideBar/TechSideBar'
import { IQuery } from '@/types/query'
import { ITechPosts, ITags } from '@/types/tech'
import { getSearchedPosts, getAllTags } from '@/utils/techUtils'

interface TechPostSearchPage {
  posts: ITechPosts
  tags: ITags
  keyword: string
}

const TechPostSearchPage = ({ posts, tags, keyword }: TechPostSearchPage) => {
  const postCount = posts.length

  return (
    <HomeLayout>
      <div>
        <SearchResult keyword={keyword} postCount={postCount} />
        <TechPostCardList posts={posts} />
      </div>
      <TechSideBar tags={tags} />
    </HomeLayout>
  )
}

export default TechPostSearchPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { keyword } = query as IQuery

  const posts = await getSearchedPosts(keyword)
  const tags = await getAllTags()

  return { props: { posts, tags, keyword } }
}

const HomeLayout = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${({ theme }) => theme.device.tabletMax} {
    flex-direction: column-reverse;
  }
`
