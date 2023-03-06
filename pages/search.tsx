import React from 'react'
import { GetServerSideProps } from 'next'
import styled from 'styled-components'
import TechPostCardList from '@/components/TechPostCardList/TechPostCardList'
import { getSearchedPosts } from '@/utils/techUtils'
import { ParsedUrlQuery } from 'querystring'
import { getAllTags } from '@/utils/techUtils'
import TechSearchBar from '@/components/TechSearchBar/TechSearchBar'
import TechTagList from '@/components/TechTagList/TechTagList'
import { ITechPosts } from '@/types/post'

interface IQuery extends ParsedUrlQuery {
  keyword: string | undefined
}

interface TechPostSearchPage {
  posts: ITechPosts
  tags: { [tag: string]: number }
  keyword: string
}
const TechPostSearchPage = ({ posts, tags, keyword }: TechPostSearchPage) => {
  const postCount = posts.length
  const hasPosts = postCount > 0

  return (
    <HomeLayout>
      <div>
        <ResultText>
          {hasPosts
            ? `'${keyword}'에 대한 결과 : ${postCount}건`
            : `'${keyword}'에 대한 결과가 없습니다.`}
        </ResultText>

        <TechPostCardList posts={posts} />
      </div>
      <SideBar>
        <TechSearchBar />
        <TechTagList tags={tags} />
      </SideBar>
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
`

const ResultText = styled.span`
  display: inline-block;
  font-size: 25px;
  font-weight: bolder;
  margin-bottom: 30px;
  background-color: #7e7979;
  color: white;
  padding: 5px;
`

const SideBar = styled.div`
  font-size: 14px;
  width: 330px;
`
