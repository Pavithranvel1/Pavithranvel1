import Link from "next/link";
const RecentBlogs = ({recentposts}) => {

  return (
    <div className="p-5">
      <div className="text-xl uppercase text-titleGreen text-left">
        LATEST FROM KAPITUS
      </div>
      <div className="py-5">
       {Object.values(recentposts).map((post, key) => {
          return (
            <div key={key}>
              <div className="w-10/12 ">
                <Link href={`/blog/${post.slug}`} passHref>
                  <div
                    className="mt-2 text-base text-kapitus cursor-pointer italic text-recentBlue"
                    title={post.title}
                  >
                    {post.title}
                  </div>
                </Link>
              </div>
              <div className="w-10/12 py-2">
                <hr className="border-2 border-gray-200" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentBlogs;