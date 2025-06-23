import React, { useEffect, useState } from 'react';
import { ExternalLink, Book, FileText, Video, Headphones, Download, Search, Filter } from 'lucide-react';

interface Resource {
  type: 'book' | 'article' | 'video' | 'podcast';
  title: string;
  authors: string[];
  description: string;
  url: string;
}

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    // Load resources data
    fetch('/data/resources.json')
      .then(res => res.json())
      .then(data => {
        setResources(data);
        setFilteredResources(data);
      })
      .catch(err => console.error('Error loading resources:', err));
  }, []);

  useEffect(() => {
    // Filter resources based on search term and type
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    setFilteredResources(filtered);
  }, [searchTerm, selectedType, resources]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <Book className="w-6 h-6" />;
      case 'article':
        return <FileText className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'podcast':
        return <Headphones className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'book':
        return 'Sách';
      case 'article':
        return 'Bài viết';
      case 'video':
        return 'Video';
      case 'podcast':
        return 'Podcast';
      default:
        return 'Tài liệu';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book':
        return 'bg-blue-500/20 text-blue-400';
      case 'article':
        return 'bg-green-500/20 text-green-400';
      case 'video':
        return 'bg-red-500/20 text-red-400';
      case 'podcast':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const resourceTypes = [
    { value: 'all', label: 'Tất cả', count: resources.length },
    { value: 'book', label: 'Sách', count: resources.filter(r => r.type === 'book').length },
    { value: 'article', label: 'Bài viết', count: resources.filter(r => r.type === 'article').length },
    { value: 'video', label: 'Video', count: resources.filter(r => r.type === 'video').length },
    { value: 'podcast', label: 'Podcast', count: resources.filter(r => r.type === 'podcast').length },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-white mb-4">
            Tài liệu tham khảo
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Khám phá thêm những tài liệu, bài viết, video và podcast liên quan đến AI, 
            công nghệ và những chủ đề được thảo luận trong Genesis.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0B0B14] border border-[var(--color-icy)]/30 rounded-lg text-white placeholder-gray-400 focus:border-[var(--color-turquoise)] focus:outline-none"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {resourceTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedType === type.value
                    ? 'bg-[var(--color-turquoise)] text-white'
                    : 'bg-[#0B0B14] text-gray-400 border border-[var(--color-icy)]/30 hover:border-[var(--color-turquoise)]'
                }`}
              >
                <Filter className="inline w-3 h-3 mr-1" />
                {type.label} ({type.count})
              </button>
            ))}
          </div>

          {/* Results Count */}
          {(searchTerm || selectedType !== 'all') && (
            <div className="text-center">
              <span className="text-gray-400">
                Hiển thị {filteredResources.length} kết quả
                {searchTerm && ` cho "${searchTerm}"`}
              </span>
            </div>
          )}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredResources.map((resource, index) => (
            <div key={index} className="chapter-card p-8 group">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(resource.type)}`}>
                    {getTypeLabel(resource.type)}
                  </span>
                </div>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-[var(--color-turquoise)] transition-colors group-hover:text-[var(--color-turquoise)]"
                  title="Mở liên kết"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              {/* Content */}
              <h3 className="font-montserrat font-bold text-lg text-white mb-3 group-hover:text-[var(--color-turquoise)] transition-colors">
                {resource.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {resource.authors.join(', ')}
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                {resource.description}
              </p>

              {/* Action Button */}
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[var(--color-bg)] border border-[var(--color-icy)]/30 rounded-lg text-white hover:border-[var(--color-turquoise)] hover:text-[var(--color-turquoise)] transition-all"
              >
                {resource.type === 'book' && 'Xem sách'}
                {resource.type === 'article' && 'Đọc bài viết'}
                {resource.type === 'video' && 'Xem video'}
                {resource.type === 'podcast' && 'Nghe podcast'}
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="font-montserrat font-bold text-xl text-white mb-2">
              Không tìm thấy tài liệu nào
            </h3>
            <p className="text-gray-400 mb-6">
              Hãy thử tìm kiếm với từ khóa khác hoặc chọn loại tài liệu khác
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}
              className="btn-primary px-6 py-3 rounded-lg font-medium"
            >
              Xem tất cả tài liệu
            </button>
          </div>
        )}

        {/* Additional Resources Section */}
        <div className="mt-16">
          <h2 className="font-montserrat font-bold text-3xl text-white text-center mb-12">
            Tài liệu được đề xuất
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="chapter-card p-6 text-center">
              <Book className="w-12 h-12 text-[var(--color-turquoise)] mx-auto mb-4" />
              <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                Sách về AI
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Các tác phẩm kinh điển và hiện đại về trí tuệ nhân tạo
              </p>
              <span className="text-[var(--color-turquoise)] text-sm font-medium">
                {resources.filter(r => r.type === 'book').length} sách
              </span>
            </div>
            
            <div className="chapter-card p-6 text-center">
              <FileText className="w-12 h-12 text-[var(--color-purple)] mx-auto mb-4" />
              <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                Nghiên cứu khoa học
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Bài viết từ các tạp chí và tổ chức nghiên cứu uy tín
              </p>
              <span className="text-[var(--color-purple)] text-sm font-medium">
                {resources.filter(r => r.type === 'article').length} bài viết
              </span>
            </div>
            
            <div className="chapter-card p-6 text-center">
              <Video className="w-12 h-12 text-[var(--color-icy)] mx-auto mb-4" />
              <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                Nội dung đa phương tiện
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Video, podcast và các nội dung tương tác khác
              </p>
              <span className="text-[var(--color-icy)] text-sm font-medium">
                {resources.filter(r => r.type === 'video' || r.type === 'podcast').length} nội dung
              </span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="chapter-card p-8 max-w-2xl mx-auto">
            <h3 className="font-montserrat font-bold text-2xl text-white mb-4">
              Muốn tìm hiểu sâu hơn?
            </h3>
            <p className="text-gray-400 mb-6">
              Khám phá toàn bộ nội dung Genesis để có cái nhìn hoàn chỉnh nhất 
              về tương lai của trí tuệ nhân tạo và tác động của nó.
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

export default Resources;
