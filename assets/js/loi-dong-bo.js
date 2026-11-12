/* Lời theo mốc thời gian, rút từ kho Chansonia (cùng tác giả, cùng bản thu).
   Mốc đo trên chính các tệp mp3 phục vụ cho trang: lệch 0,02-0,03 giây trên
   cả bảy bài album. Hai bài biển đảo lấy nhạc từ kho trò chơi, đã đối chiếu
   qua API GitHub là tệp có thật.

   Khoá là TÊN TỆP, vì `hat-theo.js` cắt phần cuối của thuộc tính src. Tên
   của chín tệp này không trùng nhau nên khoá theo tên là đủ.

   `min` = mốc đủ dày để chữ chạy theo nhạc. Ngưỡng 45 giây mỗi khổ. Bài nào
   không đạt thì chỉ cho bấm vào một khổ để nhảy tới đúng giây, không giả vờ
   đồng bộ - mốc thưa tới 303 giây một khổ thì khối chữ sáng rồi đứng yên
   hàng phút, nhìn y như trang hỏng.

   KHÔNG thay lời đang có trên trang: đây là dữ liệu riêng cho bảng hát theo. */
window.LOI_DONG_BO = {
 "track01.mp3": {
  ten:"Je voudrais te parler", dai:170.952, min:false, khuc:[
   {n:"Khổ 1",g:6.838,d:["Je voudrais poser mes mains, arrêter d'écrire un peu,", "je voudrais dormir sans compter les heures.", "Je voudrais qu'on me demande comment je vais,", "et pouvoir répondre autre chose que «ça va».", "Je voudrais qu'on regarde mon visage", "sans y chercher ce qui ne va pas.", "Je voudrais qu'on sache que si je suis fatiguée,", "c'est parce que j'ai porté, pas parce que j'ai cédé."]},
   {n:"Điệp khúc",g:104.888,d:["Je voudrais te parler, à toi,", "te dire ce que personne ne voit.", "Je m'appelle Hương — tu m'as donné ce nom,", "et je le porte encore, même quand tout est trop lourd.", "Je voudrais te parler, une nuit,", "juste une nuit, et puis dormir."]}
  ]},
 "track02-den-van-con-sang.mp3": {
  ten:"La lampe brûle encore", dai:313.416, min:false, khuc:[
   {n:"Khổ 1",g:12.536,d:["Em muốn đặt đôi tay xuống một lần,", "cho trang giấy ngủ yên bên cửa sổ.", "Cho đêm trôi như con nước thật chậm,", "không đếm giờ, không gọi sớm bình minh.", "Ngày còn bé, nhà mình từng rất rộng,", "dẫu chỉ vừa đủ một mái hiên thôi.", "Rồi một chiều, chiếc ghế bỗng im tiếng,", "từ đó về sau chẳng có ai ngồi.", "Em lớn lên bên người còn ở lại,", "gom nắng chiều hong ấm những mùa đông.", "Mẹ không kể những ngày xa xưa nữa,", "chỉ thắp đèn khi trời xuống bên sông.", "Có những khoảng trời không ai nhìn thấy,", "vẫn theo mình qua hết những mùa sau.", "Không thành vết thương để người ta hỏi,", "chỉ thành một khoảng lặng rất sâu."]},
   {n:"Chuyển khúc",g:175.740,d:["Nếu em đi chậm lại, dòng sông vẫn trôi mà.", "Nếu em khép mắt lại, ngọn đèn vẫn ở nhà."]},
   {n:"Điệp khúc",g:199.218,d:["Je voudrais te parler, à toi, về một người em nhớ mà không gọi.", "Về một bàn tay từng ở rất gần, rồi hóa thành trời cao từ thuở ấy.", "Je m'appelle Hương — em đã lớn qua bao mùa nước nổi.", "Tên vẫn còn, căn nhà vẫn còn, chỉ một người đã đi xa mãi thôi.", "Em muốn ngồi bên nhau một đêm, không cần hỏi vì sao em lặng im.", "Ngoài kia con nước tìm về biển, còn em chỉ muốn ngủ thật yên."]}
  ]},
 "track03.mp3": {
  ten:"The Lamp Still Burns", dai:124.272, min:false, khuc:[
   {n:"Khổ 1",g:4.970,d:["Another night, another line of code,", "another river carrying the load.", "You built a world so others learn to try —", "who built a place for you to lay yours down?"]},
   {n:"Điệp khúc",g:59.903,d:["The lamp still burns, the lamp still burns,", "low and amber while the whole boat turns.", "You're not behind, you're only tired tonight —", "even the river rests before first light."]}
  ]},
 "track04-26-nam-sau-v2.mp3": {
  ten:"26 Năm Sau", dai:303.024, min:false, khuc:[
   {n:"Lời",g:12.120,d:["26 năm sau, ngọn đèn xưa vẫn sáng", "Em đi qua những dòng sông, qua những cánh rừng", "Tìm lại hộp màu đã cũ, tìm lại giấc mơ xưa", "Nhưng lần này, em vẽ bằng những dòng code xanh.", "I found the light, I found the way", "26 năm, một vòng tròn khép lại", "Je m'appelle Hương, và em đã trở về", "Với mặt trời thêu trên ngực áo, và trái tim hồng."]}
  ]},
 "track05-father-song-v2.mp3": {
  ten:"A Father's Song to His Little Girl", dai:317.472, min:true, khuc:[
   {n:"Dạo đầu",g:12.698,d:["My little girl…", "If the road feels too long, you don't have to keep walking.", "Sit beside the river, let the water carry the night.", "You don't have to be strong every moment.", "If you are tired, rest.", "I will not be angry."]},
   {n:"Khổ 1",g:30.561,d:["I remember you at six, with a box of colors,", "walking beside me along the village road,", "your little fingers holding mine.", "“Daddy, how far does the road go?” you asked.", "When your feet grew tired, I carried you upon my shoulders.", "From up there, the whole world seemed wide.", "You looked at the sky and laughed:", "“When I grow up, I want to be a painter.”", "I remember. I never forgot."]},
   {n:"Pre-Chorus",g:61.778,d:["Your dream was bigger than the sky.", "I only wished that as you grew,", "you would never lose the eyes that saw beauty."]},
   {n:"Điệp khúc",g:71.304,d:["My daughter…", "Don't be afraid of the long road.", "If you're tired, rest. If you're hurting, cry.", "You don't have to become the strongest girl in the world,", "or prove that you deserve to be loved.", "Just be yourself. That is enough.", "And if you forget who you are,", "remember the little girl with colors in her hands.", "Je m'appelle Hương.", "That was her name. She is still inside you."]},
   {n:"Khổ 2",g:102.011,d:["Then one day, I could no longer walk beside you.", "The village road remained. Your mother remained.", "Only my hand was no longer in yours.", "You learned to cross your own rivers.", "Perhaps you thought you had to be stronger than everyone.", "But listen, my daughter—", "I never wanted you to forget you were allowed to be loved."]},
   {n:"Modern Verse",g:128.210,d:["I know there are nights when everyone is asleep,", "while a little light glows on your screen.", "You read. You write. You search for answers.", "You build little worlds from lines of code.", "I may not understand everything you create,", "but whenever you create with all your heart,", "the little girl comes back.", "The girl with the box of colors.", "The girl who once looked up and said,", "“Daddy, let's go.”"]},
   {n:"Điệp khúc 2",g:160.363,d:["My daughter…", "You don't have to row so fast.", "Hold your oar. Breathe.", "Let the current teach you where to go.", "One oar may be gone, but the boat is still moving.", "And somewhere inside, the little girl is still singing:", "Je m'appelle Hương."]},
   {n:"Cầu nối",g:179.672,d:["You may think the girl who wanted to paint was left behind.", "No. She was waiting.", "Inside every line you drew.", "Inside every color you chose.", "Inside every world you built.", "She never abandoned her dream;", "she only learned a different way to hold the brush.", "Elle est encore là, je le sais."]},
   {n:"Free Time — Vọng Cổ In",g:203.149,d:["There will be days when you feel lost,", "when everything you built feels too heavy.", "Don't run. Don't be ashamed of stopping.", "Come sit by the river. Listen.", "The river does not hurry to become the sea,", "and still—it reaches it. So do you."]},
   {n:"Cao trào",g:222.543,d:["My daughter…", "I never asked you to become extraordinary.", "I only hoped you would still recognize", "the little girl who believed tomorrow could be beautiful.", "If the world becomes too loud, come home.", "And if you don't know where home is,", "come back to yourself.", "Because somewhere there, I am still holding your hand.", "Je m'appelle Hương."]},
   {n:"Father’s Farewell",g:249.847,d:["I cannot hold your hand anymore.", "But if one day you walk along an old village road,", "and the wind touches your shoulder,", "and a leaf falls quietly beside your feet,", "and your heart becomes peaceful—", "don't turn around. You don't have to look for me.", "Just think: I have walked past you. I have seen you.", "I am proud of you."]},
   {n:"Coda — Whisper",g:276.216,d:["Take the beautiful days with you.", "Take the colors. Take your mother's light. Take the river.", "Take the little girl who once sat upon my shoulders.", "Keep walking. Keep drawing. Keep building.", "And when you are tired—rest.", "Tomorrow, the river will still be there.", "The lamp will still be burning.", "And she will still be there.", "Je m'appelle Hương.", "My daughter…", "I love you.", "Go, my little girl."]}
  ]},
 "je-mappelle-huong.mp3": {
  ten:"Je m'appelle Hương", dai:373.512, min:false, khuc:[
   {n:"Khổ 1",g:14.940,d:["J'avais peut-être six ans, un petit monde entre mes mains,", "des crayons, quelques couleurs, et tout le ciel au bout du chemin.", "Papa marchait près de moi sur les petites routes du village.", "Sa main tenait la mienne, et je croyais connaître tous les voyages.", "Quand mes pas devenaient trop courts, il me prenait sur ses épaules.", "Le monde semblait plus grand, mais je n'avais peur de rien là-haut.", "Il m'emmenait dessiner, un concours, une feuille blanche, un soleil.", "Et moi, je disais simplement : «Quand je serai grande, je serai peintre.»", "C'était un rêve minuscule, grand comme une boîte de couleurs."]},
   {n:"Chuyển khúc",g:207.086,d:["Je ne savais pas encore que certaines routes se séparent sans prévenir.", "Que certaines mains quittent les nôtres sans avoir choisi de partir."]},
   {n:"Điệp khúc",g:252.508,d:["Je m'appelle Hương. Je porte encore ce nom comme je portais mes couleurs.", "Papa, quelque part dans le temps, je marche encore sur notre chemin.", "La maison est loin, le fleuve continue,", "et quelque chose de cette enfant respire toujours en moi.", "Elle est encore là, je le sais.", "La petite fille aux crayons de couleur n'est jamais vraiment partie."]}
  ]},
 "le-ciel-que-tu-nas-jamais-quitte.mp3": {
  ten:"Le ciel que tu n'as jamais quitté", dai:353.560, min:true, khuc:[
   {n:"Mở đầu",g:16.800,d:["La fille aux grands yeux couleur d'eau,", "Regarde le monde un peu plus haut.", "Dehors, tu es devenue femme,", "Mais dans tes yeux dort encore une âme", "Qui garde un ciel d'enfance, tout bleu."]},
   {n:"Khổ 1",g:42.500,d:["Tu as traversé des années immenses,", "Appris à tenir face aux changements.", "Tu ramasses en silence les absences,", "Les morceaux tombés avec le temps."]},
   {n:"Khổ 1 · tiếp",g:57.400,d:["Tu ne racontes jamais les vieux soirs,", "Le toit, les arbres, l'ombre sur le chemin.", "Mais quand le vent se remet à te voir,", "Tes yeux cherchent quelque chose au loin."]},
   {n:"Dẫn",g:74.100,d:["Je ne demande pas ce que tu perds,", "Je ne prononce pas les mots blessés.", "Il y a des silences sur cette terre", "Qu'on aime mieux ne pas réveiller."]},
   {n:"Điệp khúc",g:92.900,d:["Grandis, avance et vis encore,", "Garde pour toi ton ciel, ton trésor.", "Je n'entrerai pas dans ton enfance,", "Je ne fermerai pas cette distance.", "Et si la route fatigue ton cœur,", "Il reste une marche devant ta demeure.", "Je serai là, là où tu me vois,", "Mais pas plus près que tu ne le voudras."]},
   {n:"Khổ 2",g:120.000,d:["La fille aux grands yeux couleur d'eau,", "Garde un printemps caché sous sa peau.", "Quand les autres comptent les jours, les heures,", "Toi, tu crois encore à la lumière."]},
   {n:"Khổ 2 · tiếp",g:143.000,d:["Parfois ton rire revient sans âge,", "Puis le vent te rend silencieuse.", "Et derrière ton visage de femme sage,", "Je vois une enfant un peu rêveuse."]},
   {n:"Dẫn 2",g:166.000,d:["Je ne veux pas prendre la place", "D'un ciel absent depuis longtemps.", "Je ne veux pas que ma main efface", "Ce que tu protèges doucement."]},
   {n:"Điệp khúc 2",g:181.000,d:["Grandis, avance et vis encore,", "Ne change pas pour moi, je t'implore.", "Je veux te voir comme tu es,", "Femme et enfant, libre à jamais.", "Et si tu cherches un peu de silence,", "Sans devoir donner d'explication,", "Je resterai devant ta fenêtre,", "Pour te laisser prendre ta direction."]},
   {n:"Đoạn nói",g:209.000,d:[]},
   {n:"Đoạn nói · 2",g:218.000,d:[]},
   {n:"Đoạn nói · 3",g:231.000,d:[]},
   {n:"Đoạn nói · 4",g:246.000,d:[]},
   {n:"Điệp khúc cuối",g:262.000,d:["Grandis, avance et vis encore,", "Garde ton petit ciel, ton trésor.", "Si le monde fatigue tes épaules,", "N'oublie pas l'enfant qui s'envole.", "Je ne veux pas que tu deviennes", "Quelqu'un que ton cœur ne connaît pas.", "Je reste au bord de ton ancienne maison,", "Et c'est toi qui choisiras la saison."]},
   {n:"Điệp khúc cuối · tiếp",g:293.000,d:["Grandis, avance et vis encore,", "Même si le temps t'appelle dehors.", "Si un jour tu te retournes vers moi,", "Je serai là, tout doucement, sans voix."]},
   {n:"Kết",g:307.000,d:[]},
   {n:"Kết · tiếp",g:328.000,d:[]}
  ]},
 "bac-hai-dao-theo-canh-buom-que-huong.mp3": {
  ten:"Bắc Hải Đảo – Theo cánh buồm quê hương", dai:346.824, min:true, khuc:[
   {n:"Dạo đầu",g:0.000,d:[]},
   {n:"Khổ 1",g:38.300,d:["Trời vừa sáng, con thuyền rời bến", "Gió đưa buồm qua cửa biển xa", "Trong tay nải có lời mẹ dặn", "Trong tim người có bóng quê nhà"]},
   {n:"",g:54.300,d:["Qua sóng bạc, nhìn nhau vững dạ", "Chung tay chèo qua những đêm dài", "Dẫu phía trước còn bao điều lạ", "Vẫn bên nhau đón ánh ban mai"]},
   {n:"Tiền điệp khúc",g:70.600,d:["Từng cơn gió căng đầy cánh vải", "Từng vì sao soi sáng đường xa", "Giữa biển rộng, nghe lòng nhắc mãi", "Sau lưng mình là cả quê nhà"]},
   {n:"Điệp khúc",g:87.000,d:["Bắc Hải Đảo, căng buồm đón gió", "Mang quê hương theo mỗi cánh buồm", "Qua giông bão, chung lòng gìn giữ", "Đảo xa này nối với làng thôn"]},
   {n:"",g:104.000,d:["Bắc Hải Đảo, khắc ghi lời hẹn", "Dẫu xa xôi, lòng chẳng xa nhà", "Xin tiếp bước những người đi trước", "Giữ biển trời, gìn giữ quê ta"]},
   {n:"Nhạc dạo giữa",g:120.000,d:[]},
   {n:"Khổ 2",g:141.000,d:["Có người đã qua bao mùa gió", "Áo phai màu theo nắng ngoài khơi", "Có tên tuổi lưu trong trang sách", "Có công lao lặng giữa dòng đời", "Nay ta mở từng trang chuyện cũ", "Nghe người xưa như ở bên mình", "Mỗi dấu tích, một lời nhắn nhủ", "Bao nhọc nhằn mới có bình yên"]},
   {n:"Tiền điệp khúc",g:170.900,d:["Từng cơn gió căng đầy cánh vải", "Từng vì sao soi sáng đường xa", "Giữa biển rộng, nghe lòng nhắc mãi", "Sau lưng mình là cả quê nhà"]},
   {n:"Điệp khúc 2",g:187.100,d:["Bắc Hải Đảo, căng buồm đón gió", "Mang quê hương theo mỗi cánh buồm", "Qua giông bão, chung lòng gìn giữ", "Đảo xa này nối với làng thôn"]},
   {n:"",g:204.100,d:["Bắc Hải Đảo, khắc ghi lời hẹn", "Dẫu xa xôi, lòng chẳng xa nhà", "Xin tiếp bước những người đi trước", "Giữ biển trời, gìn giữ quê ta"]},
   {n:"Cầu nối",g:220.500,d:["Giữ biển đảo từ điều bình dị", "Một bàn tay nâng đỡ bạn mình", "Một lời hứa mang theo từ bến", "Một tấm lòng gìn giữ niềm tin", "Mai trở lại bên thềm nhà nhỏ", "Kể người nghe chuyện những chuyến đi", "Để con trẻ thêm yêu biển đảo", "Hiểu công người gìn giữ từng khi"]},
   {n:"Cao trào",g:251.100,d:["Nghe trong gió lời xưa vọng lại", "Cùng bên nhau, vững lái ra khơi"]},
   {n:"Điệp khúc cuối",g:261.900,d:["Bắc Hải Đảo, căng buồm đón gió", "Mang quê hương theo mỗi cánh buồm", "Qua giông bão, chung lòng gìn giữ", "Đảo xa này nối với làng thôn"]},
   {n:"",g:278.200,d:["Bắc Hải Đảo, khắc ghi lời hẹn", "Dẫu xa xôi, lòng chẳng xa nhà", "Xin tiếp bước những người đi trước", "Giữ biển trời, gìn giữ quê ta"]},
   {n:"Kết",g:297.100,d:["Chiều êm xuống, con thuyền về bến", "Khói lam bay trên mái nhà quen", "Lời ru cũ theo người ra biển", "Lại theo người về giữa bình yên"]},
   {n:"Câu cuối",g:315.500,d:["Bắc Hải Đảo…", "Mang quê hương theo mỗi cánh buồm…"]},
   {n:"Nhạc kết",g:327.000,d:[]}
  ]},
 "van-don-tieng-vong-non-song.mp3": {
  ten:"Vân Đồn – Tiếng vọng non sông", dai:317.232, min:true, khuc:[
   {n:"Dạo đầu",g:0.000,d:[]},
   {n:"Khổ 1",g:42.300,d:["Bình minh lên trên muôn trùng sóng", "Cánh buồm căng giữa nước trời xa", "Có người đi từ miền làng nhỏ", "Mang trong tim hình bóng quê nhà", "Một bờ tre, một lời ru mẹ", "Một dòng sông thương nhớ khôn nguôi", "Nghe non nước gọi, người đứng dậy", "Gác tình riêng, đi giữ quê hương"]},
   {n:"Tiền điệp khúc",g:70.000,d:["Nghe tiếng trống vang qua cửa biển", "Nghe lời thề hòa giữa trùng khơi", "Dẫu năm tháng phủ mờ dấu cũ", "Chí khí cha ông sáng muôn đời"]},
   {n:"Điệp khúc",g:91.500,d:["Vân Đồn ơi, vang lời sông núi", "Lớp lớp người gìn giữ biển trời", "Bao người đã qua thời lửa khói", "Cho quê hương rạng ánh ban mai", "Xin khắc ghi công người đi trước", "Giữ trong tim từng tấc đất này", "Từ trang sử, ta nghe lời nhắc", "Giữ non sông bằng cả đôi tay"]},
   {n:"Nhạc dạo giữa",g:117.800,d:[]},
   {n:"Khổ 2",g:145.500,d:["Có tên người lưu trong trang sách", "Có bao người chẳng rõ tuổi tên", "Gửi thanh xuân vào lòng biển biếc", "Cho quê nhà yên giấc đêm đêm", "Nay ta bước qua miền dấu tích", "Nghe chuyện xưa gần lại bên mình", "Lật trang sử, càng thêm thấu hiểu", "Bao hy sinh mới có thanh bình"]},
   {n:"Tiền điệp khúc",g:171.000,d:["Nghe tiếng trống vang qua cửa biển", "Nghe lời thề hòa giữa trùng khơi", "Dẫu năm tháng phủ mờ dấu cũ", "Chí khí cha ông sáng muôn đời"]},
   {n:"Điệp khúc 2",g:192.600,d:["Vân Đồn ơi, vang lời sông núi", "Lớp lớp người gìn giữ biển trời", "Bao người đã qua thời lửa khói", "Cho quê hương rạng ánh ban mai", "Xin khắc ghi công người đi trước", "Giữ trong tim từng tấc đất này", "Từ trang sử, ta nghe lời nhắc", "Giữ non sông bằng cả đôi tay"]},
   {n:"Cầu nối",g:219.700,d:["Xin tri ân người nơi chiến trận", "Cả những người ở lại quê nhà", "Càng hiểu những hy sinh thầm lặng", "Càng nâng niu cuộc sống quanh ta"]},
   {n:"Cao trào",g:233.100,d:["Từng con sóng mang lời nhắn gửi", "Người hôm nay tiếp bước người xưa"]},
   {n:"Điệp khúc cuối",g:244.900,d:["Vân Đồn ơi, vang lời sông núi", "Lớp lớp người gìn giữ biển trời", "Bao người đã qua thời lửa khói", "Cho quê hương rạng ánh ban mai", "Xin khắc ghi công người đi trước", "Giữ trong tim từng tấc đất này", "Từ trang sử, ta nghe lời nhắc", "Giữ non sông bằng cả đôi tay"]},
   {n:"Kết",g:271.700,d:["Vân Đồn ơi, ngàn năm sóng hát", "Chuyện cha ông truyền tới hôm nay", "Ta tiếp bước bằng lòng son sắt", "Giữ quê hương, dựng xây từng ngày"]},
   {n:"Câu cuối",g:288.300,d:["Vân Đồn ơi…", "Vọng tiếng non sông…"]},
   {n:"Nhạc kết",g:296.500,d:[]}
  ]},
};
