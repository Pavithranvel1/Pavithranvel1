import React, {useState} from 'react';
import Link from 'next/link';
import styles from '../styles/Posts.module.scss';
import PostImage from "./PostImage";
import PostLargeImage from "./PostLargeImage"
import Heading, { HeadingProps } from './Heading';
import Router, { useRouter } from "next/router";
import Highlighter from "react-highlight-words";


export default function Blog({
  posts,
  allPosts,
  intro,
  heading,
  id,
  headingLevel = 'h1',
  postTitleLevel = 'h2',
  postMainTitleLevel='h1',
  readMoreText = 'Read more',
}) {

  // const [dataSource,setDataSource] = useState(allPosts)
  const [value,setValue] = useState('');
  const [searchTerm, setSearchTerm]= useState("");
  

  const fetchPost = allPosts?.filter((post)=> {
    
    if(searchTerm!== '' ) {
      if(post?.content()?.toLowerCase()?.includes(searchTerm?.toLowerCase()) || post?.title()?.toLowerCase()?.includes(searchTerm?.toLowerCase())) {
        // console.log(searchTerm);
        return post;
      } 
    }
  })

  
  const postFilter = fetchPost.map((post, key) => {
    
    return (
      
      <div
        className={styles.single}
        key={post.id ?? ''}
        id={`post-${post.id}`}>
        <div>
          <PostImage imageSrcUrl={post?.featuredImage?.node?.sourceUrl()} />
          <Heading level={postTitleLevel} className={styles.title}> 
            <Link href={`/blog/${post.slug}`}>
              <a>{post.title()}</a>
            </Link>
          </Heading>
          <div
            className={styles.excerpt}
            // style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post.excerpt() ?? '' }}
          />
          <Link href={`/blog/${post.slug}`}>
            <a aria-label={`Read more about ${post.title || 'the post'}`}>
              {readMoreText}
            </a>
          </Link>
        </div>
      </div>
    )
  })

 const handleSearch = (e) => {
    Router.push(`./SearchResult?keyword=${e}`);
  }
  

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
   
    <section className={styles['posts-block']} {...(id && { id })}>
      <div >
        {heading && (
          <Heading level={headingLevel} className={styles.heading}>
            {heading}
          </Heading>
        )}
        {intro && <p className={styles.intro}>{intro}</p>}
        
        
        <div >
          {posts.map((post, key) => (
            <div key={key}>
              {key === 0 ? (
              <div
                className={styles.single}
                id={`post-${post.id}`}>
                <div className={styles.prime}>
                  <PostLargeImage imageSrcUrl={post?.featuredImage?.node?.sourceUrl()} />
                  <Heading level={postMainTitleLevel} className={styles.title}>
                    <Link href={`/blog/${post.slug}`}>
                      <a>{post.title()}</a>
                    </Link>
                  </Heading>
                  <div
                    className={styles.excerpt}
                    dangerouslySetInnerHTML={{ __html: post.excerpt() ?? '' }}
                  />
                  <Link href={`/blog/${post.slug}`}>
                    <a aria-label={`Read more about ${post.title || 'the post'}`}>
                      {readMoreText}
                    </a>
                  </Link>
                </div>
              </div>
              ) : ( <div></div> )}
            </div>
          ))}
        </div>
        <section className={styles.searchNav}>
          {/* <SearchBlogs /> */}
          {/* <Highlighter
            searchWords={[searchTerm]}
            autoEscape={true}
            textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
          /> */}
          <div>
            <input
                type="text"
                name="searchIco"
                id="searchIco"
                placeholder="Enter a keyword to search Blogs Posts"
                className="border-2 border-gray-300 p-2 w-full"
                onChange={(e) => handleSearch(e.target.value)}                 
            />
          </div>
        </section>
        
        <div className="posts">
          {searchTerm!=="" ? (
            <>{postFilter}</>
          ) : (
            posts?.map((post) => (
                <div
                  className={styles.single}
                  key={post.id ?? ''}
                  id={`post-${post.id}`}>
                  <div>
                    <PostImage imageSrcUrl={post?.featuredImage?.node?.sourceUrl()} />
                    <Heading level={postTitleLevel} className={styles.title}> 
                      <Link href={`/blog/${post.slug}`}>
                        <a>{post.title()}</a>
                      </Link>
                    </Heading>
                    <Highlighter
                        searchWords={[searchTerm]}
                        autoEscape={true}
                        caseSensitive={false}
                        textToHighlight={post.excerpt() ?? ''}
                      />
                    {/* <div
                      className={styles.excerpt}
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: post.excerpt() ?? '' }}
                    /> */}
                    <Link href={`/blog/${post.slug}`}>
                      <a aria-label={`Read more about ${post.title || 'the post'}`}>
                        {readMoreText}
                      </a>
                    </Link>
                  </div>
                </div>
            ))
          )
          }
          {/* {posts?.filter((post)=> {
            if(searchTerm=="") {
              return post;
              
            } else {
              let key = post?.title().toLowerCase()?.includes(searchTerm.toLowerCase());
              console.log(key);
              console.log(searchTerm.toLowerCase());
              
              return true;
              
            }
            if(searchTerm!="" && post?.title()?.toLowerCase()?.includes(searchTerm?.toLowerCase())) {
              return true;
            } else {
              return false;
            }
            
          })
          .map((post) => (
            
            <div
              className={styles.single}
              key={post.id ?? ''}
              id={`post-${post.id}`}>
              <div>
                <PostImage imageSrcUrl={post?.featuredImage?.node?.sourceUrl()} />
                <Heading level={postTitleLevel} className={styles.title}> 
                  <Link href={`/blog/${post.slug}`}>
                    <a>{post.title()}</a>
                  </Link>
                </Heading>
                <div
                  className={styles.excerpt}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: post.excerpt() ?? '' }}
                />
                <Link href={`/blog/${post.slug}`}>
                  <a aria-label={`Read more about ${post.title || 'the post'}`}>
                    {readMoreText}
                  </a>
                </Link>
              </div>
            </div>
          ))} */}
          {posts && posts?.length < 1 && <p>No posts found.</p>}
        </div>
      </div>
    </section>
  );
}
// export default Blog;