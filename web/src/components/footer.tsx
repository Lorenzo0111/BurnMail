import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex text-center gap-1 mt-auto w-full justify-center items-center">
      Made with <Heart className="text-primary" /> by{" "}
      <a href="https://lorenzo0111.me" target="_blank" className="text-primary">
        Lorenzo0111
      </a>
    </footer>
  );
}
