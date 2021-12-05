import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/authContext.js';
import { uploadFile } from '../services/fileService.js';
import { createPost } from '../services/postsService.js';
import { updateUserPosts } from '../services/userService.js';
import './Create.css';

export default function Create({
    history
}) {
    const { id } = useContext(AuthContext);
    const [error, setError] = useState('');

    async function createPostHandler(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let title = formData.get('title');
        let description = formData.get('description');
        let content = formData.get('content');
        let upload = formData.get('upload');

        try {
            let uploadResult = await uploadFile('posts', upload);
            let result = await createPost(title, description, content, uploadResult, id);
            let test = await updateUserPosts(id, result.id);
            console.log(result.id);
            console.log(test);
            history.push('/');

        } catch (error) {
            setError(error);
            console.log(error);
        }
    }

    return (
        <>
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>
            <form action="#" method="POST" onSubmit={createPostHandler} className="formDiv">
                <div className="editor mx-auto w-10/12 flex flex-col bg-white text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">

                    <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Title" type="text" name="title" />
                    <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Description" type="text" name="description" />

                    <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-3  00 outline-none" spellCheck="false" placeholder="Type in your content..." name="content"></textarea>


                    <div className="upload flex text-gray-500 m-2">
                        <input type="file"
                            id="upload" name="upload"
                            accept="image/png, image/jpeg" />
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