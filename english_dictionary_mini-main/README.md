# 📚 English Dictionary Mini

English Dictionary Mini App - Ứng dụng từ điển tiếng Anh nhỏ gọn, giao diện đẹp, dễ sử dụng. Tìm kiếm từ tiếng Anh và khám phá nghĩa, từ đồng nghĩa, cách phát âm.

🔗 **Live Demo:** [https://hoangductinh2804-lgtm.github.io/english-dictionary-mini/](https://hoangductinh2804-lgtm.github.io/english-dictionary-mini/)

---

## ✨ Tính Năng

- 🔍 **Tìm kiếm từ**: Nhập từ bất kỳ và tìm kiếm ngay lập tức
- 📝 **Định nghĩa chi tiết**: Hiển thị các nghĩa khác nhau của từ
- 🔊 **Phát âm**: Nghe cách phát âm từ đó bằng âm thanh
- 📚 **Từ đồng nghĩa (Synonyms)**: Xem các từ có nghĩa tương tự
- 🔄 **Từ trái nghĩa (Antonyms)**: Xem các từ có nghĩa đối lập
- 📱 **Responsive Design**: Thích ứng hoàn hảo trên mọi thiết bị (desktop, tablet, mobile)
- ⚡ **Real-time Search**: Kết quả hiển thị nhanh chóng
- 🎨 **Giao diện đẹp**: Thiết kế hiện đại với gradient colors và animations

---

## 🛠️ Công Nghệ Sử Dụng

- **HTML5**: Cấu trúc website
- **CSS3**: Styling và responsive design
- **JavaScript (Vanilla)**: Logic ứng dụng
- **Free Dictionary API**: API từ điển miễn phí

### API Sử Dụng
- **Tên:** Free Dictionary API
- **URL:** `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- **Mô tả:** API miễn phí cung cấp dữ liệu từ điển Anh đầy đủ

---

## 📂 Cấu Trúc Project

```
english-dictionary-mini/
├── index.html              # File HTML chính
├── styles/
│   └── style.css          # File CSS (styling & responsive design)
├── scripts/
│   └── app.js             # File JavaScript (logic ứng dụng)
├── assets/                # Thư mục chứa hình ảnh, icon (nếu có)
├── README.md              # File hướng dẫn
└── .gitignore             # Git ignore file
```

---

## 🚀 Hướng Dẫn Sử Dụng

### Cách 1: Sử dụng trực tiếp trên web
1. Truy cập: [https://hoangductinh2804-lgtm.github.io/english-dictionary-mini/](https://hoangductinh2804-lgtm.github.io/english-dictionary-mini/)
2. Nhập từ bất kỳ trong ô tìm kiếm
3. Nhấp nút "🔍 Search" hoặc nhấn Enter

### Cách 2: Chạy cục bộ trên máy

**Yêu cầu:**
- Git đã cài đặt
- Trình duyệt web (Chrome, Firefox, Safari, Edge, v.v.)

**Các bước:**

1. **Clone repository:**
```bash
git clone https://github.com/hoangductinh2804-lgtm/english-dictionary-mini.git
cd english-dictionary-mini
```

2. **Mở với Live Server (VS Code):**
   - Cài đặt extension "Live Server"
   - Nhấp chuột phải vào `index.html` → "Open with Live Server"

3. **Hoặc dùng Python HTTP Server:**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
   - Truy cập: `http://localhost:8000`

---

## 📖 Hướng Dẫn Chi Tiết

### Tìm kiếm từ
1. Nhập từ vào ô "Enter a word..."
2. Nhấp nút "🔍 Search" hoặc nhấn phím Enter
3. Kết quả sẽ hiển thị ngay lập tức

### Xem phát âm
1. Sau khi tìm kiếm, nhấp nút "🔊" ở cạnh tên từ
2. Âm thanh sẽ phát tự động

### Tìm kiếm từ đồng nghĩa/trái nghĩa
1. Scroll xuống phần "Synonyms" hoặc "Antonyms"
2. Nhấp vào bất kỳ từ nào để tìm kiếm nó

### Responsive Design
- **Desktop**: Xem toàn bộ giao diện đầy đủ
- **Tablet**: Layout thích ứng với màn hình nhỏ hơn
- **Mobile**: Hiển thị tối ưu cho điện thoại di động

---

## 🧪 Test Cases

### Test Case 1: Tìm từ thường
- **Input:** "hello"
- **Kỳ vọng:** Hiển thị định nghĩa, phát âm, từ đồng nghĩa

### Test Case 2: Tìm từ không tồn tại
- **Input:** "xyzabc123"
- **Kỳ vọng:** Hiển thị lỗi "Sorry, we couldn't find the word..."

### Test Case 3: Nhập trống
- **Input:** ""
- **Kỳ vọng:** Hiển thị thông báo "Please enter a word!"

### Test Case 4: Test phát âm
- **Hành động:** Nhấp nút 🔊
- **Kỳ vọng:** Phát âm từ được nghe rõ

### Test Case 5: Test responsive
- **Hành động:** Mở trên mobile/tablet
- **Kỳ vọng:** Layout thích ứng đúng cách, không bị lỗi

### Test Case 6: Test tìm kiếm từ đồng nghĩa
- **Hành động:** Nhấp vào từ đồng nghĩa
- **Kỳ vọng:** Tìm kiếm từ đó ngay lập tức

---

## 🎨 Tính Năng Thiết Kế

### Màu sắc
- **Gradient Primary:** #667eea → #764ba2 (tím xanh)
- **Background:** Linear gradient động
- **Text:** Tối (dark) cho dễ đọc
- **Accent:** Xanh lam cho các thành phần tương tác

### Typography
- **Font:** Segoe UI, Tahoma, Geneva, Verdana
- **Heading:** 2.5rem (bold)
- **Body:** 16px (regular)

### Animations
- Slide Up: Hiệu ứng khi kết quả hiển thị
- Spin: Loading spinner
- Hover Effects: Nút và tags có hiệu ứng khi hover

---

## 🐛 Xử Lý Lỗi

### Lỗi 404 - Từ không tìm thấy
```
"Sorry, we couldn't find the word "xyz". Try another one!"
```
**Giải pháp:** Kiểm tra lại chính tả từ

### Lỗi Network - Không có kết nối Internet
```
"An error occurred. Please try again!"
```
**Giải pháp:** Kiểm tra kết nối Internet của bạn

### Lỗi API
- API có thể offline đôi khi
- **Giải pháp:** Chờ vài giây và thử lại

---

## 📈 Tính Năng Có Thể Thêm Sau

- 🌙 Dark Mode
- ❤️ Yêu thích (Favorites)
- 📜 Lịch sử tìm kiếm (History)
- 🗣️ Nhiều ngôn ngữ
- 💾 Offline Mode (lưu cache)
- 🎯 Advanced Search Filters

---

## 🤝 Đóng Góp

Nếu bạn muốn đóng góp cho dự án này:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/improvement`)
3. Commit thay đổi (`git commit -m 'Add improvement'`)
4. Push lên branch (`git push origin feature/improvement`)
5. Tạo Pull Request

---

## 📄 License

Dự án này sử dụng **MIT License** - Bạn tự do sử dụng, sửa đổi và phân phối.

---

## 📞 Liên Hệ

- **GitHub:** [@hoangductinh2804-lgtm](https://github.com/hoangductinh2804-lgtm)
- **Email:** (Thêm email của bạn nếu muốn)

---

## 🙏 Cảm Ơn

Cảm ơn đã sử dụng English Dictionary Mini!

Nếu bạn thích dự án này, hãy:
- ⭐ **Star** repository này
- 🔗 **Fork** để sử dụng và cải tiến
- 📢 **Chia sẻ** với bạn bè

---

**Made with ❤️ by [hoangductinh2804-lgtm](https://github.com/hoangductinh2804-lgtm)**

Last Updated: 2026-03-23
