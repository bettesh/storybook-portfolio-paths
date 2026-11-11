const NotFound = () => (
  <section className="flex min-h-[calc(80svh-4rem)] items-center py-16">
    <div className="container max-w-xl text-center">
      <p className="text-sm font-medium text-brand">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Page not found</h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        The page you were looking for doesn't exist or has moved.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex min-h-12 items-center bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Back to seamzaman.com
      </a>
    </div>
  </section>
);

export default NotFound;
