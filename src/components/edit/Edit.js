import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/authContext.js';
import { Loading } from '../loading/Loading.js';

import { uploadFile } from '../services/fileService.js';
import { createPost, getPost, updatePost } from '../services/postsService.js';
import { createUserPost } from '../services/userService.js';
import './Edit.css';

export default function Edit({
    history, match
}) {
    const { id } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [post, setPost] = useState('');
    const [image, setImage] = useState('');


    useEffect(() => {
        async function getData() {
            try {
                let postResult = await getPost(match.params.postId);
                console.log(`test`);
                console.log(postResult.data());
                setPost(postResult.data());

            } catch (error) {
                setError(error);
                console.log(error);
                toast.error("An error occured try again later!");

            }
        }
        getData();
    }, [match.params.postId, image])


    async function EditPostHandler(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let title = formData.get('title');
        let description = formData.get('description');
        let content = formData.get('content');
        let upload = formData.get('upload');
        let category = formData.get('category');


        try {
            if (!upload.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                setImage({ invalidImage: 'Please select valid image.' });
                upload = null;
                toast.warn('Please select a valid image.')
                
            }

            let uploadResult = post.image;
            if (upload.name !== '') {
                uploadResult = await uploadFile('posts', upload);
            }


            let result = await updatePost(title, description, category, content, uploadResult, match.params.postId);


            toast.success('Sucessfully edited the Post!');

            history.push(`/post/${match.params.postId}`);

        } catch (error) {
            setError(error);
            console.log(error);
            toast.warn('Something went wrong please try again!')
        }
    }

    const handleChange = (e) => {
        setPost((post) => ({ ...post, [e.target.name]: e.target.value }));
    };
    const imageChangeHandler = (e) => {
        let imageFile = e.target.files[0]
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            setImage({ invalidImage: 'Please select valid image.' });
            imageFile = null;
            toast.warn('Please select a valid image.')
            return false;
        }
    }

    return (

        <>

            <div className="heading text-center font-bold text-2xl m-5 text-gray-800">Edit Post</div>
            <form action="#" method="POST" onSubmit={EditPostHandler} className="formDiv">

                <div className="editor mx-auto w-10/12 flex flex-col bg-white text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">

                    <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" required placeholder="Title" type="text" name="title" onChange={handleChange} value={post?.title ? post.title : ""} />
                    <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" required placeholder="Description" type="text" name="description" onChange={handleChange} value={post?.description ? post?.description : ""} />
                    <select name="category" className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none " onChange={handleChange} value={post?.category}>
                        <option>NodeJs</option>
                        <option>Laravel</option>
                        <option>Design</option>
                        <option>Angular</option>
                        <option>React</option>
                        <option>Vue</option>
                    </select>
                    <textarea className="description
                     bg-gray-100 sec p-3 h-60 border border-gray-3  00 outline-none" required spellCheck="false" placeholder="Type in your content..." onChange={handleChange} value={post?.content} name="content">

                    </textarea>


                    <div className="upload flex mt-2 ">
                        <label className="btn border border-gray-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 mt-2  bg-gray-500">

                            <input type="file" className='hidden'
                                id="upload" name="upload"
                                accept="image/png, image/jpeg" onChange={imageChangeHandler} />
                            Upload Photo
                        </label>

                    </div>

                    <div className="buttons flex justify-end">
                        <Link to={`/post/${match.params.postId}`}>   <button className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</button></Link>
                        <button className="btn border border-gray-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-gray-500">Post</button>
                    </div>
                </div>
            </form>

        </>
    )
}