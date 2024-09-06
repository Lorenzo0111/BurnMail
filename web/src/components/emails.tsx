import type fetcher from "@/lib/fetcher";
import type { InferResponseType } from "hono";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useMemo } from "react";
import { Letter } from "react-letter";
import { extract } from "letterparser";

export type Email = InferResponseType<
  typeof fetcher.index.$get,
  200
>["emails"][0];

export function EmailView({
  email,
  close,
}: {
  email: Email;
  close: () => void;
}) {
  const content = useMemo(() => {
    return extract(email.body);
  }, [email.body]);

  return (
    <div className="w-full md:w-3/5 mx-auto mt-10">
      <div className="flex justify-between">
        <h2>
          {email.sender}: {email.title}
        </h2>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
      </div>
      <Letter
        className="bg-secondary p-2 mt-2 rounded-lg"
        html={content.html ?? ""}
        text={content.text}
      />
    </div>
  );
}

export function Emails({
  emails,
  setView,
}: {
  emails: Email[];
  setView: (id: Email) => void;
}) {
  return (
    <Table className="mt-10 w-full md:w-3/4 mx-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Sender</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emails.map((email) => (
          <TableRow key={email.id}>
            <TableCell>{email.sender}</TableCell>
            <TableCell>{email.title}</TableCell>
            <TableCell className="text-right">
              <Button variant="secondary" onClick={() => setView(email)}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
