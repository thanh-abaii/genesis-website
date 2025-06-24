import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full md:w-[80%] mx-auto chapter-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold gradient-text">TALK: KHỞI NGUYÊN CHO MỘT THỜI ĐẠI MỚI - CHÚNG TA SẼ ĐI VỀ ĐÂU?</CardTitle>
            <CardDescription>Giới thiệu sách “Khởi Nguyên - Trí tuệ nhân tạo, niềm hi vọng và tinh thần nhân loại”</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Badge className="gradient-bg">Thời gian:</Badge> 20h00-22h00, Thứ Sáu, ngày 27/06/2025
            </div>
            <div className="mb-4">
              <Badge className="gradient-bg">Địa điểm:</Badge> Trực tuyến qua nền tảng ZOOM
            </div>
            <div className="mb-4">
              <Badge className="gradient-bg">Link đăng ký:</Badge> <a href="https://forms.gle/FppnoeGMu6g9q3Vi6" target="_blank" rel="noopener noreferrer" className="text-[var(--color-turquoise)] hover:underline">Đăng ký tham dự</a>
            </div>
            <div className="mb-4">
              <Badge className="gradient-bg">Tìm hiểu thêm:</Badge> <a href="https://omegaplus.vn/khoi-nguyen" target="_blank" rel="noopener noreferrer" className="text-[var(--color-turquoise)] hover:underline">Về cuốn sách</a>
            </div>
            <div className="mb-4">
              <Badge className="gradient-bg">Diễn giả:</Badge>
              <ul className="list-none pl-0">
                <li className="flex items-center mb-2">
                  <img src="/public/images/authors/dao-trung-thanh.jpg" alt="Đào Trung Thành" className="w-20 h-20 rounded-full mr-2" />
                  <span>Đào Trung Thành - Phó Viện trưởng Viện Công nghệ Blockchain và Trí tuệ nhân tạo (ABAII), chuyên gia trong lĩnh vực chuyển đổi số và AI tại Việt Nam.</span>
                </li>
                <li className="flex items-center mb-2">
                  <img src="/public/images/authors/nguyen-quy-tien.jpg" alt="Nguyễn Quý Tiến" className="w-20 h-20 rounded-full mr-2" />
                  <span>Nguyễn Quý Tiến - Dịch giả, đồng sáng lập Oddly Normal, người chuyển ngữ “Khởi Nguyên - Trí tuệ nhân tạo, niềm hi vọng và tinh thần nhân loại” sang tiếng Việt.</span>
                </li>
                <li className="flex items-center mb-2">
                  <img src="/public/images/authors/ngo-di-lan.jpg" alt="Ngô Di Lân" className="w-20 h-20 rounded-full mr-2" />
                  <span>Host: Ngô Di Lân - Tiến sĩ Quan hệ quốc tế, giảng viên Học viện Ngoại giao.</span>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <Badge className="gradient-bg">Mô tả:</Badge>
              Sự kiện giới thiệu cuốn sách "Khởi Nguyên" và thảo luận về tác động của trí tuệ nhân tạo đến đời sống, công nghệ, và xã hội. Với sự tham gia của các diễn giả có kinh nghiệm trong lĩnh vực công nghệ và quan hệ quốc tế.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Events;
