import styled from 'styled-components'

interface PostContentProps {
  content: string
}

const PostContent = ({ content }: PostContentProps) => {
  return <ContentBox dangerouslySetInnerHTML={{ __html: content }} />
}

export default PostContent

const ContentBox = styled.div`
  white-space: pre-Wrap;
  margin: 40px 0px;

  max-width: 100%;
  padding: 1rem;
  line-height: 1.5;
  font-size: 1.125rem;
  font-weight: 400;
  color: #333;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.5rem 0 1rem;
    font-weight: 600;
    line-height: 1.25;
  }

  h1 {
    font-size: 2.25rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  p {
    margin-bottom: 1.25rem;
  }

  a {
    color: #0070f3;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    max-width: 70%;
    margin: 1.5rem auto;
    display: block;
  }

  pre {
    overflow-x: auto;
    padding: 1rem;
  }

  code {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,
      Courier New, monospace;
  }
`
