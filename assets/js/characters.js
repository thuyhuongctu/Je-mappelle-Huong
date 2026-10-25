/* Dàn nhân vật và câu trả lời viết sẵn — chép nguyên văn từ index.html gốc.
   Hương là người thật; Mai, Linh, Tùng, An, Minh là nhân vật hư cấu của trang viên. */
window.NGUOI = [
  {
    id: 'huong', chu: true,
    ten: "Je m'appelle Hương",
    vai: { vi: 'Nghiên cứu sinh Quản trị kinh doanh', en: 'PhD candidate in Business Administration' },
    cho: [0, -3.4], ao: '#fffcf5', quan: '#f4efe4', da: '#f0c9a8', toc: '#6b4430', dai: true,
    chao: {
      vi: 'Chào bạn. Mình là nghiên cứu sinh Quản trị kinh doanh ở Trường Kinh tế, Đại học Cần Thơ. Luận án của mình về quốc tế hóa và hiệu quả hoạt động kinh doanh của doanh nghiệp châu Á. Cứ hỏi nhé — các câu dưới đây mình đã viết sẵn câu trả lời.',
      en: "Hello. I'm a PhD candidate in Business Administration at the School of Economics, Can Tho University. My dissertation is on internationalization and firm performance among Asian enterprises. Ask away — the answers below are written in advance."
    },
    hoi: [
      { q: { vi: 'Luận án của chị nghiên cứu gì?', en: 'What does your dissertation study?' },
        a: { vi: 'Quan hệ giữa quốc tế hóa và hiệu quả hoạt động kinh doanh của doanh nghiệp, ở vùng châu Á - Thái Bình Dương. Khung dữ liệu là khảo sát doanh nghiệp của Ngân hàng Thế giới (WBES) trên 50 nền kinh tế, ghép với bộ chỉ số quản trị toàn cầu (WGI) theo cặp quốc gia - năm.',
             en: 'The relationship between internationalization and firm performance across the Asia-Pacific. The data frame is the World Bank Enterprise Surveys across 50 economies, matched to the Worldwide Governance Indicators by country-year.' } },
      { q: { vi: 'Phân tích tổng hợp của chị lớn cỡ nào?', en: 'How large is your meta-analysis?' },
        a: { vi: 'Bảng mã hóa đang được kiểm toán lại, đối chiếu từng giá trị với bài gốc, nên quy mô cuối cùng sẽ công bố sau khi bảng được khóa lại. Phương pháp là phân tích tổng hợp hiệu ứng ngẫu nhiên, cùng với kinh tế lượng doanh nghiệp và kiểm định điều tiết.',
             en: 'The coding table is being re-audited against the primary studies, value by value, so the final size will be reported once it is re-locked. The method is random-effects meta-analysis, alongside firm-level econometrics and moderation tests.' } },
      { q: { vi: 'M-AIDA là gì?', en: 'What is M-AIDA?' },
        a: { vi: 'Phần mềm mình phát triển song song với luận án: trích xuất mức độ ảnh hưởng từ PDF bằng mô hình ngôn ngữ lớn, kiểm chứng con người 100%, rồi khóa bất biến. Mã nguồn mở, lưu trữ trên Zenodo.',
             en: 'Software I built alongside the dissertation: effect-size extraction from PDFs with large language models, 100% human verification, then immutable locking. Open-source, archived on Zenodo.' } },
      { q: { vi: 'Chị dạy những học phần nào?', en: 'Which courses do you teach?' },
        a: { vi: 'Tám học phần, trong đó sáu có học liệu mở đã công bố: Phương pháp nghiên cứu (M-AIDA), Phân tích hoạt động kinh doanh (CVP Studio và CMR Lab), Kinh doanh quốc tế (Hộ Chiếu Thương Hiệu), Mô phỏng tình huống trong kinh doanh (BizOn), Khởi nghiệp (EnQuiz), và Kỹ năng giao tiếp - soạn thảo văn bản (ComDraft). Danh sách đầy đủ ở mục Giảng dạy trên trang chủ.',
             en: 'Eight courses, six of which have published open material: Research Methods (M-AIDA), Business Performance Analysis (CVP Studio and CMR Lab), International Business (Brand Passport), Business Simulation (BizOn), Entrepreneurship (EnQuiz), and Communication & Document Drafting (ComDraft). The full list is in the Teaching section of the homepage.' } },
      { q: { vi: 'Học phần Kinh doanh quốc tế dùng gì?', en: 'What does the International Business course use?' },
        a: { vi: '«Hộ Chiếu Thương Hiệu» — mô phỏng chiến lược quốc tế hóa sáu quý: chọn một trong sáu thị trường, chọn phương thức thâm nhập (xuất khẩu, cấp phép, nhượng quyền, liên doanh, liên minh, nền tảng số, đầu tư trực tiếp) rồi chịu hệ quả của lựa chọn ấy.',
             en: 'Brand Passport — a six-quarter internationalization strategy simulation: pick one of six markets, pick an entry mode (export, licensing, franchising, joint venture, alliance, digital platform, FDI), then live with the consequences.' } },
      { q: { vi: 'Hai phòng lab CVP Studio và CMR Lab khác nhau gì?', en: 'How do CVP Studio and CMR Lab differ?' },
        a: { vi: 'CVP Studio làm đồ thị CVP, điểm hòa vốn, lợi nhuận mục tiêu và biên an toàn. CMR Lab làm số dư đảm phí và đòn bẩy kinh doanh. Hai buổi chuyên đề khác nhau, dùng được độc lập.',
             en: 'CVP Studio covers the CVP chart, break-even, target profit and margin of safety. CMR Lab covers contribution margin and operating leverage. Two separate sessions, each usable on its own.' } },
      { q: { vi: 'Các nhân vật ở đây là người thật à?', en: 'Are the people here real?' },
        a: { vi: 'Chỉ mình là người thật. Năm người còn lại là nhân vật của trang viên — Mai, Linh, Tùng, An và Minh — hư cấu cả, không ứng với ai ngoài đời. Trang này cố ý không đưa đồng nghiệp hay người hướng dẫn vào, vì đó là chuyện phải hỏi ý họ trước.',
             en: "Only me. The other five are characters from the estate — Mai, Linh, Tung, An and Minh — all fictional, not portraits of anyone. This page deliberately leaves out colleagues and supervisors, because that would need their consent first." } },
      { q: { vi: 'Trang này có gửi gì ra ngoài không?', en: 'Does this page send anything out?' },
        a: { vi: 'Không. Không một lời gọi mạng nào. Mọi câu trả lời nằm sẵn trong tệp, three.js lấy từ bản chép trong kho, bộ chữ cũng tự chứa. Đóng mạng thì trang vẫn chạy y hệt.',
             en: 'No. Not a single network call. Every answer is written into the file, three.js is served from a copy in the repository, and the fonts are self-hosted too. Pull the network and the page behaves identically.' } }
    ]
  },
  {
    id: 'mai', ten: 'Mai', vai: { vi: 'Người nghiên cứu thực địa', en: 'Field researcher' },
    anh: 'assets/img/npc-mai.webp',
    dung: 'assets/img/npc-mai-dung.webp', dungTL: 0.3707,
    cho: [-5.2, -1.0], ao: '#3f6f68', quan: '#2d3a36', da: '#e8bd97', toc: '#241a12',
    chao: { vi: 'Mình là Mai, người nghiên cứu thực địa của trang viên. Mình lo phần số liệu.',
            en: "I'm Mai, the estate's field researcher. The data side is mine." },
    hoi: [
      { q: { vi: 'Số liệu của luận án lấy từ đâu?', en: 'Where does the dissertation data come from?' },
        a: { vi: 'Khảo sát doanh nghiệp của Ngân hàng Thế giới — WBES — trên 50 nền kinh tế châu Á - Thái Bình Dương, ghép với bộ chỉ số quản trị toàn cầu WGI theo cặp quốc gia - năm.',
             en: 'The World Bank Enterprise Surveys across 50 Asia-Pacific economies, matched to the Worldwide Governance Indicators by country-year.' } },
      { q: { vi: 'Vì sao phải ghép theo cặp quốc gia - năm?', en: 'Why match by country-year?' },
        a: { vi: 'Vì chất lượng thể chế đổi theo thời gian. Ghép đúng năm khảo sát thì mới nói được doanh nghiệp ấy hoạt động trong môi trường thể chế nào, chứ không phải môi trường của mười năm sau.',
             en: 'Because institutional quality changes over time. Matching the survey year is what lets you say which institutional setting a firm actually operated in — not the one ten years later.' } }
    ]
  },
  {
    id: 'linh', ten: 'Linh', vai: { vi: 'Người giữ Thư viện sáng tạo', en: 'Keeper of the Creative Library' },
    anh: 'assets/img/npc-linh.webp',
    dung: 'assets/img/npc-linh-dung.webp', dungTL: 0.3476,
    cho: [5.0, -1.0], ao: '#b8842c', quan: '#4a3a24', da: '#f2cba6', toc: '#2b1d12',
    chao: { vi: 'Linh đây, mình giữ Thư viện sáng tạo. Hỏi mình chuyện công bố với tài liệu.',
            en: "Linh here, I keep the Creative Library. Ask me about publications and materials." },
    hoi: [
      { q: { vi: 'Tìm danh mục công bố đầy đủ ở đâu?', en: 'Where is the full publication list?' },
        a: { vi: 'Trang Công bố có danh mục lọc được theo loại và theo năm. Bản chính thức thì nằm trên ORCID — đó mới là chỗ trích dẫn.',
             en: 'The publications page has the list, filterable by type and year. The authoritative record is on ORCID — that is what you cite.' } },
      { q: { vi: 'M-AIDA có phải phần mềm mở không?', en: 'Is M-AIDA open source?' },
        a: { vi: 'Có, mã nguồn mở và lưu trữ trên Zenodo. Nó trích xuất mức độ ảnh hưởng từ PDF bằng mô hình ngôn ngữ lớn, nhưng 100% được người kiểm lại rồi mới khoá bất biến.',
             en: 'Yes — open-source and archived on Zenodo. It extracts effect sizes from PDFs with large language models, but every one is human-verified before it is locked.' } }
    ]
  },
  {
    id: 'tung', ten: 'Tùng', vai: { vi: 'Người làm ở Dự án đang mở', en: 'Open Projects maker' },
    anh: 'assets/img/npc-tung.webp',
    dung: 'assets/img/npc-tung-dung.webp', dungTL: 0.4549,
    cho: [-5.0, 3.0], ao: '#c45c3a', quan: '#3a2a22', da: '#f0c49f', toc: '#3a2415',
    chao: { vi: 'Tùng, mình làm ở khu Dự án đang mở. Phần mềm nào cũng qua tay mình.',
            en: "Tung. I work in Open Projects — every piece of software passes through here." },
    hoi: [
      { q: { vi: 'Có những phần mềm nào?', en: 'What software is there?' },
        a: { vi: 'M-AIDA cho phương pháp nghiên cứu, BizOn cho mô phỏng kinh doanh, EnQuiz cho khởi nghiệp, ComDraft cho kỹ năng soạn thảo, và hai phòng lab CVP Studio với CMR Lab cho phân tích hoạt động kinh doanh.',
             en: 'M-AIDA for research methods, BizOn for business simulation, EnQuiz for entrepreneurship, ComDraft for document drafting, and two labs — CVP Studio and CMR Lab — for business performance analysis.' } },
      { q: { vi: 'Học phần Kinh doanh quốc tế dùng cái nào?', en: 'Which one does International Business use?' },
        a: { vi: 'Hộ Chiếu Thương Hiệu — mô phỏng quốc tế hóa sáu quý. Bảng trên tường kia kể bảy phương thức thâm nhập và lý thuyết neo cho từng bậc.',
             en: 'Brand Passport — a six-quarter internationalization simulation. The board on that wall lists the seven entry modes and the theory anchoring each rung.' } }
    ]
  },
  {
    id: 'an', ten: 'An', vai: { vi: 'Người giữ Bảng tin', en: 'Noticeboard archivist' },
    anh: 'assets/img/npc-an.webp',
    dung: 'assets/img/npc-an-dung.webp', dungTL: 0.3834,
    cho: [5.0, 3.2], ao: '#6b7f5a', quan: '#32392a', da: '#e9bf9b', toc: '#271a11',
    chao: { vi: 'An, mình giữ Bảng tin. Có gì mới mình đều ghi lại.',
            en: "An, I keep the noticeboard. Anything new gets written down here." },
    hoi: [
      { q: { vi: 'Trang này có gửi gì ra ngoài không?', en: 'Does this page send anything out?' },
        a: { vi: 'Không một lời gọi mạng nào. Câu trả lời nằm sẵn trong tệp, three.js lấy từ bản chép trong kho, bộ chữ cũng tự chứa. Đóng mạng thì trang chạy y hệt.',
             en: 'Not a single network call. The answers are written into the file, three.js is served from a copy in the repository, and the fonts are self-hosted. Pull the network and nothing changes.' } },
      { q: { vi: 'Các nhân vật ở đây là ai?', en: 'Who are the people here?' },
        a: { vi: 'Hương là người thật. Còn bốn người kia với mình là nhân vật của trang viên — Mai, Linh, Tùng và Minh — cùng một nhà, chỉ sang đây làm việc.',
             en: 'Huong is real. The rest of us — Mai, Linh, Tung, Minh and me — are the estate\'s characters, from the same household, just working over here.' } }
    ]
  },
  {
    id: 'minh', ten: 'Minh', vai: { vi: 'Người giữ bến nhạc', en: 'Keeper of the music dock' },
    anh: 'assets/img/npc-minh.webp',
    dung: 'assets/img/npc-minh-dung.webp', dungTL: 0.4085,
    cho: [-4.2, 6.4], ao: '#7a6a8c', quan: '#332c3c', da: '#f2cdaa', toc: '#20160f',
    chao: { vi: 'Minh, giữ bến nhạc. Ở đây yên quá thì ghé bến mình - máy trên bàn đang có sẵn một bài.',
            en: "Minh, keeper of the music dock. If it is too quiet here, come down to the dock - there is a track cued up on the desk." },
    nhac: {
      tep: 'assets/audio/returning-to-shore.mp3',
      ten: 'Returning to Shore',
      phu: { vi: 'Đĩa đơn, ngoài album · 5:49. Nhạc vẫn chạy khi bạn đi tiếp; quay lại chỗ Minh để tắt.',
             en: 'A single, outside the album · 5:49. The music keeps playing as you walk on; come back to Minh to stop it.' }
    },
    hoi: [
      { q: { vi: 'Bài đang có trên máy là bài gì?', en: 'What is the track on the player?' },
        a: { vi: '«Returning to Shore» - trở về bờ, một đĩa đơn ngoài album, lời của chị Hương, phần nhạc dựng bằng công cụ sinh nhạc, thu tháng 9/2026. Phần lời và ghi chú đầy đủ nằm ở trang Âm nhạc.',
             en: '«Returning to Shore», a single outside the album - lyrics by Hương, music produced with a music-generation tool, recorded in September 2026. The full lyrics and notes are on the music page.' } },
      { q: { vi: 'Bến nhạc có gì?', en: 'What is at the music dock?' },
        a: { vi: 'Trang Âm nhạc: 28 bản thu, sáu bài chính cùng một bản bonus, có cả phần lời và ghi chú về từng bài.',
             en: 'The music page: 28 recordings, six main tracks plus a bonus, with lyrics and notes for each.' } }
    ]
  }

];
