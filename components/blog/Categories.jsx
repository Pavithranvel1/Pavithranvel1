import Head from "next/head";
import Link from "next/link";
import React from "react";

const BlogCategories = ({ categories }) => {

  return (
    <div className="p-2">
      <div>
        <h1 className="text-2xl uppercase text-titleGreen ml-5 ">Categories</h1>
      </div>
      <div className="px-5 py-5">
        {categories.map((post, key) => (
          <div key={key}>
            <Link
              href={`/category/${post.slug}`}
              passHref
              prefetch={false}
            >
              <div
                className="mt-2 text-lg text-kapitus cursor-pointer blogsLink"
                title={post.name}
              >
                {post.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;