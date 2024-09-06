import { SiGithub } from "@icons-pack/react-simple-icons";

export function Navbar() {
  return (
    <nav className="py-4 md:p-4 flex items-center justify-between w-full">
      <div className="flex gap-2 items-center">
        <img
          src="/logo.svg"
          alt="logo"
          width={56}
          height={56}
          className="w-14 h-14"
        />
        <h2 className="font-extrabold text-2xl">BurnMail</h2>
      </div>

      <a href="https://github.com/Lorenzo0111/BurnMail" target="_blank">
        <SiGithub aria-label="GitHub" />
      </a>
    </nav>
  );
}
