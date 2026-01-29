import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ author_name: '', content: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchArticle = api.get(`/articles/${id}`);
        // Often comments are included in article response or fetched separately. 
        // Assuming API structure might be /articles/{id} with 'comments' relation or separate endpt.
        // Let's assume standard Laravel resource might include relationship if requested, 
        // or we fetch separately. For now, we'll try to fetch basic article.

        fetchArticle
            .then(response => {
                setArticle(response.data);
                if (response.data.comments) {
                    setComments(response.data.comments);
                } else {
                    // Try fetching comments if not included
                    // api.get(`/articles/${id}/comments`).then(...)
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching article:", error);
                // Mock data
                setArticle({
                    id,
                    title: `Demo Article ${id}`,
                    content: 'Full content of the article goes here. It is very interesting.',
                    created_at: '2023-10-27'
                });
                setComments([
                    { id: 1, author_name: 'Alice', content: 'Great post!', created_at: '2023-10-27' },
                    { id: 2, author_name: 'Bob', content: 'Thanks for sharing.', created_at: '2023-10-28' }
                ]);
                setLoading(false);
            });
    }, [id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        api.post(`/articles/${id}/comments`, newComment)
            .then(response => {
                // Assuming backend returns the created comment
                setComments([...comments, response.data]);
                setNewComment({ author_name: '', content: '' });
            })
            .catch(error => {
                console.error("Error posting comment", error);
                // Mock add
                const mockComment = { ...newComment, id: Date.now(), created_at: new Date().toISOString() };
                setComments([...comments, mockComment]);
                setNewComment({ author_name: '', content: '' });
            });
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!article) return <div className="text-center mt-10">Article not found</div>;

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <Link to="/" className="text-blue-500 mb-4 inline-block">&larr; Back to Articles</Link>

            <article className="prose lg:prose-xl mb-10">
                <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
                <p className="text-gray-500 mb-6">{new Date(article.created_at).toLocaleDateString()}</p>
                <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {article.content}
                </div>
            </article>

            <hr className="my-8" />

            <section>
                <h3 className="text-2xl font-bold mb-4">Comments ({comments.length})</h3>

                <div className="space-y-4 mb-8">
                    {comments.map(comment => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded">
                            <div className="flex justify-between mb-1">
                                <strong className="text-gray-900">{comment.author_name}</strong>
                                <span className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                        </div>
                    ))}
                    {comments.length === 0 && <p className="text-gray-500 italic">No comments yet. Be the first!</p>}
                </div>

                <div className="bg-white border p-6 rounded shadow-sm">
                    <h4 className="text-lg font-semibold mb-4">Leave a comment</h4>
                    <form onSubmit={handleCommentSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                required
                                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={newComment.author_name}
                                onChange={e => setNewComment({ ...newComment, author_name: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Comment</label>
                            <textarea
                                required
                                rows="3"
                                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={newComment.content}
                                onChange={e => setNewComment({ ...newComment, content: e.target.value })}
                            ></textarea>
                        </div>
                        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                            Post Comment
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;
