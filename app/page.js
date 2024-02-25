import axios from 'axios'
import Link from 'next/link'

const fetchBlog = async () => {
  try {
    const response = await axios.get(`${process.env.STRAPI_BASE_URL}/api/blogs`);
    return response.data.data
  } catch (error) {
    console.log(console.error);
  }
}

export default async function Page() {
  const blogs = await fetchBlog()
  return (
    <div className='container mx-auto'>
      Hello blogs page
      <div className='grid grid-cols-3 gap-2'>
        {
          blogs && blogs.map((blog, index) => (
            <div className='flex flex-col' key={index}>
              <div className='text-2xl'>{blog.attributes.title}</div>
              <div className='text-1xl'>{blog.attributes.title}</div>
              <Link href={`/blog/${blog.id}`} className='bg-blue-500 p-2'>See more</Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}
