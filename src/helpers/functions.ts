

function getUrl(entry) {
  switch (entry.collection) {
    case 'blog':
      return `/blog/${entry.slug}`;
    case 'notes':
      return `/notes/${entry.slug}`;
    case 'movies':
      return `/blog/movies/${entry.slug}`;
    case 'books':
      return `/blog/books/${entry.slug}`;
    default:
      return '#';
  }
}
