export const fetcher = async <T = Response>(url: string): Promise<T> => {
  const res = await fetch(url, {
    method: "GET",
  });

  return res.json();
};
