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
                setArticles([
                    { id: 1, title: 'Strategies for Modern Web Development', created_at: '2023-10-27', content: 'Exploring the shift towards server-side rendering and static generation in modern web frameworks...' },
                    { id: 2, title: 'The Future of AI in Design', created_at: '2023-10-28', content: 'How generative models are assisting designers in creating more user-centric interfaces and workflows...' },
                    { id: 3, title: 'Understanding Minimalist Interfaces', created_at: '2023-10-29', content: 'Less is more: why cognitive load matters in 2024 application design and how to achieve clarity...' },
                ]);
            });
    }, []);

    if (loading) return (
        <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                    <span className="gradient-text">Latest Insights</span>
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    Exploring the intersection of technology, design, and innovation.
                    Deep dives into the ideas shaping our digital future.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="glass-panel p-8 rounded-3xl h-full min-h-[320px] flex flex-col justify-between border-transparent animate-pulse">
                        <div className="w-full">
                            <div className="w-24 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6"></div>
                            <div className="w-full h-8 bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-4"></div>
                            <div className="w-2/3 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-6"></div>
                            <div className="space-y-3">
                                <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                                <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                                <div className="w-4/5 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                            </div>
                        </div>
                        <div className="w-32 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full mt-8"></div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                    <span className="gradient-text">Latest Insights</span>
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    Exploring the intersection of technology, design, and innovation.
                    Deep dives into the ideas shaping our digital future.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <article
                        key={article.id}
                        className="group relative flex flex-col justify-between glass-panel p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/10 h-full min-h-[320px]"
                    >
                        <div className="w-full">
                            <div className="flex items-center gap-3 text-xs font-bold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                <Link to={`/articles/${article.id}`}>
                                    <span className="absolute inset-0"></span>
                                    {article.title}
                                </Link>
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                                {article.content}
                            </p>
                        </div>

                        <div className="flex items-center text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-auto">
                            Read Full Story <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;
