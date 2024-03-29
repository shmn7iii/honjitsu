import { useEffect, useState } from "preact/hooks";
import { Post } from "./interfaces.ts";

export interface Response {
  post: Post;
}

export type useSizumePostSlugResult = [
  {
    loading: boolean;
    error: string | null;
    result: Response | null;
  },
];

export const useSizumePostSlug = (
  slug: string,
): useSizumePostSlugResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Response | null>(null);

  const getSizumePostSlug = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `posts/${slug}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = (await response.json()) as Response;

      setResult(data);
    } catch (err) {
      setError("Error occurred: " + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSizumePostSlug();
  }, []);

  return [{ loading, error, result }];
};
