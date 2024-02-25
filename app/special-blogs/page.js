import { headers, cookies } from "next/headers";

import axios from "axios";

const fetchSpecialBlogs = async () => {
    try {
        const token = cookies().get("token");
        const response = await axios.get(`${process.env.STRAPI_BASE_URL}/api/special-blogs`, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });

        return response.data.data;
    } catch (error) {
        console.log("error", error);
        return [];
    }
};

export default async function Page() {
    const headersList = headers();
    const user = JSON.parse(headersList.get("user"));
    const blogs = await fetchSpecialBlogs();

    // console.log(blog.attributes.thumbnail, 'blog');

    return (
        <div className='container mx-auto'>
            <div>Hello {user.email}</div>
            <div className='grid grid-cols-3 gap-2'>
                {blogs.map((blog) => (
                    <div className='flex flex-col'>
                        {
                            <div className='flex flex-col'>
                                <div className='text-2xl'>ID: {blog.id}</div>
                                <div className='text-2xl'>{blog.attributes.title}</div>
                                <div className='text-1xl'>{blog.attributes.description}</div>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
