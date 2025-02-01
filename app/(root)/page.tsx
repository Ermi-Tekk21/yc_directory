import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const query = (await searchParams).query;

  const posts: StartupTypeCard[] = await client.fetch(STARTUPS_QUERY);


  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br />Connect With Enterpreneeurs</h1>
        <p className="sub-heading !max-w-3xl">submit ideas, vote on pitches, and get noticed in virtual competitions</p>
        <SearchForm query={query} />
      </section>
      <search className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'Latest Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </search>
    </>
  );
}
