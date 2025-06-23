import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Tag, Search } from 'lucide-react';

interface Topic {
  id: number;
  title: string;
  description: string;
  chapters: number[];
  tags: string[];
}

interface Chapter {
  id: number;
  title: string;
  part: string;
}

const Topics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    // Load topics and chapters data
    Promise.all([
      fetch('/data/topics.json').then(res => res.json()),
      fetch('/data/chapters.json').then(res => res.json())
    ])
      .then(([topicsData, chaptersData]) => {
        setTopics(topicsData);
        setChapters(chaptersData);
        setFilteredTopics(topicsData);
        
        // Extract all unique tags
        const tags = [...new Set(topicsData.flatMap((topic: Topic) => topic.tags))] as string[];
        setAllTags(tags);
      })
      .catch(err => console.error('Error loading data:', err));
  }, []);

  useEffect(() => {
    // Filter topics based on search term and selected tags
    let filtered = topics;

    if (searchTerm) {
      filtered = filtered.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(topic =>
        selectedTags.some(tag => topic.tags.includes(tag))
      );
    }

    setFilteredTopics(filtered);
  }, [searchTerm, selectedTags, topics]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  const getChaptersByIds = (chapterIds: number[]) => {
    return chapters.filter(chapter => chapterIds.includes(chapter.id));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-white mb-4">
            Chủ đề chính
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Khám phá 7 chủ đề cốt lõi xuyên suốt cuốn Genesis, từ tác động của AI đến bản chất con người 
            cho đến việc quản lý công nghệ một cách có trách nhiệm.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm chủ đề..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0B0B14] border border-[var(--color-icy)]/30 rounded-lg text-white placeholder-gray-400 focus:border-[var(--color-turquoise)] focus:outline-none"
            />
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-[var(--color-turquoise)] text-white'
                    : 'bg-[#0B0B14] text-gray-400 border border-[var(--color-icy)]/30 hover:border-[var(--color-turquoise)]'
                }`}
              >
                <Tag className="inline w-3 h-3 mr-1" />
                {tag}
              </button>
            ))}
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedTags.length > 0) && (
            <div className="text-center">
              <button
                onClick={clearFilters}
                className="text-[var(--color-turquoise)] hover:text-[var(--color-purple)] transition-colors"
              >
                Xóa bộ lọc ({filteredTopics.length} kết quả)
              </button>
            </div>
          )}
        </div>

        {/* Topics Grid */}
        <div className="space-y-8">
          {filteredTopics.map((topic, index) => {
            const relatedChapters = getChaptersByIds(topic.chapters);
            
            return (
              <div key={topic.id} className="chapter-card p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Topic Content */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 bg-[var(--color-purple)]/20 text-[var(--color-purple)] rounded-full text-sm font-medium">
                        Chủ đề {topic.id}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {topic.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-[var(--color-turquoise)]/20 text-[var(--color-icy)] rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 className="font-montserrat font-bold text-xl md:text-2xl text-white mb-4 leading-tight">
                      {topic.title}
                    </h2>

                    <p className="text-gray-300 leading-relaxed mb-6">
                      {topic.description}
                    </p>

                    {/* Related Chapters */}
                    <div>
                      <h3 className="font-semibold text-white mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Các chương liên quan:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {relatedChapters.map(chapter => (
                          <Link
                            key={chapter.id}
                            to="/chapters"
                            className="px-3 py-2 bg-[var(--color-bg)] border border-[var(--color-icy)]/30 rounded-lg text-sm text-gray-300 hover:border-[var(--color-turquoise)] hover:text-[var(--color-turquoise)] transition-all"
                          >
                            Ch{chapter.id}: {chapter.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className="flex items-center justify-center">
                    <div className="w-full h-48 lg:h-64 relative">
                      {/* Topic illustration based on index */}
                      <div className={`w-full h-full rounded-lg flex items-center justify-center relative overflow-hidden ${
                        index % 2 === 0 ? 'gradient-bg' : 'bg-[var(--color-bg)] border-2 border-[var(--color-purple)]'
                      }`}>
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">
                              {topic.id}
                            </span>
                          </div>
                          <div className="text-white/80 text-sm font-medium">
                            {topic.chapters.length} chương
                          </div>
                        </div>
                        
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="font-montserrat font-bold text-xl text-white mb-2">
              Không tìm thấy chủ đề nào
            </h3>
            <p className="text-gray-400 mb-6">
              Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary px-6 py-3 rounded-lg font-medium"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Navigation to Chapters */}
        <div className="mt-16 text-center">
          <div className="chapter-card p-8 max-w-2xl mx-auto">
            <h3 className="font-montserrat font-bold text-2xl text-white mb-4">
              Muốn đọc chi tiết hơn?
            </h3>
            <p className="text-gray-400 mb-6">
              Khám phá từng chương để hiểu sâu hơn về những chủ đề này 
              với các phân tích chi tiết và trích dẫn từ cuốn sách.
            </p>
            <Link
              to="/chapters"
              className="btn-primary px-8 py-3 rounded-lg font-semibold inline-flex items-center"
            >
              Xem tóm tắt chương
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;
