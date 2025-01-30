import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const query = (await searchParams).query;

  const posts = [
    { _createdAt: new Date(), 
      views: 100,
      author: {_id: 1, name: "John Doe"},
      _id: 1,
      description: "A new way to connect with people",
      image: 'https://plus.unsplash.com/premium_photo-1677094310899-02303289cadf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9ib3R8ZW58MHx8MHx8fDA%3D',
      category:"Robots",
      title:"We Robots",
    }
  ]
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
          {/* Startups will be rendered here */}
          {posts?.length > 0 && (
            posts.map((post:StartupTypeCard, index: number)=>(
                <StartupCard key={post?._id} post={post}/>
            ))
          )}
        </ul>
      </search>
    </>
  );
}
