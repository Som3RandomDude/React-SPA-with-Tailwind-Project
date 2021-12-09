import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/authContext.js';
import { Loading } from '../loading/Loading.js';

import { uploadFile } from '../services/fileService.js';
import { createPost } from '../services/postsService.js';
import { createUserPost } from '../services/userService.js';
import './Create.css';

export default function Create({
    history
}) {
    const { id } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');

    async function createPostHandler(e) {
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
                return false;
              }
            let uploadResult = await uploadFile('posts', upload);
            let result = await createPost(title, description, category, content, uploadResult, id);
            let test = await createUserPost(id, result.id);

            toast.success('Sucessfully created a Post!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            history.push('/');

        } catch (error) {
            setError(error);
            console.log(error);
        }
    }

    const imageChangeHandler = (e) => {
        let imageFile = e.target.files[0]
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            setImage({ invalidImage: 'Please select valid image.' });
            imageFile = null;
            toast.warn('Please select a valid image.')
            return;
        }
    }

    return (

        <>

            <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>
            <form action="#" method="POST" onSubmit={createPostHandler} className="formDiv">

                <div className="editor mx-auto w-10/12 flex flex-col bg-white text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">

                    <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" required placeholder="Title" type="text" name="title" />
                    <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" required placeholder="Description" type="text" name="description" />
                    <select name="category" className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none">
                        <option>NodeJs</option>
                        <option>Laravel</option>
                        <option>Design</option>
                        <option>Angular</option>
                        <option>React</option>
                        <option>Vue</option>
                    </select>
                    <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-3  00 outline-none" required spellCheck="false" placeholder="Type in your content..." name="content"></textarea>


                    <div className="upload flex text-gray-500 mt-2 ">
                        <label className="btn border border-gray-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 mt-2  bg-gray-500">

                            <input type="file" className='hidden'
                                id="upload" name="upload"
                                accept="image/png, image/jpeg" onChange={imageChangeHandler} />
                            Upload Photo
                        </label>

                    </div>

                    <div className="buttons flex">

                        <button className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</button>
                        <button className="btn border border-gray-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-gray-500">Post</button>
                    </div>
                </div>
            </form>

        </>
    )
}