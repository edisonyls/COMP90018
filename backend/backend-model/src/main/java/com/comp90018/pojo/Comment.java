package com.comp90018.pojo;

import org.springframework.context.annotation.EnableMBeanExport;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

//@Entity
//@Table(name = "comment")
public class Comment {
    @Id
    private String id;

    /**
     * user id of the post commented
     */
    @Column(name = "poster_id")
    private String posterId;

    /**
     * post id of the comment
     */
    @Column(name = "post_id")
    private String postId;

    /**
     * if it is a reply to a comment, then it is a sub-comment and requires an associated query
     */
    @Column(name = "father_comment_id")
    private String fatherCommentId;

    /**
     * user id of the one comments
     */
    @Column(name = "comment_user_id")
    private String commentUserId;

    /**
     * comment content
     */
    private String content;

    /**
     * total number of likes
     */
    @Column(name = "like_counts")
    private Integer likeCounts;

    /**
     * created time
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * @return id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * 获取user id of the post commented
     *
     * @return poster_id - user id of the post commented
     */
    public String getPosterId() {
        return posterId;
    }

    /**
     * 设置user id of the post commented
     *
     * @param posterId user id of the post commented
     */
    public void setPosterId(String posterId) {
        this.posterId = posterId;
    }

    /**
     * 获取post id of the comment
     *
     * @return post_id - post id of the comment
     */
    public String getPostId() {
        return postId;
    }

    /**
     * 设置post id of the comment
     *
     * @param postId post id of the comment
     */
    public void setPostId(String postId) {
        this.postId = postId;
    }

    /**
     * 获取if it is a reply to a comment, then it is a sub-comment and requires an associated query
     *
     * @return father_comment_id - if it is a reply to a comment, then it is a sub-comment and requires an associated query
     */
    public String getFatherCommentId() {
        return fatherCommentId;
    }

    /**
     * 设置if it is a reply to a comment, then it is a sub-comment and requires an associated query
     *
     * @param fatherCommentId if it is a reply to a comment, then it is a sub-comment and requires an associated query
     */
    public void setFatherCommentId(String fatherCommentId) {
        this.fatherCommentId = fatherCommentId;
    }

    /**
     * 获取user id of the one comments
     *
     * @return comment_user_id - user id of the one comments
     */
    public String getCommentUserId() {
        return commentUserId;
    }

    /**
     * 设置user id of the one comments
     *
     * @param commentUserId user id of the one comments
     */
    public void setCommentUserId(String commentUserId) {
        this.commentUserId = commentUserId;
    }

    /**
     * 获取comment content
     *
     * @return content - comment content
     */
    public String getContent() {
        return content;
    }

    /**
     * 设置comment content
     *
     * @param content comment content
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * 获取total number of likes
     *
     * @return like_counts - total number of likes
     */
    public Integer getLikeCounts() {
        return likeCounts;
    }

    /**
     * 设置total number of likes
     *
     * @param likeCounts total number of likes
     */
    public void setLikeCounts(Integer likeCounts) {
        this.likeCounts = likeCounts;
    }

    /**
     * 获取created time
     *
     * @return create_time - created time
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置created time
     *
     * @param createTime created time
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}