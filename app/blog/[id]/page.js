import axios from 'axios'

const fetchBlog = async (id) => {
    try {
        const response = await axios.get(`${process.env.STRAPI_BASE_URL}/api/blogs/${id}?populate[0]=thumbnail&populate[1]=author`);
        console.log(`${process.env.STRAPI_BASE_URL}/api/blogs/${id}?populate[0]=thumbnail&populate[1]=author`);
        return response.data.data
    } catch (error) {
        console.log(console.error);
    }
}

export default async function Page({ params }) {
    const blogId = params.id
    const blog = await fetchBlog(blogId)

    return (
        <div className='container mx-auto'>
            Blog ID {blog.id}
            <img
                src={`${process.env.STRAPI_BASE_URL}${blog.attributes.thumbnail.data.attributes.formats.thumbnail.url}`}
            />
            <div className='grid grid-cols-3 gap-2'>
                {
                    <div className='flex flex-col'>
                        <div className='text-2xl'>{blog.attributes.title}</div>
                        <div className='text-1xl'>{blog.attributes.title}</div>
                        <div className='text-1xl'>author by {blog.attributes.author.data.attributes.name}</div>
                    </div>
                }
            </div>
        </div>
    );
}
