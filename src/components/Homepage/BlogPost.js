import React from "react";

const BlogPost = ({ imgLink, blogTitle, blogBody }) => {
  return (
    <div className="blogpost glass-card">
      <div className="blog-img blog-img-glass">
        <img src={`${imgLink}`} alt={blogTitle} className="blog-img-main" />
        <div className="blog-img-overlay"></div>
      </div>
      <div className="blog-text">
        <h3 className="blog-title">{blogTitle}</h3>
        <p className="blog-body">{blogBody}</p>
      </div>
    </div>
  );
};

export default BlogPost;
