import SearchForm from "@/components/SearchForm";

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const query = (await searchParams).query;

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br />Connect With Enterpreneeurs</h1>
        <p className="sub-heading !max-w-3xl">submit ideas, vote on pitches, and get noticed in virtual competitions</p>
        <SearchForm query={query}/>
      </section>
    </>
  );
}
