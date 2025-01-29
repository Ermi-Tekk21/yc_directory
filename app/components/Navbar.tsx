import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = async () => {
  const session = await auth()

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt='Company Logo' height={30} width={144} />
        </Link>

        {/* Navigation Links */}
        <div className='flex items-center gap-5 text-black'>
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form action={async () => {
                "use server"

                await signOut({ redirectTo: '/' })
              }}>
                <button type='submit' className="hover:text-red-500">
                  <span>Logout</span>
                </button>
              </form>


              <Link href={`/user/${session.user.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form action={async () => {
              "use server"

              await signIn('github')
            }} className="hover:text-blue-500">
              <button type='submit'><span>Login</span></button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
