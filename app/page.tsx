const Home = () => {
  return (
    <main className="flex min-h-[80vh] w-full items-center justify-center dark:bg-black px-6">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-black dark:text-white">
          Mini X
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Prosta aplikacja rozproszona do publikowania postów. Frontend w
          Next.js, backend API + baza danych.
        </p>
        <div className="w-24 h-1 bg-black dark:bg-white mx-auto rounded" />
      </div>
    </main>
  );
};

export default Home;
