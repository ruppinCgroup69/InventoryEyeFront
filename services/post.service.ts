import axios from "axios";
import { Post, PostCreationDto } from "@/types/post.types";

export async function newPost(dto: PostCreationDto) {
  const response = await axios.post<Post>("/Post/newPost", dto);
  if (response.status !== 200) {
    return undefined
  }
  return response.data; // success
}

export async function getPosts() {
  const response = await axios.get<Post[]>("/Post");
  if (response.status !== 200) {
    throw response.data;
  }
  return response.data; // success
}

export async function uploadImage(formData: FormData) {
  const response = await axios.post<{ fileUrl: string }>("/ImageUpload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (response.status !== 200) {
    throw response.data;
  }
  return response.data; // success
}
