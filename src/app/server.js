const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);


server.get('/get-listpost', (req, res) => {
    const posts = router.db.get('posts').value();
    res.json(posts);
  });
server.get('/get-post/:id', (req, res) => {
  const postId = parseInt(req.params.id); // Lấy giá trị id từ URL parameter và chuyển đổi sang kiểu số nguyên
  const posts = router.db.get('posts');
  // Kiểm tra nếu bài viết có tồn tại trong danh sách posts
  const postIndex = posts.find(post => post.id === postId).value();
  // const posts = router.db.get('posts').value();
  // res.json(posts);
  if (postIndex !== -1) {
    res.json( postIndex);
  } else {
    res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  }
});
server.post('/post-createpost', (req, res) => {
  const { title, body } = req.body;

  // Lấy danh sách bài viết hiện tại từ cơ sở dữ liệu
  const posts = router.db.get('posts');

  // Tạo một ID tự tăng cho bản ghi mới
  const lastPost = posts.value().slice(-1)[0];
  const lastId = lastPost ? lastPost.id : 0;
  const newPost = { id: lastId + 1, title, body };

  // Thêm bài viết mới vào danh sách bài viết
  posts.push(newPost).write();

  res.json({ success: true, message: 'Thêm new post thành công', post: newPost });
});
server.delete('/delete-deletepost/:id', (req, res) => {
  const postId = parseInt(req.params.id); // Lấy giá trị id từ URL parameter và chuyển đổi sang kiểu số nguyên
  const posts = router.db.get('posts');
  // Kiểm tra nếu bài viết có tồn tại trong danh sách posts
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1).write(); // Xóa bài viết khỏi danh sách và lưu lại

    res.json({ success: true, message: 'Xóa bài viết thành công', posts: posts});
  } else {
    res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  }
});

server.put('/put-updatepost', (req, res) => {
  const postId = parseInt(req.body.id);
  const { title, body } = req.body; // Lấy id, title và body từ request body

  const posts = router.db.get('posts');
  const post = posts.find({id: postId});

  if (post) {
    post.assign({ title, body }).write(); // Cập nhật title và body của bài viết

    res.json({ success: true, message: 'Cập nhật bài viết thành công'});
  } else {
    res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  }
});


server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});