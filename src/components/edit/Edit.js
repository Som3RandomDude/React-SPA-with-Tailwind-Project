import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/authContext.js';
import { Loading } from '../loading/Loading.js';

import { uploadFile } from '../../services/fileService.js';
import {  getPost, updatePost } from '../../services/postsService.js';

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



            if (upload.name !== '') {
                uploadResult = await uploadFile('posts', upload);
                if (!upload.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                    setImage({ invalidImage: 'Please select valid image.' });
                    upload = null;
                    toast.warn('Please select a valid image.')
                    return;
                }
            }
            let uploadResult = post.image;
            console.log(uploadResult);


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

            <div className="m-5 text-2xl font-bold text-center text-gray-800 heading">Edit Post</div>
            <form action="#" method="POST" onSubmit={EditPostHandler} className="formDiv">

                <div className="flex flex-col w-10/12 max-w-2xl p-4 mx-auto text-gray-800 bg-white border border-gray-300 shadow-lg editor">

                    <input className="p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title" spellCheck="false" required placeholder="Title" type="text" name="title" onChange={handleChange} value={post?.title ? post.title : ""} />
                    <input className="p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title" spellCheck="false" required placeholder="Description" type="text" name="description" onChange={handleChange} value={post?.description ? post?.description : ""} />
                    <select name="category" className="p-2 mb-4 bg-gray-100 border border-gray-300 outline-none " onChange={handleChange} value={post?.category}>
                        <option>NodeJs</option>
                        <option>Laravel</option>
                        <option>Design</option>
                        <option>Angular</option>
                        <option>React</option>
                        <option>Vue</option>
                    </select>
                    <textarea className="p-3 bg-gray-100 border outline-none description sec h-60 border-gray-3 00" required spellCheck="false" placeholder="Type in your content..." onChange={handleChange} value={post?.content} name="content">

                    </textarea>


                    <div className="flex mt-2 upload ">
                        <label className="p-1 px-4 mt-2 ml-2 font-semibold text-gray-200 bg-gray-500 border border-gray-500 cursor-pointer btn">

                            <input type="file" className='hidden'
                                id="upload" name="upload"
                                accept="image/png, image/jpeg" onChange={imageChangeHandler} />
                            Upload Photo
                        </label>

                    </div>

                    <div className="flex justify-end buttons">
                        <Link to={`/post/${match.params.postId}`}>   <button className="p-1 px-4 ml-auto font-semibold text-gray-500 border border-gray-300 cursor-pointer btn">Cancel</button></Link>
                        <button className="p-1 px-4 ml-2 font-semibold text-gray-200 bg-gray-500 border border-gray-500 cursor-pointer btn">Post</button>
                    </div>
                </div>
            </form>

        </>
    )
}