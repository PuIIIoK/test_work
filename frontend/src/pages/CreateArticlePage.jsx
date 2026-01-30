import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

/**
 * Компонент страницы создания новой статьи
 * 
 * Предоставляет форму для создания статьи с полями title и content.
 * После успешной отправки перенаправляет на главную страницу.
 * 
 * @component
 * @returns {JSX.Element} Форма создания статьи
 */
const CreateArticlePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    /**
     * Обработчик отправки формы создания статьи
     * 
     * Отправляет данные новой статьи на backend.
     * При успехе или ошибке перенаправляет на главную страницу.
     * 
     * @param {Event} e - Событие отправки формы
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Отправка новой статьи на сервер
        api.post('/articles', { title, content })
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error("Error creating article:", error);
                // Даже при ошибке возвращаемся на главную
                navigate('/');
            });
    };

    return (
        <div className="max-w-3xl mx-auto">
            <Link to="/" className="inline-flex items-center text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-10 group">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mr-3 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors shadow-sm">
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </div>
                Cancel
            </Link>

            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Create New Article</h1>
                <p className="text-lg text-zinc-500 dark:text-zinc-400">Share your thoughts, ideas, and stories with the world.</p>
            </header>

            <div className="glass-panel p-8 md:p-12 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-black/20">
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-4 text-3xl md:text-4xl font-black text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all"
                            id="title"
                            type="text"
                            placeholder="Enter a captivating title..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all leading-relaxed resize-y min-h-[400px]"
                            id="content"
                            placeholder="Write your masterpiece here..."
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-end pt-6 border-t border-zinc-100 dark:border-zinc-800">
                        <button
                            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-4 px-10 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-sm"
                            type="submit"
                        >
                            Publish Article
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateArticlePage;
