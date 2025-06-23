import React, { useEffect, useState } from 'react';
import { Search, Filter, Tag, Quote } from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  part: string;
  summary: string;
  key_ideas: string[];
  quote: string;
  tags: string[];
}

const Chapters: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    // Load chapters data
    fetch('/data/chapters.json')
      .then(res => res.json())
      .then(data => {
        setChapters(data);
        setFilteredChapters(data);
        
        // Extract all unique tags
        const tags = [...new Set(data.flatMap((chapter: Chapter) => chapter.tags))] as string[];
        setAllTags(tags);
      })
      .catch(err => console.error('Error loading chapters:', err));
  }, []);

  useEffect(() => {
    // Filter chapters based on search term and selected tags
    let filtered = chapters;

    if (searchTerm) {
      filtered = filtered.filter(chapter =>
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.key_ideas.some(idea => idea.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(chapter =>
        selectedTags.some(tag => chapter.tags.includes(tag))
      );
    }

    setFilteredChapters(filtered);
  }, [searchTerm, selectedTags, chapters]);

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

  const parts = [
    'Phần I: Trong sự Khởi đầu',
    'Phần II: Bốn nhánh',
    'Phần III: Cây Sự sống'
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-white mb-4">
            Tóm tắt các chương
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Khám phá từng chương của Genesis với những tóm tắt chi tiết, ý tưởng chính và trích dẫn tiêu biểu. 
            Sử dụng tìm kiếm và bộ lọc để tìm nội dung bạn quan tâm.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm chương, nội dung..."
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
                Xóa bộ lọc ({filteredChapters.length} kết quả)
              </button>
            </div>
          )}
        </div>

        {/* Chapters by Parts */}
        {parts.map(part => {
          const partChapters = filteredChapters.filter(chapter => chapter.part === part);
          
          if (partChapters.length === 0) return null;

          return (
            <div key={part} className="mb-12">
              <h2 className="font-montserrat font-bold text-2xl md:text-3xl gradient-text mb-8 text-center">
                {part}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {partChapters.map(chapter => (
                  <div key={chapter.id} className="chapter-card p-8">
                    {/* Chapter Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[var(--color-turquoise)] font-semibold">
                          Chương {chapter.id}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {chapter.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-[var(--color-purple)]/20 text-[var(--color-icy)] rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h3 className="font-montserrat font-bold text-xl text-[var(--color-purple)] mb-3">
                        {chapter.title}
                      </h3>
                    </div>

                    {/* Summary */}
                    <div className="mb-6">
                      <p className="text-gray-300 leading-relaxed">
                        {chapter.summary}
                      </p>
                    </div>

                    {/* Key Ideas */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3">Ý tưởng chính:</h4>
                      <ul className="space-y-2">
                        {chapter.key_ideas.map((idea, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-[var(--color-turquoise)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-300 text-sm">{idea}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quote */}
                    <div className="border-l-4 border-[var(--color-purple)] pl-4 py-2 bg-[var(--color-purple)]/5 rounded-r">
                      <Quote className="w-5 h-5 text-[var(--color-purple)] mb-2" />
                      <p className="text-gray-300 italic leading-relaxed">
                        "{chapter.quote}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* No Results */}
        {filteredChapters.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="font-montserrat font-bold text-xl text-white mb-2">
              Không tìm thấy kết quả
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

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="chapter-card p-8 max-w-2xl mx-auto">
            <h3 className="font-montserrat font-bold text-2xl text-white mb-4">
              Muốn đọc toàn bộ cuốn sách?
            </h3>
            <p className="text-gray-400 mb-6">
              Những tóm tắt này chỉ là phần nhỏ trong cuốn sách đầy ý nghĩa. 
              Khám phá toàn bộ nội dung với những phân tích sâu sắc và chi tiết hơn.
            </p>
            <button className="btn-primary px-8 py-3 rounded-lg font-semibold">
              Mua sách ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapters;
