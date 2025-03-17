const BlogPage = async () => {
  return (
    <section className="container max-w-5xl py-6 md:py-8 lg:py-10">
      <div className="space-y-1">
        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Blog</h1>
        <p className="text-sm text-muted-foreground">
          私のポートフォリオへようこそ。このページでは私のブログを投稿しています。
        </p>
      </div>
      <hr className="mb-8 mt-4 w-full" />
    </section>
  );
};

export default BlogPage;
