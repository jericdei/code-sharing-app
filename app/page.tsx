import Logo from '@/components/vector/logo';
import Editor from '@/components/editor';

export default function Home() {
  return (
    <main className="min-h-screen w-full grid place-items-center bg-[url('/hero-bg.png')] bg-cover bg-center bg-[#7f49e5] py-8 text-neutral-700">
      <div className="flex flex-col w-full items-center gap-8">
        <Logo />
        <h1 className="heading text-center">
          Create &amp; Share <br />{' '}
          <span className="heading-lg">Your Code easily</span>
        </h1>

        <Editor />
      </div>
    </main>
  );
}
