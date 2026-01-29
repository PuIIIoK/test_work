import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const CreateArticlePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/articles', { title, content })
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error("Error creating article:", error);
                // Mock success for demo
                navigate('/');
            });
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Link to="/" className="text-blue-500 mb-4 inline-block">&larr; Back</Link>
            <h1 className="text-3xl font-bold mb-6">Create New Article</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        id="title"
                        type="text"
                        placeholder="Article Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        id="content"
                        rows="10"
                        placeholder="Write your article content here..."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Publish Article
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateArticlePage;
