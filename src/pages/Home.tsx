import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Users, BookOpen, Brain } from 'lucide-react';

interface BookInfo {
  title: string;
  subtitle: string;
  authors: string[];
  description: string;
  cover_image: string;
}

interface Review {
  id: number;
  reviewer: string;
  rating: number;
  review: string;
  date: string;
}

const Home: React.FC = () => {
  const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Load book info
    fetch('/data/book-info.json')
      .then(res => res.json())
      .then(data => setBookInfo(data))
      .catch(err => console.error('Error loading book info:', err));

    // Load reviews
    fetch('/data/reviews.json')
      .then(res => res.json())
      .then(data => setReviews(data.slice(0, 2))) // Only show first 2 reviews
      .catch(err => console.error('Error loading reviews:', err));
  }, []);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "8 Chương Sâu Sắc",
      description: "Khám phá từng khía cạnh của AI và tác động của nó"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "3 Tác Giả Uy Tín",
      description: "Henry Kissinger, Eric Schmidt, Craig Mundie"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Kiến Thức Toàn Diện",
      description: "Từ khoa học đến chính trị, từ kinh tế đến an ninh"
    }
  ];

  if (!bookInfo) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-bg h-96 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Text Content */}
              <div className="text-white">
                <h1 className="font-montserrat font-bold text-4xl md:text-6xl leading-tight mb-6">
                  Genesis – <br />
                  <span className="text-white/90">Khởi Nguyên</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                  {bookInfo.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center">
                    Mua sách ngay
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                  <Link 
                    to="/chapters"
                    className="px-8 py-4 border-2 border-white text-white rounded-lg text-lg font-semibold inline-flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all"
                  >
                    Khám phá nội dung
                  </Link>
                </div>
              </div>

              {/* Book Cover */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img
                    src={bookInfo.cover_image}
                    alt="Bìa sách Genesis – Khởi Nguyên"
                    className="w-80 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-4 -right-4 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
              Tại sao nên đọc Genesis?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Cuốn sách mang đến cái nhìn toàn diện về tương lai AI từ những chuyên gia hàng đầu thế giới
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="chapter-card p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-bg rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-montserrat font-semibold text-xl text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authors Preview */}
      <section className="py-20 bg-[#0B0B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
              Về các tác giả
            </h2>
            <p className="text-gray-400 text-lg">
              Ba nhà lãnh đạo tư tưởng hàng đầu về công nghệ và chính sách
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bookInfo.authors.map((author, index) => (
              <div key={index} className="text-center">
<img
  src={author === "Henry A. Kissinger" ? "/images/authors/henry-kissinger.jpg" : `/images/authors/${author.toLowerCase().replace(/ /g, '-')}.jpg`}
  alt={author}
  className="w-32 h-32 mx-auto mb-6 rounded-full object-cover"
/>
                <h3 className="font-montserrat font-semibold text-xl text-white mb-2">
                  {author}
                </h3>
                {index === 0 && <p className="text-gray-400">Cựu Ngoại trưởng Hoa Kỳ</p>}
                {index === 1 && <p className="text-gray-400">Cựu CEO Google</p>}
                {index === 2 && <p className="text-gray-400">Cựu CTO Microsoft</p>}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/authors"
              className="inline-flex items-center text-[var(--color-turquoise)] hover:text-[var(--color-purple)] transition-colors font-semibold"
            >
              Tìm hiểu thêm về tác giả
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-20 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
              Đánh giá từ giới chuyên môn
            </h2>
            <p className="text-gray-400 text-lg">
              Những lời khen ngợi từ các nhà phê bình và chuyên gia hàng đầu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {reviews.map((review) => (
              <div key={review.id} className="chapter-card p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-400 text-sm">
                    {new Date(review.date).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  "{review.review}"
                </p>
                <p className="text-[var(--color-turquoise)] font-semibold">
                  — {review.reviewer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/reviews"
              className="inline-flex items-center text-[var(--color-turquoise)] hover:text-[var(--color-purple)] transition-colors font-semibold"
            >
              Xem tất cả đánh giá
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0B0B14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-6">
            Bắt đầu hành trình khám phá tương lai
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Tham gia cùng hàng triệu độc giả trên thế giới khám phá những hiểu biết sâu sắc 
            về tương lai của trí tuệ nhân tạo và tác động của nó đối với nhân loại.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold">
              Mua sách ngay
            </button>
            <Link
              to="/chapters"
              className="px-8 py-4 border-2 border-[var(--color-turquoise)] text-[var(--color-turquoise)] rounded-lg text-lg font-semibold hover:bg-[var(--color-turquoise)] hover:text-white transition-all"
            >
              Đọc tóm tắt miễn phí
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
