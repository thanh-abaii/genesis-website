import React, { useEffect, useState } from 'react';
import { ExternalLink, Award, Users, BookOpen, Briefcase } from 'lucide-react';

interface Author {
  name: string;
  title: string;
  bio: string;
  expertise: string[];
}

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    // Load authors data
    fetch('/data/authors.json')
      .then(res => res.json())
      .then(data => setAuthors(data))
      .catch(err => console.error('Error loading authors:', err));
  }, []);

  const getAuthorImage = (name: string) => {
    let imagePath = '';
    if (name === 'Henry A. Kissinger') {
      imagePath = '/images/authors/henry-kissinger.jpg';
    } else if (name === 'Eric Schmidt') {
      imagePath = '/images/authors/eric-schmidt.jpg';
    } else if (name === 'Craig Mundie') {
      imagePath = '/images/authors/craig-mundie.jpg';
    }
    return imagePath;
  };

  const getAuthorColor = (index: number) => {
    const colors = [
      'bg-gradient-to-br from-purple-500 to-purple-700',
      'bg-gradient-to-br from-blue-500 to-blue-700',
      'bg-gradient-to-br from-teal-500 to-teal-700',
    ];
    return colors[index % colors.length];
  };

  const authorAchievements = [
    {
      author: 'Henry A. Kissinger',
      achievements: [
        'Giải Nobel Hòa bình 1973',
        'Ngoại trưởng Hoa Kỳ (1973-1977)',
        'Cố vấn An ninh Quốc gia (1969-1975)',
        'Tác giả của hơn 20 cuốn sách'
      ]
    },
    {
      author: 'Eric Schmidt',
      achievements: [
        'CEO Google (2001-2011)',
        'Executive Chairman Alphabet',
        'Chairman Defense Innovation Board',
        'Cựu CTO Sun Microsystems'
      ]
    },
    {
      author: 'Craig Mundie',
      achievements: [
        'Chief Research Officer Microsoft',
        'Senior Advisor Microsoft (20+ năm)',
        'Chuyên gia về AI và Computing',
        'Đồng sáng lập nhiều startup công nghệ'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-white mb-4">
            Về các tác giả
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Ba nhà lãnh đạo tư tưởng hàng đầu thế giới về công nghệ, chính sách và chiến lược, 
            mang đến những góc nhìn độc đáo và kinh nghiệm thực tế quý báu.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="space-y-16">
          {authors.map((author, index) => {
            const achievements = authorAchievements.find(a => a.author === author.name)?.achievements || [];
            
            return (
              <div key={author.name} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Author Photo/Avatar */}
                <div className={`flex justify-center ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative">
                    <img
                      src={getAuthorImage(author.name)}
                      alt={author.name}
                      className="w-64 h-64 md:w-80 md:h-80 rounded-2xl shadow-2xl object-cover"
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 gradient-bg rounded-full opacity-20 blur-xl"></div>
                  </div>
                </div>

                {/* Author Info */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <h2 className="font-montserrat font-bold text-2xl md:text-4xl text-white mb-2">
                      {author.name}
                    </h2>
                    <p className="text-[var(--color-turquoise)] text-base md:text-lg font-semibold mb-4">
                      {author.title}
                    </p>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {author.bio}
                  </p>

                  {/* Expertise */}
                  <div>
                    <h3 className="font-montserrat font-semibold text-white mb-3 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Chuyên môn:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {author.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-4 py-2 bg-[var(--color-purple)]/20 text-[var(--color-icy)] rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="font-montserrat font-semibold text-white mb-3 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Thành tựu nổi bật:
                    </h3>
                    <ul className="space-y-2">
                      {achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-[var(--color-turquoise)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Collaboration Section */}
        <div className="mt-20">
          <div className="chapter-card p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="font-montserrat font-bold text-3xl text-white mb-6">
                Sự hợp tác độc đáo
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Genesis là kết quả của sự hợp tác hiếm có giữa ba nhà lãnh đạo tư tưởng từ các lĩnh vực khác nhau: 
                ngoại giao và chính sách quốc tế, công nghệ và doanh nghiệp, cùng nghiên cứu và phát triển. 
                Sự kết hợp này tạo nên một góc nhìn toàn diện và cân bằng về tương lai của trí tuệ nhân tạo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-purple)]/20 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-[var(--color-purple)]" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-white mb-2">
                    Kinh nghiệm chính sách
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Hiểu biết sâu về địa chính trị và quan hệ quốc tế
                  </p>
                </div>
                
                <div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-turquoise)]/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-[var(--color-turquoise)]" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-white mb-2">
                    Kinh nghiệm doanh nghiệp
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Thực tiễn quản lý và phát triển công nghệ quy mô lớn
                  </p>
                </div>
                
                <div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-[var(--color-icy)]/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-[var(--color-icy)]" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-white mb-2">
                    Chuyên môn kỹ thuật
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Hiểu biết chuyên sâu về công nghệ và nghiên cứu AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Works */}
        <div className="mt-16">
          <h2 className="font-montserrat font-bold text-3xl text-white text-center mb-12">
            Các tác phẩm khác
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="chapter-card p-6">
              <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                The Age of AI
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Henry Kissinger, Eric Schmidt, Daniel Huttenlocher
              </p>
              <p className="text-gray-300 text-sm">
                Cuốn sách tiền nhiệm về tác động của AI đối với tương lai nhân loại
              </p>
            </div>
            
            <div className="chapter-card p-6">
              <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                How Google Works
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Eric Schmidt, Jonathan Rosenberg
              </p>
              <p className="text-gray-300 text-sm">
                Kinh nghiệm quản lý và phát triển doanh nghiệp công nghệ
              </p>
            </div>
            
            <div className="chapter-card p-6">
              <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                World Order
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Henry A. Kissinger
              </p>
              <p className="text-gray-300 text-sm">
                Phân tích về trật tự thế giới và quan hệ quốc tế hiện đại
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="chapter-card p-8 max-w-2xl mx-auto">
            <h3 className="font-montserrat font-bold text-2xl text-white mb-4">
              Đọc Genesis ngay hôm nay
            </h3>
            <p className="text-gray-400 mb-6">
              Khám phá những hiểu biết sâu sắc từ ba nhà tư tưởng hàng đầu về 
              tương lai của trí tuệ nhân tạo và tác động của nó đối với nhân loại.
            </p>
            <a href="https://shop.alphabooks.vn/genesis-khoi-nguyen-tri-tue-nhan-tao-niem-hi-vong-va-tinh-than-nhan-loai-henry-kissinger-p39107451.html" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3 rounded-lg font-semibold">
              Mua sách ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authors;
