import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const BlogList = ({ blogs }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <Table striped>
      <tbody>
        {blogs.sort(byLikes).map((blog) => (
          <tr key={blog.id} className="blog">
            <td>
              <Link to={`/blogs/${blog.id}`}>
                <i>{blog.title}</i> by {blog.author}{" "}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BlogList;
