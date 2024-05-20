import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/context/PostContext";
import { CategoryTypes, Post } from "@/types/post.types";
import { FlatList } from "react-native";
import { View, Text, Image } from "react-native-ui-lib";

const PostItem = ({ post }: { post: Post }) => {
  return (
    <View style={{ padding: 16 }}>
      <View style={{ padding: 8 }}>
        <Image source={{ uri: post.postOwnerImage }} />
        <Text> Post Owner: {post.postOwnerName}</Text>
      </View>
      <Image style={{ width: 50, height: 50 }} source={{ uri: post.imageUrl }} />
      <Text> {post.postContent}</Text>
    </View>
  );
};
export default function PostsScreen() {
  const { user } = useAuth();
  const { allPosts } = usePosts();
  return (
    <View style={{ padding: 16 }}>
      <Text> Recent Posts </Text>
      <FlatList
        data={allPosts}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={(item) => item.postId.toString()}
      />
    </View>
  );
}
