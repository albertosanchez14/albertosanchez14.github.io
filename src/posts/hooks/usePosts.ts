import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../utils/types";

const fetchBlogs = async (limit: number): Promise<PostType[]> => {
  // Mock data
  const response = [
    {
      id: "blog-1",
      name: "welcome-to-my-blog",
      title: "Welcome to My Blog!",
      date: "Dec 17, 2024",
      resume: "A brief introduction to my blog and what you can expect.",
      content: [
        "Hello and thanks for visiting! 👋",
        "I'm Alberto, a tech enthusiast eager to share my journey. I'll be covering projects, tutorials, and ideas that I've worked on or find fascinating.",
        "Whether you're here to explore new concepts, pick up tips, or dive into technical adventures, I hope you'll find something that inspires you. Let's embark on this journey together! 🚀",
      ],
    },
  ];
  return response.slice(0, limit);
};

export const useBlogs = (limit: number) => {
  return useQuery<PostType[], Error>({
    queryKey: ["blogs", limit],
    queryFn: () => fetchBlogs(limit),
  });
};
