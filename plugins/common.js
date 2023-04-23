import axios from 'axios';
export default {
  async toggleLikesNum(authUserId, postUserId, postId) {
    if(postUserId === authUserId) {
      alert("自分の投稿には「良いね」できません。");
      return { result: false, like: false };
    }

    const params = {
      user_id: authUserId,
      post_id: postId
    };
    try {
      const { data } = await axios.get("/api/likes", { params });
      if (data.count > 0) {//自分の「良いね」が存在する場合、削除
        await axios.delete(`/api/likes/users/${authUserId}/posts/` + postId);
        return { result: true, like: false };
      } else {//自分の良いね数が存在しない場合、良いねを登録
        await axios.post("/api/posts/likes", params);
        return { result: true, like: true };
      }
    } catch (error) {
      console.error(error)
    }
  },

  async deletePost(authUserId, targetPostUserId, targetPostId) {
    if (targetPostUserId !== authUserId) {
      alert("他の人の投稿は削除できません。");
      return false;
    }
    if (!confirm('削除しますか？')) {
      return false;
    }
    //自身の投稿なら削除する(コメントといいねも同時に削除)
    await axios.delete("/api/posts/" + targetPostId);
    return true;
  },
}
