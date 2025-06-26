import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Award, Briefcase } from 'lucide-react';

// Define the Author interface including the new slug
interface Author {
  name: string;
  slug: string;
  title: string;
  bio: string;
  expertise: string[];
}

// This data is duplicated from Authors.tsx. For a real application,
// this should be moved into the authors.json file or a shared service.
const authorAchievementsData = [
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

const AuthorDetail: React.FC = () => {
  const { authorSlug } = useParams<{ authorSlug: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/authors.json')
      .then(res => res.json())
      .then((data: Author[]) => {
        const foundAuthor = data.find(a => a.slug === authorSlug);
        setAuthor(foundAuthor || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading authors:', err);
        setLoading(false);
      });
  }, [authorSlug]);

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

  if (loading) {
    return <div className="text-center text-white py-20">Đang tải...</div>;
  }

  if (!author) {
    return (
      <div className="text-center text-white py-20">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy tác giả</h2>
        <Link to="/authors" className="text-[var(--color-turquoise)] hover:underline">
          Quay lại danh sách tác giả
        </Link>
      </div>
    );
  }

  const achievements = authorAchievementsData.find(a => a.author === author.name)?.achievements || [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/authors" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách tác giả
          </Link>
        </div>

        <div className="chapter-card p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Author Photo */}
                <div className="flex justify-center md:justify-start">
                    <img
                        src={getAuthorImage(author.name)}
                        alt={author.name}
                        className="w-48 h-48 md:w-64 md:h-64 rounded-2xl shadow-2xl object-cover"
                    />
                </div>

                {/* Author Info */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h1 className="font-montserrat font-bold text-3xl md:text-5xl text-white mb-2">
                            {author.name}
                        </h1>
                        <p className="text-[var(--color-turquoise)] text-lg md:text-xl font-semibold mb-4">
                            {author.title}
                        </p>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        {author.bio}
                    </p>

                    {/* Expertise */}
                    <div>
                        <h3 className="font-montserrat font-semibold text-white mb-3 flex items-center text-xl">
                            <Briefcase className="w-5 h-5 mr-2" />
                            Chuyên môn
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
                        <h3 className="font-montserrat font-semibold text-white mb-3 flex items-center text-xl">
                            <Award className="w-5 h-5 mr-2" />
                            Thành tựu nổi bật
                        </h3>
                        <ul className="space-y-2 list-disc list-inside">
                            {achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="text-gray-300">
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
