# 📚 Từ Điển Tiếng Anh Mini

Ứng dụng Từ Điển Tiếng Anh Mini - Ứng dụng từ điển tiếng Anh nhỏ gọn, giao diện đẹp, dễ sử dụng. Tìm kiếm từ tiếng Anh và khám phá nghĩa, từ đồng nghĩa, cách phát âm.

🔗 **Bản chạy thử:** [https://hoangductinh2804-lgtm.github.io/english-dictionary-mini/](https://hoangductinh2804-lgtm.github.io/english-dictionary-mini/)

---

## ✨ Tính Năng

- 🔍 **Tìm kiếm từ**: Nhập từ bất kỳ và tìm kiếm ngay lập tức
- 📝 **Định nghĩa chi tiết**: Hiển thị các nghĩa khác nhau của từ
- 🔊 **Phát âm**: Nghe cách phát âm từ đó bằng âm thanh
- 📚 **Từ đồng nghĩa**: Xem các từ có nghĩa tương tự
- 🔄 **Từ trái nghĩa**: Xem các từ có nghĩa đối lập
- 📱 **Thiết kế thích ứng**: Thích ứng hoàn hảo trên mọi thiết bị (máy tính, máy tính bảng, điện thoại)
- ⚡ **Tìm kiếm theo thời gian thực**: Kết quả hiển thị nhanh chóng
- 🎨 **Giao diện đẹp**: Thiết kế hiện đại với màu chuyển sắc và hiệu ứng chuyển động

---

## 🛠️ Công Nghệ Sử Dụng

- **HTML5**: Cấu trúc website
- **CSS3**: Tạo kiểu giao diện và thiết kế thích ứng
- **JavaScript (Vanilla)**: Logic ứng dụng
- **Free Dictionary API**: Dịch vụ API từ điển miễn phí

### API Sử Dụng
- **Tên:** Free Dictionary API
- **URL:** `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- **Mô tả:** API miễn phí cung cấp dữ liệu từ điển Anh đầy đủ

---

## 📂 Cấu Trúc Dự Án

```
english-dictionary-mini/
├── index.html              # File HTML chính
├── styles/
│   └── style.css          # File CSS (giao diện và responsive)
├── scripts/
│   └── app.js             # File JavaScript (logic ứng dụng)
├── assets/                # Thư mục chứa hình ảnh, icon (nếu có)
├── README.md              # File hướng dẫn
└── .gitignore             # Khai báo file bỏ qua của Git
```

---

## 🚀 Hướng Dẫn Sử Dụng

### Cách 1: Sử dụng trực tiếp trên web
1. Truy cập: [https://hoangductinh2804-lgtm.github.io/english-dictionary-mini/](https://hoangductinh2804-lgtm.github.io/english-dictionary-mini/)
2. Nhập từ bất kỳ trong ô tìm kiếm
3. Nhấp nút "🔍 Tìm kiếm" hoặc nhấn Enter

### Cách 2: Chạy cục bộ trên máy

**Yêu cầu:**
- Git đã cài đặt
- Trình duyệt web (Chrome, Firefox, Safari, Edge, v.v.)

**Các bước:**

1. **Sao chép kho mã:**
```bash
git clone https://github.com/hoangductinh2804-lgtm/english-dictionary-mini.git
cd english-dictionary-mini
```

2. **Mở với Live Server (VS Code):**
   - Cài đặt tiện ích mở rộng "Live Server"
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
1. Nhập từ vào ô "Nhập một từ..."
2. Nhấp nút "🔍 Tìm kiếm" hoặc nhấn phím Enter
3. Kết quả sẽ hiển thị ngay lập tức

### Xem phát âm
1. Sau khi tìm kiếm, nhấp nút "🔊" ở cạnh tên từ
2. Âm thanh sẽ phát tự động

### Tìm kiếm từ đồng nghĩa/trái nghĩa
1. Cuộn xuống phần "Từ đồng nghĩa" hoặc "Từ trái nghĩa"
2. Nhấp vào bất kỳ từ nào để tìm kiếm nó

### Thiết kế thích ứng
- **Máy tính**: Xem toàn bộ giao diện đầy đủ
- **Máy tính bảng**: Bố cục thích ứng với màn hình nhỏ hơn
- **Điện thoại**: Hiển thị tối ưu cho thiết bị di động

---

## 🧪 Kịch Bản Kiểm Thử

### Kịch bản 1: Tìm từ thường
- **Đầu vào:** "hello"
- **Kỳ vọng:** Hiển thị định nghĩa, phát âm, từ đồng nghĩa

### Kịch bản 2: Tìm từ không tồn tại
- **Đầu vào:** "xyzabc123"
- **Kỳ vọng:** Hiển thị lỗi "Không tìm thấy từ ... Hãy thử từ khác!"

### Kịch bản 3: Nhập trống
- **Đầu vào:** ""
- **Kỳ vọng:** Hiển thị thông báo "Vui lòng nhập một từ!"

### Kịch bản 4: Kiểm thử phát âm
- **Hành động:** Nhấp nút 🔊
- **Kỳ vọng:** Phát âm từ được nghe rõ

### Kịch bản 5: Kiểm thử responsive
- **Hành động:** Mở trên mobile/tablet
- **Kỳ vọng:** Layout thích ứng đúng cách, không bị lỗi

### Kịch bản 6: Kiểm thử tìm kiếm từ đồng nghĩa
- **Hành động:** Nhấp vào từ đồng nghĩa
- **Kỳ vọng:** Tìm kiếm từ đó ngay lập tức

---

## 🎨 Tính Năng Thiết Kế

### Màu sắc
- **Gradient Primary:** #667eea → #764ba2 (tím xanh)
- **Nền:** Màu chuyển sắc động
- **Chữ:** Màu tối để dễ đọc
- **Accent:** Xanh lam cho các thành phần tương tác

### Kiểu chữ
- **Font:** Segoe UI, Tahoma, Geneva, Verdana
- **Heading:** 2.5rem (bold)
- **Body:** 16px (regular)

### Hiệu ứng chuyển động
- Slide Up: Hiệu ứng khi kết quả hiển thị
- Spin: Vòng tròn tải dữ liệu
- Hover: Nút và thẻ có hiệu ứng khi rê chuột

---

## 🐛 Xử Lý Lỗi

### Lỗi 404 - Từ không tìm thấy
```
"Không tìm thấy từ \"xyz\". Hãy thử từ khác!"
```
**Giải pháp:** Kiểm tra lại chính tả từ

### Lỗi mạng - Không có kết nối Internet
```
"Đã xảy ra lỗi. Vui lòng thử lại!"
```
**Giải pháp:** Kiểm tra kết nối Internet của bạn

### Lỗi API
- API có thể tạm thời không phản hồi
- **Giải pháp:** Chờ vài giây và thử lại

---

## 📈 Tính Năng Có Thể Thêm Sau

- 🌙 Chế độ tối
- ❤️ Mục yêu thích
- 📜 Lịch sử tìm kiếm
- 🗣️ Nhiều ngôn ngữ
- 💾 Chế độ ngoại tuyến (lưu bộ nhớ đệm)
- 🎯 Bộ lọc tìm kiếm nâng cao

---

## 🤝 Đóng Góp

Nếu bạn muốn đóng góp cho dự án này:

1. Fork kho mã
2. Tạo branch mới (`git checkout -b feature/improvement`)
3. Commit thay đổi (`git commit -m 'Add improvement'`)
4. Push lên branch (`git push origin feature/improvement`)
5. Tạo Pull Request để đề xuất thay đổi

---

## 📄 Giấy Phép

Dự án này sử dụng **MIT License** - Bạn tự do sử dụng, sửa đổi và phân phối.

---

## 📞 Liên Hệ

- **GitHub:** [@hoangductinh2804-lgtm](https://github.com/hoangductinh2804-lgtm)
- **Email:** (Thêm email của bạn nếu muốn)

---

## 🙏 Cảm Ơn

Cảm ơn bạn đã sử dụng Từ Điển Tiếng Anh Mini!

Nếu bạn thích dự án này, hãy:
- ⭐ **Star** kho mã này
- 🔗 **Fork** để sử dụng và cải tiến
- 📢 **Chia sẻ** với bạn bè

---

**Được thực hiện bởi [hoangductinh2804-lgtm](https://github.com/hoangductinh2804-lgtm)**

Cập nhật lần cuối: 2026-03-23
