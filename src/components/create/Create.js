import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/authContext.js';
import { Loading } from '../loading/Loading.js';

import { uploadFile } from '../../services/fileService.js';
import { createPost } from '../../services/postsService.js';
import { createUserPost } from '../../services/userService.js';
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
                return ;
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

            <div className="m-5 text-2xl font-bold text-center text-gray-800 heading">New Post</div>
            <form action="#" method="POST" onSubmit={createPostHandler} className="formDiv">

                <div className="flex flex-col w-10/12 max-w-2xl p-4 mx-auto text-gray-800 bg-white border border-gray-300 shadow-lg editor">

                    <input className="p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title" spellCheck="false" required placeholder="Title" type="text" name="title" />
                    <input className="p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title" spellCheck="false" required placeholder="Description" type="text" name="description" />
                    <select name="category" className="p-2 mb-4 bg-gray-100 border border-gray-300 outline-none">
                        <option>NodeJs</option>
                        <option>Laravel</option>
                        <option>Design</option>
                        <option>Angular</option>
                        <option>React</option>
                        <option>Vue</option>
                    </select>
                    <textarea className="p-3 bg-gray-100 border outline-none description sec h-60 border-gray-3 00" required spellCheck="false" placeholder="Type in your content..." name="content"></textarea>


                    <div className="flex mt-2 text-gray-500 upload ">
                        <label className="p-1 px-4 mt-2 ml-2 font-semibold text-gray-200 bg-gray-500 border border-gray-500 cursor-pointer btn">

                            <input type="file" className='hidden'
                                id="upload" name="upload"
                                accept="image/png, image/jpeg" onChange={imageChangeHandler} />
                            Upload Photo
                        </label>

                    </div>

                    <div className="flex buttons">

                        <button className="p-1 px-4 ml-auto font-semibold text-gray-500 border border-gray-300 cursor-pointer btn">Cancel</button>
                        <button className="p-1 px-4 ml-2 font-semibold text-gray-200 bg-gray-500 border border-gray-500 cursor-pointer btn">Post</button>
                    </div>
                </div>
            </form>

        </>
    )
}