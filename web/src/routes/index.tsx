import { type Email, Emails, EmailView } from "@/components/emails";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import fetcher from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { Clipboard, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

function Index() {
  const storageToken = localStorage.getItem("token");
  const { toast } = useToast();
  const [view, setView] = useState<Email | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const { data, isLoading } = useQuery({
    queryKey: ["emails", token],
    queryFn: async () => {
      if (!token) throw new Error("Unauthorized");

      const res = await fetcher.index.$get({
        header: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          regenerateToken();
        }

        throw new Error();
      }

      return res.json();
    },
    refetchInterval: 60000,
  });

  const regenerateToken = () => {
    setLoading(true);

    fetcher.generate
      .$post()
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) regenerateToken();
    else {
      setToken(token);
      setLoading(false);
    }
  }, [storageToken]);

  return (
    <div className="p-6 min-h-screen flex flex-col justify-center">
      <Navbar />

      <div className="flex items-center w-full md:w-1/3 mx-auto">
        <Button
          variant="secondary"
          className="border-r-0 rounded-r-none"
          onClick={() => {
            navigator.clipboard.writeText(data?.email ?? "");
            toast({
              description: "Copied to clipboard",
            });
          }}
        >
          <Clipboard />
        </Button>
        <Input
          disabled
          readOnly
          className="border-0 bg-secondary rounded-none"
          value={data?.email}
        />
        <Button
          onClick={regenerateToken}
          variant="secondary"
          className="border-l-0 rounded-l-none"
        >
          <RefreshCcw className={loading || isLoading ? "animate-spin" : ""} />
        </Button>
      </div>

      {view ? (
        <EmailView email={view} close={() => setView(null)} />
      ) : (
        <Emails emails={data?.emails ?? []} setView={setView} />
      )}

      <Footer />
    </div>
  );
}

export default Index;
