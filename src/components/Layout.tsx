import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Trang chủ' },
    { path: '/chapters', label: 'Tóm tắt chương' },
    { path: '/topics', label: 'Chủ đề' },
    { path: '/reviews', label: 'Đánh giá' },
    { path: '/resources', label: 'Tài liệu' },
    { path: '/events', label: 'Sự kiện' },
    { path: '/authors', label: 'Tác giả' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Navigation */}
      <nav className="navbar-glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-white font-montserrat font-bold text-xl">Genesis</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-[var(--color-turquoise)]'
                      : 'text-white hover:text-[var(--color-icy)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-white hover:text-[var(--color-icy)] transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a href="https://shop.alphabooks.vn/genesis-khoi-nguyen-tri-tue-nhan-tao-niem-hi-vong-va-tinh-than-nhan-loai-henry-kissinger-p39107451.html" target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-2 rounded-md font-medium">
                Mua sách
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-white hover:text-[var(--color-icy)] transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[var(--color-bg)] border-t border-[var(--color-icy)]/20">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-[var(--color-turquoise)]'
                      : 'text-white hover:text-[var(--color-icy)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 text-white hover:text-[var(--color-icy)] transition-colors"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  <span>Chế độ sáng</span>
                </button>
              </div>
              <div className="px-3 py-2">
                <a href="https://shop.alphabooks.vn/genesis-khoi-nguyen-tri-tue-nhan-tao-niem-hi-vong-va-tinh-than-nhan-loai-henry-kissinger-p39107451.html" target="_blank" rel="noopener noreferrer" className="btn-primary w-full px-4 py-2 rounded-md font-medium">
                  Mua sách
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0B0B14] border-t border-[var(--color-icy)]/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="text-white font-montserrat font-bold text-xl">Genesis</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Khám phá tương lai của trí tuệ nhân tạo và tác động của nó đối với nhân loại. 
                Cuốn sách do Henry Kissinger, Eric Schmidt và Craig Mundie đồng sáng tác.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2">
                {navItems.slice(0, 3).map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-gray-400 hover:text-[var(--color-icy)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Chia sẻ</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[var(--color-icy)] transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-[var(--color-icy)] transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-[var(--color-icy)] transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--color-icy)]/20 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Genesis Website. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
