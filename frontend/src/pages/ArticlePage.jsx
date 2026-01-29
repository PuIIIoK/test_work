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

        fetchArticle
            .then(response => {
                setArticle(response.data);
                if (response.data.comments) {
                    setComments(response.data.comments);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching article:", error);
                // Mock data
                setArticle({
                    id,
                    title: 'The Future of AI in Design',
                    content: 'In the rapidly evolving landscape of digital product design, Artificial Intelligence (AI) is emerging not just as a tool, but as a collaborative partner. \n\nThis shift is fundamentally changing workflows, from ideation to high-fidelity prototyping. Designers are no longer just pixel-pushers; they are becoming curators of generated possibilities. \n\nHowever, this introduces new challenges regarding originality and the human touch in digital experiences. How do we maintain empathy in a world of automated decisions? That is the question every modern designer must answer.',
                    created_at: '2023-10-28'
                });
                setComments([
                    { id: 1, author_name: 'Alex Rivera', content: 'Incredible insights. The part about empathy really resonated with me.', created_at: '2023-10-28' },
                    { id: 2, author_name: 'Sarah Chen', content: 'I think AI will handle the mundane, leaving room for true creativity.', created_at: '2023-10-29' }
                ]);
                setLoading(false);
            });
    }, [id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        api.post(`/articles/${id}/comments`, newComment)
            .then(response => {
                setComments([...comments, response.data]);
                setNewComment({ author_name: '', content: '' });
            })
            .catch(error => {
                console.error("Error posting comment", error);
                const mockComment = { ...newComment, id: Date.now(), created_at: new Date().toISOString() };
                setComments([...comments, mockComment]);
                setNewComment({ author_name: '', content: '' });
            });
    };

    if (loading) return (
        <div className="max-w-4xl mx-auto px-6 animate-pulse">
            <div className="w-32 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-12"></div>

            <div className="mb-16 text-center">
                <div className="w-32 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mb-6"></div>
                <div className="h-14 w-3/4 mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-2xl mb-4"></div>
            </div>

            <div className="glass-panel p-8 md:p-12 rounded-3xl min-h-[500px] w-full border-transparent">
                <div className="space-y-6">
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                    <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                    <div className="h-4 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                </div>
            </div>
        </div>
    );

    if (!article) return <div className="text-center mt-20 text-zinc-500 font-medium">Article not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-12 group">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mr-3 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors shadow-sm">
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </div>
                Back to Articles
            </Link>

            <article className="mb-16">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        {new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8">
                        <span className="gradient-text">{article.title}</span>
                    </h1>
                </header>

                <div className="glass-panel p-8 md:p-12 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-black/20">
                    <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {article.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-6 first-letter:text-5xl first-letter:font-black first-letter:text-blue-600 dark:first-letter:text-blue-400 first-letter:mr-3 first-letter:float-left">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </article>

            <section className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Discussion</h3>
                    <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-bold">
                        {comments.length}
                    </span>
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-grow"></div>
                </div>

                <div className="space-y-6 mb-12">
                    {comments.map(comment => (
                        <div key={comment.id} className="glass-panel p-6 rounded-2xl flex gap-4 transition-transform duration-300 hover:scale-[1.01]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                                {comment.author_name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-baseline mb-2">
                                    <strong className="text-zinc-900 dark:text-white font-bold text-lg">{comment.author_name}</strong>
                                    <span className="text-xs font-medium text-zinc-500 uppercase">{new Date(comment.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <div className="text-center py-10 glass-panel rounded-2xl border-dashed border-2 border-zinc-200 dark:border-zinc-800">
                            <p className="text-zinc-500 italic">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                    )}
                </div>

                <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <h4 className="text-xl font-bold mb-8 text-zinc-900 dark:text-white relative z-10">Join the Conversation</h4>
                    <form onSubmit={handleCommentSubmit} className="relative z-10">
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <div className="md:col-span-1">
                                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-zinc-400"
                                    placeholder="John Doe"
                                    value={newComment.author_name}
                                    onChange={e => setNewComment({ ...newComment, author_name: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">Message</label>
                                <textarea
                                    required
                                    rows="1"
                                    className="w-full bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-zinc-400 min-h-[50px] resize-y"
                                    placeholder="What are your thoughts?"
                                    value={newComment.content}
                                    onChange={e => setNewComment({ ...newComment, content: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-sm">
                                Post Comment
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;
