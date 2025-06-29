import React from 'react';

function Post({ username, img, postImg, caption }) {
  return (
    <div style={{border: '1px solid #dbdbdb', borderRadius: 4, marginBottom: 24, background: '#fff', maxWidth: 500}}>
      <div style={{display: 'flex', alignItems: 'center', padding: 12}}>
        <img src={img} alt={username} style={{width: 40, height: 40, borderRadius: '50%', marginRight: 10}} />
        <strong>{username}</strong>
      </div>
      <img src={postImg} alt="post" style={{width: '100%', maxHeight: 400, objectFit: 'cover'}} />
      <div style={{padding: 12}}>
        <div style={{fontSize: 20, marginBottom: 8}}>❤️ 💬 ➡️</div>
        <div>
          <strong>{username}</strong> {caption}
        </div>
      </div>
    </div>
  );
}

export default Post;
