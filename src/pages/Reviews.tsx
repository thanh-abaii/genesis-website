import React, { useEffect, useState } from 'react';
import { Star, Calendar, Quote, Share } from 'lucide-react';

interface Review {
  id: number;
  reviewer: string;
  rating: number;
  review: string;
  date: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Load reviews data
    fetch('/data/reviews.json')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        
        // Calculate average rating
        const avg = data.reduce((sum: number, review: Review) => sum + review.rating, 0) / data.length;
        setAverageRating(avg);
      })
      .catch(err => console.error('Error loading reviews:', err));
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareReview = (review: Review) => {
    const text = `"${review.review}" - ${review.reviewer}`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'Đánh giá Genesis',
        text: text,
        url: url,
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${text}\n\n${url}`);
      alert('Đã sao chép đánh giá vào clipboard!');
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const starSize = size === 'lg' ? 'w-8 h-8' : 'w-5 h-5';
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${starSize} ${
              i < rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-white mb-4">
            Đánh giá từ giới chuyên môn
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
            Những lời khen ngợi và đánh giá từ các nhà phê bình, chuyên gia và tổ chức báo chí hàng đầu 
            về cuốn sách Genesis.
          </p>
          
          {/* Rating Summary */}
          <div className="chapter-card p-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(averageRating), 'lg')}
              <p className="text-gray-400 mt-2">
                Dựa trên {reviews.length} đánh giá chuyên môn
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {reviews.map((review) => (
            <div key={review.id} className="chapter-card p-8 relative">
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[var(--color-purple)]/30" />
              
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                    {review.reviewer}
                  </h3>
                  <div className="flex items-center space-x-4">
                    {renderStars(review.rating)}
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(review.date)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => shareReview(review)}
                  className="p-2 text-gray-400 hover:text-[var(--color-turquoise)] transition-colors"
                  title="Chia sẻ đánh giá"
                >
                  <Share className="w-5 h-5" />
                </button>
              </div>

              {/* Review Content */}
              <div className="relative">
                <p className="text-gray-300 leading-relaxed text-lg italic">
                  "{review.review}"
                </p>
              </div>

              {/* Bottom Border */}
              <div className="absolute bottom-0 left-8 right-8 h-1 gradient-bg rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Review Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            "name": "Genesis: Trí tuệ nhân tạo, Hy vọng và Tinh thần Nhân đạo",
            "author": [
              {
                "@type": "Person",
                "name": "Henry A. Kissinger"
              },
              {
                "@type": "Person", 
                "name": "Eric Schmidt"
              },
              {
                "@type": "Person",
                "name": "Craig Mundie"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": averageRating.toFixed(1),
              "reviewCount": reviews.length,
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": reviews.map(review => ({
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": "5"
              },
              "author": {
                "@type": "Organization",
                "name": review.reviewer
              },
              "reviewBody": review.review,
              "datePublished": review.date
            }))
          })}
        </script>

        {/* What Critics Say Section */}
        <div className="mt-16">
          <h2 className="font-montserrat font-bold text-3xl text-white text-center mb-12">
            Các nhà phê bình nói gì?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 gradient-bg rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                Tính cấp thiết
              </h3>
              <p className="text-gray-400 text-sm">
                "Một cuốn sách cần thiết cho thời đại của chúng ta"
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 gradient-bg rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                Tầm nhìn toàn diện
              </h3>
              <p className="text-gray-400 text-sm">
                "Góc nhìn đa chiều từ chính trị, công nghệ và chiến lược"
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 gradient-bg rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                Giá trị thực tiễn
              </h3>
              <p className="text-gray-400 text-sm">
                "Đặc biệt có giá trị cho các nhà lãnh đạo và hoạch định chính sách"
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="chapter-card p-8 max-w-3xl mx-auto">
            <h3 className="font-montserrat font-bold text-2xl text-white mb-4">
              Tham gia cùng hàng nghìn độc giả
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Genesis đã nhận được sự đánh giá cao từ các chuyên gia hàng đầu và được 
              độc giả trên toàn thế giới tin tưởng. Hãy trở thành một phần của cộng đồng 
              những người hiểu biết về tương lai AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3 rounded-lg font-semibold">
                Mua sách ngay
              </button>
              <button 
                onClick={() => {
                  const url = window.location.href;
                  if (navigator.share) {
                    navigator.share({
                      title: 'Genesis - Đánh giá',
                      text: `Khám phá những đánh giá tuyệt vời về cuốn sách Genesis`,
                      url: url,
                    });
                  } else {
                    navigator.clipboard.writeText(url);
                    alert('Đã sao chép link vào clipboard!');
                  }
                }}
                className="px-8 py-3 border-2 border-[var(--color-turquoise)] text-[var(--color-turquoise)] rounded-lg font-semibold hover:bg-[var(--color-turquoise)] hover:text-white transition-all"
              >
                Chia sẻ đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
