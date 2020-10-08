import styles from '../../styles/Home.module.scss'

export default function BlogId({blog}) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.conntent}`,
        }}
        className={styles.post}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': 'b99a477f-fdaa-43e0-8a72-de34af047371'},
  };

  const data = await fetch('https://bubekiti.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);

  const paths = data.contents.map(content => `/blog/${content.id}`);
  return {paths, fallback: false};
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async context => {
  const id = context.params.id;

  const key = {
    headers: {'X-API-KEY': 'b99a477f-fdaa-43e0-8a72-de34af047371'},
  };

  const data = await fetch(
    'https://bubekiti.microcms.io/api/v1/blog/' + id,
    key,
  )
    .then(res => res.json())
    .catch(() => null);

  return {
    props: {
      blog: data,
    },
  };
};