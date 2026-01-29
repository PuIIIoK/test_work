import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/articles')
            .then(response => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching articles:", error);
                setLoading(false);
                // Mock data for demo if API fails (since backend isn't running)
                setArticles([
                    { id: 1, title: 'Demo Article 1', created_at: '2023-10-27', content: 'This is a demo article content...' },
                    { id: 2, title: 'Demo Article 2', created_at: '2023-10-28', content: 'Another demo article...' },
                ]);
            });
    }, []);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Latest Articles</h1>
                <Link to="/create-article" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create Article
                </Link>
            </div>
            <div className="grid gap-6">
                {articles.map(article => (
                    <div key={article.id} className="border p-6 rounded-lg shadow hover:shadow-md transition">
                        <h2 className="text-xl font-semibold mb-2">
                            <Link to={`/articles/${article.id}`} className="hover:text-blue-500">
                                {article.title}
                            </Link>
                        </h2>
                        <p className="text-gray-500 text-sm mb-4">
                            {new Date(article.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 truncate">
                            {article.content.substring(0, 150)}...
                        </p>
                        <Link to={`/articles/${article.id}`} className="text-blue-500 mt-4 inline-block">
                            Read more &rarr;
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;
