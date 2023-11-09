
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(24) NOT NULL,
  `email1` varchar(64) NOT NULL COMMENT 'email address',
  `password` varchar(128) NOT NULL COMMENT 'password',
  `mobile` varchar(32) COMMENT 'mobile phone number',
  `nickname` varchar(16) NOT NULL COMMENT 'nickname',
  `profile` varchar(128) NOT NULL COMMENT 'profile picture',
  `sex` int(1) NOT NULL COMMENT 'sex 0: man 1: woman 2: other',
  `birthday` date NOT NULL COMMENT 'birthday',
  `country` varchar(32) DEFAULT NULL COMMENT 'country',
  `state` varchar(32) DEFAULT NULL COMMENT 'state',
  `postcode` int(4) DEFAULT NULL COMMENT 'postcode',
  `description` varchar(100) NOT NULL COMMENT 'personal introduction',
  `bg_img` varchar(255) DEFAULT NULL COMMENT 'background image',
  `created_time` datetime NOT NULL COMMENT 'created time',
  `updated_time` datetime NOT NULL COMMENT 'updated time',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `mobile` (`mobile`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='users table';

DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` varchar(24) NOT NULL,
  `poster_id` varchar(24) NOT NULL COMMENT 'post publisher, associated users table id',
  `latitude` double NOT NULL COMMENT 'latitude',
  `longitude` double NOT NULL COMMENT 'longitude',
  `post_type` int(1) NOT NULL COMMENT 'post type, 0: find my pet, 1: help pets go home, 2: share experience',
  `picture` varchar(255) NOT NULL COMMENT 'pet picture',
  `title` varchar(128) NOT NULL COMMENT 'post title',
  `pet_category` varchar(32) COMMENT 'pet category', 
  `pet_breed` varchar(32) COMMENT 'pet breed',
  `pet_name` varchar(32) COMMENT 'pet name',
  `location` varchar(128) COMMENT 'location of lost',
  `contact_num` varchar(32) COMMENT 'contact number',
  `rewards` varchar(255) COMMENT 'rewards',
  `description` varchar(255) COMMENT 'description',
  `subject` varchar(32) COMMENT 'subject',
  `content` varchar(255) COMMENT 'content',
  `tag` varchar(32) COMMENT 'tag',
  `likes_counts` int(12) NOT NULL COMMENT 'total number of likes',
  `comments_counts` int(12) NOT NULL COMMENT 'total number of comments',
  `private_level` int(1) NOT NULL COMMENT 'privacy setting, 0: default, everyone, 1: friends, 2: followers, 3: self',
  `created_time` datetime NOT NULL COMMENT 'created time',
  `updated_time` datetime NOT NULL COMMENT 'updated time',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='post table';

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` varchar(24) NOT NULL,
  `poster_id` varchar(24) NOT NULL COMMENT 'user id of the post commented',
  `post_id` varchar(24) NOT NULL COMMENT 'post id of the comment',
  `father_comment_id` varchar(24) NOT NULL COMMENT 'if it is a reply to a comment, then it is a sub-comment and requires an associated query',
  `comment_user_id` varchar(24) NOT NULL COMMENT 'user id of the one comments',
  `content` varchar(255) NOT NULL COMMENT 'comment content',
  `like_counts` int(20) NOT NULL COMMENT 'total number of likes',
  `create_time` datetime NOT NULL COMMENT 'created time',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='comment table';

DROP TABLE IF EXISTS `followers`;
CREATE TABLE `followers` (
  `id` varchar(24) NOT NULL,
  `following_id` varchar(24) NOT NULL COMMENT 'user id of one followed',
  `follower_id` varchar(24) NOT NULL COMMENT 'user id of follower',
  `is_follower_friend_of_mine` int(1) NOT NULL COMMENT 'if the two follow each other and become friends, 0: not, 1: yes',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `follow_id` (`following_id`,`follower_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='followers table';

DROP TABLE IF EXISTS `my_liked_post`;
CREATE TABLE `my_liked_post` (
  `id` varchar(24) NOT NULL,
  `user_id` varchar(24) NOT NULL COMMENT 'user id',
  `post_id` varchar(24) NOT NULL COMMENT 'id of the post liked',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `like_id` (`user_id`,`post_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='my_liked_post table';
