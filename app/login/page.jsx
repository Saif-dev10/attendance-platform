export default function LoginPage() {
  return (
    <nav className="border h-screen flex justify-center items-center">
      <section className="flex flex-col gap-4">
        <input className="border border-gray-400 outline-none" type="text" placeholder="Name..." required></input>
        <input className="border border-gray-400 outline-none" type="Email" placeholder="Email" required></input>
        <input className="border border-gray-400 outline-none" type="Password" required></input>
        <input className="bg-blue-500 text-white outline-none cursor-pointer" type="submit"></input>
      </section>
    </nav>
  );
}